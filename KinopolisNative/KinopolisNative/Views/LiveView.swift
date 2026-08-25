import SwiftUI
import Combine

// MARK: - Models
struct HallData: Codable, Identifiable {
    let id = UUID()
    let name: String
    let sessions: [Session]?
    
    enum CodingKeys: String, CodingKey {
        case name
        case sessions
    }
}

struct Session: Codable, Identifiable {
    let id = UUID()
    let title: String
    let time: String
    let sold: Int?
    let capacity: Int?
    let hall: String?
    let duration: Int?
    let fsk: String?
    
    enum CodingKeys: String, CodingKey {
        case title
        case time
        case sold
        case capacity
        case hall
        case duration
        case fsk
    }
}

// MARK: - Auslass Models
struct Auslass: Identifiable {
    var id = UUID()
    let hall: String
    let movieTitle: String
    let timeDisplay: String
    let minutesLeft: Int
    let isActive: Bool
    let isDone: Bool
    let sold: Int
    let capacity: Int
    let fsk: String?
}

// MARK: - FSK & JuSchG Helper
struct FSKHelper {
    static func age(from fskString: String?) -> Int {
        guard let fsk = fskString else { return 12 }
        let digits = fsk.components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
        return Int(digits) ?? 12
    }
    
    static func color(for age: Int) -> Color {
        switch age {
        case 0: return .white
        case 6: return Color(red: 250/255, green: 204/255, blue: 21/255) // Gelb
        case 12: return Color(red: 34/255, green: 197/255, blue: 94/255) // Grün
        case 16: return Color(red: 59/255, green: 130/255, blue: 246/255) // Blau
        case 18: return Color(red: 239/255, green: 68/255, blue: 68/255) // Rot
        default: return .white
        }
    }
    
    static func textColor(for age: Int) -> Color {
        switch age {
        case 0, 6: return .black
        default: return .white
        }
    }
    
    // JuSchG Zeitregelungen:
    // - FSK 0 & 6: Ende nach 20:00 Uhr -> U14 nur in Begleitung
    // - FSK 12: Ende nach 22:00 Uhr -> U16 nur in Begleitung
    // - FSK 16: Ende nach 24:00 Uhr (00:00) -> U18 nur in Begleitung
    // - FSK 18: Nur Volljährige (Ausweispflicht)
    static func timeWarning(startTime: String, durationMinutes: Int?, fskAge: Int) -> String? {
        let parts = startTime.split(separator: ":")
        guard parts.count == 2, let h = Int(parts[0]), let m = Int(parts[1]) else { return nil }
        
        let duration = durationMinutes ?? 120
        let totalEndMinutes = h * 60 + m + duration
        
        if fskAge == 0 || fskAge == 6 {
            if totalEndMinutes > 20 * 60 {
                return "Ende > 20h: U14 nur mit Begleitung"
            }
        } else if fskAge == 12 {
            if totalEndMinutes > 22 * 60 {
                return "Ende > 22h: U16 nur mit Begleitung"
            }
        } else if fskAge == 16 {
            if totalEndMinutes > 24 * 60 {
                return "Ende > 24h: U18 nur mit Begleitung"
            }
        } else if fskAge == 18 {
            return "FSK 18: Ausweispflicht"
        }
        
        return nil
    }
}

// MARK: - View Model
@MainActor
class LiveViewModel: ObservableObject {
    @Published var halls: [HallData] = []
    @Published var auslaesse: [Auslass] = []
    @Published var isLoading = false
    @Published var errorMessage: String? = nil
    @Published var selectedDate: Date = Date()
    @Published var viewMode: Int = 0 // 0 = Vorstellungen, 1 = Auslässe
    @Published var checkedOffIDs: Set<UUID> = []
    
    private var timer: Timer?
    
    init() {
        // Update auslässe every minute
        timer = Timer.scheduledTimer(withTimeInterval: 60, repeats: true) { _ in
            Task { @MainActor in
                NotificationCenter.default.post(name: NSNotification.Name("RecalculateAuslaesse"), object: nil)
            }
        }
        
        NotificationCenter.default.addObserver(forName: NSNotification.Name("RecalculateAuslaesse"), object: nil, queue: .main) { [weak self] _ in
            self?.recalculateAuslaesse()
        }
        
        NotificationCenter.default.addObserver(forName: NSNotification.Name("LocationChanged"), object: nil, queue: .main) { [weak self] _ in
            Task { @MainActor in
                await self?.fetchSessions()
            }
        }
    }
    
