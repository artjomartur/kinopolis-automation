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
    
    enum CodingKeys: String, CodingKey {
        case title
        case time
        case sold
        case capacity
        case hall
        case duration
    }
}

// MARK: - Auslass Models
struct Auslass: Identifiable {
    let id: String
    let hall: String
    let movieTitle: String
    let timeDisplay: String
    let exitTime: Date
    let isDone: Bool
    let isActive: Bool
    let minutesLeft: Int
    let sold: Int
    let capacity: Int
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
    @Published var checkedOffIDs: Set<String> = []
    
    private var timer: Timer?
    
    init() {
        // Update auslässe every minute
        timer = Timer.scheduledTimer(withTimeInterval: 60, repeats: true) { [weak self] _ in
            Task { @MainActor in
                self?.recalculateAuslaesse()
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
            
            let data = try await ScraperManager.shared.fetchSessions(location: "su", dateStr: dateStr)
            self.halls = data
            self.recalculateAuslaesse()
        } catch {
            print("Fetch error: \(error)")
            self.errorMessage = "Fehler beim Laden der Live-Daten."
        }
        
        isLoading = false
    }
    
    func toggleAuslass(_ id: String) {
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
                
                var sessionDate = cal.date(bySettingHour: h, minute: m, second: 0, of: selectedDate) ?? Date()
                if h < 6 { // Late night movies after midnight
                    sessionDate = cal.date(byAdding: .day, value: 1, to: sessionDate) ?? sessionDate
                }
                
                // Add duration + 30 mins
                let duration = session.duration ?? 120
                let exitDate = cal.date(byAdding: .minute, value: duration + 30, to: sessionDate) ?? sessionDate
                
                let diffMin = cal.dateComponents([.minute], from: now, to: exitDate).minute ?? 0
                
                let isDone = diffMin < -30 // Older than 30 mins after exit
                let isActive = diffMin >= -30 && diffMin <= 15 // Active window
                
                let df = DateFormatter()
                df.timeStyle = .short
                let timeStr = df.string(from: exitDate)
                
                let uniqueId = "\(session.hall ?? hall.name)-\(timeStr)-\(session.title)"
                
                let auslass = Auslass(
                    id: uniqueId,
                    hall: session.hall ?? hall.name,
                    movieTitle: session.title,
                    timeDisplay: "Auslass um \(timeStr)",
                    exitTime: exitDate,
                    isDone: isDone,
                    isActive: isActive,
                    minutesLeft: diffMin,
                    sold: session.sold ?? 0,
                    capacity: session.capacity ?? 0
                )
                
                newAuslaesse.append(auslass)
            }
        }
        
        // Sort by exit time
        newAuslaesse.sort { $0.exitTime < $1.exitTime }
        self.auslaesse = newAuslaesse
    }
}

// MARK: - View
struct LiveView: View {
    @StateObject private var viewModel = LiveViewModel()
    @EnvironmentObject var authManager: AuthManager
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(red: 24/255, green: 24/255, blue: 26/255).ignoresSafeArea()
                
                ScrollView {
                    VStack(alignment: .leading, spacing: 20) {
                        
                        // Header
                        HStack {
                            VStack(alignment: .leading) {
                                Text("Willkommen zurück,")
                                    .font(.subheadline)
                                    .foregroundColor(.gray)
                                Text(authManager.currentUser?.name ?? "Gast")
                                    .font(.title)
                                    .fontWeight(.bold)
                                    .foregroundColor(.white)
                            }
                            Spacer()
                            
                            Button(action: {
                                Task { await viewModel.fetchSessions() }
                            }) {
                                Image(systemName: "arrow.triangle.2.circlepath")
                                    .font(.title2)
                                    .foregroundColor(.white)
                                    .padding(10)
                                    .background(Color.white.opacity(0.1))
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
                            ProgressView()
                                .progressViewStyle(CircularProgressViewStyle(tint: .white))
                                .frame(maxWidth: .infinity, alignment: .center)
                                .padding(.top, 50)
                        } else if let error = viewModel.errorMessage {
                            Text(error)
                                .foregroundColor(.red)
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
                HStack {
                    Text("Saal \(auslass.hall)")
                        .font(.caption)
                        .fontWeight(.bold)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(auslass.isActive ? Color.red : Color.blue.opacity(0.8))
                        .foregroundColor(.white)
                        .cornerRadius(6)
                    
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
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(session.time)
                .font(.caption)
                .fontWeight(.bold)
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(Color.blue.opacity(0.2))
                .foregroundColor(.blue)
                .cornerRadius(8)
            
            Text(session.title)
                .font(.headline)
                .foregroundColor(.white)
                .lineLimit(2)
                .frame(height: 45, alignment: .topLeading)
            
            HStack {
                Image(systemName: "person.fill")
                    .foregroundColor(.gray)
                Text("\(session.sold ?? 0) / \(session.capacity ?? 0)")
                    .font(.subheadline)
                    .foregroundColor(.gray)
            }
        }
        .padding()
        .frame(width: 200)
        .background(Color.white.opacity(0.05))
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color.white.opacity(0.1), lineWidth: 1)
        )
    }
}

struct LiveView_Previews: PreviewProvider {
    static var previews: some View {
        LiveView().environmentObject(AuthManager.shared)
    }
}