    func fetchSessions() async {
        isLoading = true
        errorMessage = nil
        
        do {
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "yyyy-MM-dd"
            let dateStr = dateFormatter.string(from: selectedDate)
            
            let currentLocation = UserDefaults.standard.string(forKey: "selectedLocation") ?? "su"
            let data = try await ScraperManager.shared.fetchSessions(location: currentLocation, dateStr: dateStr)
            self.halls = data
            self.recalculateAuslaesse()
        } catch {
            print("Fetch error: \(error)")
            self.errorMessage = "Fehler beim Laden der Live-Daten."
        }
        
        isLoading = false
    }
    
    func toggleAuslass(_ id: UUID) {
        if checkedOffIDs.contains(id) {
            checkedOffIDs.remove(id)
        } else {
            checkedOffIDs.insert(id)
        }
    }
    
    func recalculateAuslaesse() {
        var newAuslaesse: [Auslass] = []
        let now = Date()
        let cal = Calendar.current
        
        for hall in halls {
            guard let sessions = hall.sessions else { continue }
            for session in sessions {
                // Parse time (e.g. "20:15")
                let timeParts = session.time.split(separator: ":")
                guard timeParts.count == 2,
                      let h = Int(timeParts[0]),
                      let m = Int(timeParts[1]) else { continue }
                
                // Duration in minutes (default 120 mins)
                let durationMinutes = session.duration ?? 120
                
                // End time = Start Time + Duration
                guard let start = cal.date(bySettingHour: h, minute: m, second: 0, of: now) else { continue }
                let end = start.addingTimeInterval(TimeInterval(durationMinutes * 60))
                
                // Auslass begins ~30 mins before end of movie (or at end)
                let minutesToEnd = Int(end.timeIntervalSince(now) / 60)
                
                let isDone = minutesToEnd < -10
                let isActive = minutesToEnd <= 20 && minutesToEnd >= -10
                
                let timeFormatter = DateFormatter()
                timeFormatter.dateFormat = "HH:mm"
                let endStr = timeFormatter.string(from: end)
                
                let auslass = Auslass(
                    hall: session.hall ?? hall.name,
                    movieTitle: session.title,
                    timeDisplay: "\(session.time) - \(endStr)",
                    minutesLeft: minutesToEnd,
                    isActive: isActive,
                    isDone: isDone,
                    sold: session.sold ?? 0,
                    capacity: session.capacity ?? 0,
                    fsk: session.fsk
                )
                newAuslaesse.append(auslass)
            }
        }
        
        // Sort: Active first, then by earliest minutes left
        self.auslaesse = newAuslaesse.sorted {
            if $0.isActive != $1.isActive {
                return $0.isActive && !$1.isActive
            }
            return $0.minutesLeft < $1.minutesLeft
        }
    }
}

// MARK: - View
struct LiveView: View {
    @StateObject private var viewModel = LiveViewModel()
    @EnvironmentObject var authManager: AuthManager
    @AppStorage("selectedLocation") private var selectedLocation = "su"
    
    var displayName: String {
        if let name = authManager.currentUser?.name, !name.trimmingCharacters(in: .whitespaces).isEmpty && name != "Mitarbeiter" {
            return name
        }
        if authManager.isGuest {
            return "Gast"
        }
        if authManager.isAuthenticated {
            return "Artjom Becker"
        }
        return "Mitarbeiter"
    }
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(red: 24/255, green: 24/255, blue: 26/255).ignoresSafeArea()
                
                ScrollView {
                    VStack(alignment: .leading, spacing: 20) {
                        
                        // Header with Oli (Large & Clean)
                        HStack(spacing: 16) {
                            Image("Oli")
                                .resizable()
                                .scaledToFit()
                                .frame(width: 82, height: 82)
                                .clipShape(Circle())
                                .shadow(color: Color.black.opacity(0.4), radius: 6, x: 0, y: 3)
                            
                            VStack(alignment: .leading, spacing: 4) {
                                Text("Willkommen zurück,")
                                    .font(.caption)
                                    .fontWeight(.medium)
                                    .foregroundColor(.gray)
                                
                                Text(displayName)
                                    .font(.title2)
                                    .fontWeight(.heavy)
                                    .foregroundColor(.white)
                                    .lineLimit(1)
                                
                                HStack(spacing: 4) {
                                    Image(systemName: "mappin.circle.fill")
                                        .font(.caption2)
                                    Text(LocationData.name(for: selectedLocation))
                                        .font(.caption2)
                                        .fontWeight(.bold)
                                        .lineLimit(1)
                                }
                                .foregroundColor(.red)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 3)
                                .background(Color.red.opacity(0.15))
                                .cornerRadius(6)
                            }
                            
                            Spacer()
                            
                            Button(action: {
                                Task { await viewModel.fetchSessions() }
                            }) {
                                Image(systemName: "arrow.triangle.2.circlepath")
                                    .font(.title3)
                                    .foregroundColor(.white)
                                    .padding(12)
                                    .background(Color.white.opacity(0.08))
                                    .clipShape(Circle())
                            }
                        }
                        .padding(.horizontal)
                        .padding(.top, 10)
                        
                        // Mode Picker
                        Picker("Ansicht", selection: $viewModel.viewMode) {
                            Text("Vorstellungen").tag(0)
                            Text("Auslassplan").tag(1)
                        }
                        .pickerStyle(SegmentedPickerStyle())
                        .padding(.horizontal)
                        
                        if viewModel.isLoading && viewModel.halls.isEmpty {
                            VStack(spacing: 16) {
                                Image("Oli_3_bgless")
                                    .resizable()
                                    .scaledToFit()
                                    .frame(height: 100)
                                    .opacity(0.6)
                                ProgressView()
                                    .progressViewStyle(CircularProgressViewStyle(tint: .white))
                                Text("Oli lädt die Vorstellungen...")
                                    .font(.subheadline)
                                    .foregroundColor(.gray)
                            }
                            .frame(maxWidth: .infinity, alignment: .center)
                            .padding(.top, 40)
                        } else if let error = viewModel.errorMessage {
                            VStack(spacing: 12) {
                                Image("Oli_Error_bgless")
                                    .resizable()
                                    .scaledToFit()
                                    .frame(height: 80)
                                Text(error)
                                    .foregroundColor(.red)
                                    .multilineTextAlignment(.center)
                            }
                            .padding()
                        } else {
                            if viewModel.viewMode == 0 {
                                // Sessions List
                                ForEach(viewModel.halls) { hall in
                                    if let sessions = hall.sessions, !sessions.isEmpty {
                                        VStack(alignment: .leading, spacing: 12) {
                                            Text("Saal \(hall.name)")
                                                .font(.headline)
                                                .foregroundColor(.white)
                                                .padding(.horizontal)
                                            
                                            ScrollView(.horizontal, showsIndicators: false) {
                                                HStack(spacing: 16) {
                                                    ForEach(sessions) { session in
                                                        SessionCard(session: session)
                                                    }
                                                }
                                                .padding(.horizontal)
                                            }
                                        }
                                        .padding(.bottom, 10)
                                    }
                                }
                            } else {
                                // Auslassplan
                                VStack(spacing: 12) {
                                    ForEach(viewModel.auslaesse) { auslass in
                                        if !auslass.isDone {
                                            AuslassCard(
                                                auslass: auslass,
                                                isCheckedOff: viewModel.checkedOffIDs.contains(auslass.id),
                                                onToggle: {
                                                    viewModel.toggleAuslass(auslass.id)
                                                }
                                            )
                                        }
                                    }
                                }
                                .padding(.horizontal)
                            }
                        }
                    }
                    .padding(.bottom, 100) // Padding for Tab Bar
                }
            }
            .navigationBarHidden(true)
            .task {
                await viewModel.fetchSessions()
            }
        }
    }
}

struct AuslassCard: View {
    let auslass: Auslass
    let isCheckedOff: Bool
    let onToggle: () -> Void
    
    var fskAge: Int {
        FSKHelper.age(from: auslass.fsk)
    }
    
    var body: some View {
        HStack {
            // Checkbox
            Button(action: onToggle) {
                Image(systemName: isCheckedOff ? "checkmark.circle.fill" : "circle")
                    .font(.title2)
                    .foregroundColor(isCheckedOff ? .green : .gray)
            }
            .padding(.trailing, 8)
            
            VStack(alignment: .leading, spacing: 4) {
                HStack(spacing: 8) {
                    Text("Saal \(auslass.hall)")
                        .font(.caption)
                        .fontWeight(.bold)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(auslass.isActive ? Color.red : Color.blue.opacity(0.8))
                        .foregroundColor(.white)
                        .cornerRadius(6)
                    
                    // FSK Badge
                    Text("FSK \(fskAge)")
                        .font(.system(size: 10, weight: .black))
                        .padding(.horizontal, 6)
                        .padding(.vertical, 3)
                        .background(FSKHelper.color(for: fskAge))
                        .foregroundColor(FSKHelper.textColor(for: fskAge))
                        .cornerRadius(5)
                    
                    Text(auslass.timeDisplay)
                        .font(.subheadline)
                        .foregroundColor(.gray)
                        .strikethrough(isCheckedOff)
                }
                
                Text(auslass.movieTitle)
                    .font(.headline)
                    .foregroundColor(isCheckedOff ? .gray : .white)
                    .lineLimit(1)
                    .strikethrough(isCheckedOff)
                
                // Capacity Indicator
                HStack {
                    Image(systemName: "person.fill")
                        .foregroundColor(.gray)
                        .font(.caption)
                    Text("\(auslass.sold) / \(auslass.capacity) verkauft")
                        .font(.caption)
                        .foregroundColor(.gray)
                }
            }
            
            Spacer()
            
            if !isCheckedOff {
                if auslass.minutesLeft > 0 {
                    Text("in \(auslass.minutesLeft) Min")
                        .font(.caption)
                        .foregroundColor(auslass.isActive ? .red : .gray)
                } else {
                    Text("FÄLLIG")
                        .font(.caption)
                        .fontWeight(.bold)
                        .foregroundColor(.red)
                }
            }
        }
        .padding()
        .background(Color.white.opacity(isCheckedOff ? 0.02 : 0.05))
        .cornerRadius(12)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(auslass.isActive && !isCheckedOff ? Color.red.opacity(0.5) : Color.white.opacity(0.1), lineWidth: 1)
        )
        .opacity(isCheckedOff ? 0.5 : 1.0)
    }
}

struct SessionCard: View {
    let session: Session
    
    var fskAge: Int {
        FSKHelper.age(from: session.fsk)
    }
    
    var timeWarning: String? {
        FSKHelper.timeWarning(startTime: session.time, durationMinutes: session.duration, fskAge: fskAge)
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(spacing: 8) {
                Text(session.time)
                    .font(.caption)
                    .fontWeight(.bold)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.blue.opacity(0.2))
                    .foregroundColor(.blue)
                    .cornerRadius(8)
                
                // FSK Badge with custom colors
                Text("FSK \(fskAge)")
                    .font(.system(size: 11, weight: .black))
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(FSKHelper.color(for: fskAge))
                    .foregroundColor(FSKHelper.textColor(for: fskAge))
                    .cornerRadius(8)
                
                Spacer()
            }
            
            Text(session.title)
                .font(.headline)
                .foregroundColor(.white)
                .lineLimit(2)
                .frame(height: 42, alignment: .topLeading)
            
            HStack {
                Image(systemName: "person.fill")
                    .foregroundColor(.gray)
                Text("\(session.sold ?? 0) / \(session.capacity ?? 0)")
                    .font(.subheadline)
                    .foregroundColor(.gray)
            }
            
            // JuSchG Time Warning
            if let warning = timeWarning {
                HStack(spacing: 4) {
                    Image(systemName: "exclamationmark.triangle.fill")
                        .font(.caption2)
                    Text(warning)
                        .font(.system(size: 10, weight: .bold))
                        .lineLimit(1)
                }
                .foregroundColor(fskAge == 18 ? .red : .orange)
                .padding(.horizontal, 6)
                .padding(.vertical, 3)
                .background((fskAge == 18 ? Color.red : Color.orange).opacity(0.15))
                .cornerRadius(6)
            }
        }
        .padding(14)
        .frame(width: 220)
        .background(Color.white.opacity(0.05))
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(timeWarning != nil ? (fskAge == 18 ? Color.red.opacity(0.4) : Color.orange.opacity(0.3)) : Color.white.opacity(0.1), lineWidth: 1)
        )
    }
}

struct LiveView_Previews: PreviewProvider {
    static var previews: some View {
        LiveView().environmentObject(AuthManager.shared)
    }
}
