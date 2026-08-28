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
    let poster: String?
    
    init(
        title: String,
        time: String,
        sold: Int? = nil,
        capacity: Int? = nil,
        hall: String? = nil,
        duration: Int? = nil,
        fsk: String? = nil,
        poster: String? = nil
    ) {
        self.title = title
        self.time = time
        self.sold = sold
        self.capacity = capacity
        self.hall = hall
        self.duration = duration
        self.fsk = fsk
        self.poster = poster
    }
    
    enum CodingKeys: String, CodingKey {
        case title
        case time
        case sold
        case capacity
        case hall
        case duration
        case fsk
        case poster
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
    
    var endTime: Date {
        Date().addingTimeInterval(Double(minutesLeft) * 60)
    }
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
    @Published var posterAlerts: [PosterChangeAlert] = []
    @Published var isLoading = false
    @Published var errorMessage: String? = nil
    @Published var selectedDate: Date = Date()
    @Published var viewMode: Int = 0 // 0 = Vorstellungen, 1 = Auslässe, 2 = Plakatwechsel
    @Published var checkedOffIDs: Set<UUID> = []
    
    private let completedPosterIDsKey = "completedPosterIDs"
    
    private var completedPosterIDs: Set<String> {
        get {
            if let data = UserDefaults.standard.string(forKey: completedPosterIDsKey)?.data(using: .utf8),
               let arr = try? JSONDecoder().decode([String].self, from: data) {
                return Set(arr)
            }
            return []
        }
        set {
            if let data = try? JSONEncoder().encode(Array(newValue)),
               let str = String(data: data, encoding: .utf8) {
                UserDefaults.standard.set(str, forKey: completedPosterIDsKey)
            }
        }
    }
    
    private var timerTask: Task<Void, Never>?
    private var cancellables = Set<AnyCancellable>()
    
    init() {
        // Update auslässe every minute
        timerTask = Task { @MainActor [weak self] in
            while !Task.isCancelled {
                try? await Task.sleep(nanoseconds: 60_000_000_000)
                self?.recalculateAuslaesse()
            }
        }
        
        NotificationCenter.default.publisher(for: NSNotification.Name("LocationChanged"))
            .receive(on: RunLoop.main)
            .sink { [weak self] _ in
                Task { [weak self] in
                    await self?.fetchSessions()
                }
            }
            .store(in: &cancellables)
    }
    
    deinit {
        timerTask?.cancel()
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
            await self.calculatePosterAlerts(todayHalls: data, location: currentLocation, dateStr: dateStr)
        } catch {
            print("Fetch error: \(error)")
            self.errorMessage = "Fehler beim Laden der Live-Daten."
        }
        
        isLoading = false
    }
    
    func calculatePosterAlerts(todayHalls: [HallData], location: String, dateStr: String) async {
        let calendar = Calendar.current
        let now = Date()
        let tomorrow = calendar.date(byAdding: .day, value: 1, to: now) ?? now.addingTimeInterval(86400)
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        let tomorrowStr = formatter.string(from: tomorrow)
        let hallsTomorrow = (try? await ScraperManager.shared.fetchSessions(location: location, dateStr: tomorrowStr)) ?? []
        
        var generatedAlerts: [PosterChangeAlert] = []
        let completed = completedPosterIDs
        
        for hall in todayHalls {
            let sessions = hall.sessions ?? []
            let sortedSessions = sessions.filter { $0.time.contains(":") }.sorted { $0.time < $1.time }
            guard !sortedSessions.isEmpty else { continue }
            
            for i in 0..<sortedSessions.count {
                let currentSession = sortedSessions[i]
                let parts = currentSession.time.split(separator: ":")
                guard parts.count == 2,
                      let hour = Int(parts[0]),
                      let minute = Int(parts[1]) else { continue }
                
                var comps = calendar.dateComponents([.year, .month, .day], from: now)
                comps.hour = hour
                comps.minute = minute
                guard let sessionDate = calendar.date(from: comps) else { continue }
                let changeDueDate = sessionDate.addingTimeInterval(20 * 60)
                
                if i < sortedSessions.count - 1 {
                    let nextSession = sortedSessions[i + 1]
                    if currentSession.title != nextSession.title {
                        let alertId = "poster-\(hall.name)-\(nextSession.title)-\(nextSession.time)"
                        generatedAlerts.append(
                            PosterChangeAlert(
                                id: alertId,
                                hallName: hall.name,
                                currentMovie: currentSession.title,
                                nextMovie: nextSession.title,
                                nextMovieTime: nextSession.time,
                                nextMoviePoster: nextSession.poster,
                                changeTime: changeDueDate,
                                isLastSession: false,
                                isCompleted: completed.contains(alertId)
                            )
                        )
                    }
                } else {
                    // Last session of today -> First movie of tomorrow!
                    let tomorrowHall = hallsTomorrow.first(where: { $0.name.lowercased() == hall.name.lowercased() })
                    let tomorrowSessions = (tomorrowHall?.sessions ?? []).filter { $0.time.contains(":") }.sorted { $0.time < $1.time }
                    
                    let nextMovieTitle: String
                    let nextMovieTime: String
                    let nextMoviePoster: String?
                    
                    if let firstTomorrow = tomorrowSessions.first {
                        nextMovieTitle = "Morgen: \(firstTomorrow.title)"
                        nextMovieTime = "\(firstTomorrow.time) Uhr"
                        nextMoviePoster = firstTomorrow.poster
                    } else {
                        nextMovieTitle = "Morgen: Erste Vorstellung"
                        nextMovieTime = "Morgen Früh"
                        nextMoviePoster = nil
                    }
                    
                    let alertId = "poster-last-\(hall.name)-\(currentSession.title)-\(nextMovieTitle)"
                    generatedAlerts.append(
                        PosterChangeAlert(
                            id: alertId,
                            hallName: hall.name,
                            currentMovie: currentSession.title,
                            nextMovie: nextMovieTitle,
                            nextMovieTime: nextMovieTime,
                            nextMoviePoster: nextMoviePoster,
                            changeTime: changeDueDate,
                            isLastSession: true,
                            isCompleted: completed.contains(alertId)
                        )
                    )
                }
            }
        }
        
        self.posterAlerts = generatedAlerts.sorted { $0.changeTime < $1.changeTime }
    }
    
    func togglePosterAlertCompleted(_ alertId: String) {
        var ids = completedPosterIDs
        if ids.contains(alertId) {
            ids.remove(alertId)
        } else {
            ids.insert(alertId)
            let generator = UINotificationFeedbackGenerator()
            generator.notificationOccurred(.success)
        }
        self.completedPosterIDs = ids
        
        if let idx = posterAlerts.firstIndex(where: { $0.id == alertId }) {
            posterAlerts[idx].isCompleted.toggle()
        }
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
    @State private var isHeaderCollapsed = false
    @State private var showSpickzettelSheet = false
    
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
        ZStack {
            Color(UIColor.systemBackground).ignoresSafeArea()
            
            VStack(spacing: 0) {
                // Fixed Master Header (Collapses on scroll)
                MasterHeaderView(
                    imageName: "Oli_3_bgless",
                    subtitle: "Willkommen zurück,",
                    title: displayName,
                    shortTitle: "Live",
                    isCollapsed: isHeaderCollapsed
                ) {
                    HStack(spacing: 8) {
                        Button(action: { showSpickzettelSheet = true }) {
                            Image(systemName: "book.pages.fill")
                                .font(.body)
                                .fontWeight(.bold)
                                .foregroundColor(.cyan)
                                .padding(10)
                                .background(Color.cyan.opacity(0.15))
                                .clipShape(Circle())
                        }
                        
                        Button(action: {
                            Task { await viewModel.fetchSessions() }
                        }) {
                            Image(systemName: "arrow.triangle.2.circlepath")
                                .font(.body)
                                .fontWeight(.bold)
                                .foregroundColor(.primary)
                                .padding(10)
                                .background(Color.primary.opacity(0.08))
                                .clipShape(Circle())
                        }
                    }
                }
                
                ScrollView {
                    VStack(alignment: .leading, spacing: 16) {
                        
                        GeometryReader { proxy in
                            Color.clear.preference(
                                key: ScrollOffsetPreferenceKey.self,
                                value: proxy.frame(in: .named("liveScroll")).minY
                            )
                        }
                        .frame(height: 0)
                        
                        // Mode Picker (3 Tabs: Vorstellungen, Auslassplan, Plakate)
                        Picker("Ansicht", selection: $viewModel.viewMode) {
                            Text("Vorstellungen").tag(0)
                            Text("Auslassplan").tag(1)
                            Text("🖼️ Plakate (\(viewModel.posterAlerts.filter { !$0.isCompleted }.count))").tag(2)
                        }
                        .pickerStyle(SegmentedPickerStyle())
                        .padding(.horizontal, 16)
                        .padding(.top, 8)
                        
                        if viewModel.isLoading && viewModel.halls.isEmpty {
                            VStack(spacing: 16) {
                                Image("Oli_3_bgless")
                                    .resizable()
                                    .scaledToFit()
                                    .frame(height: 140)
                                    .opacity(0.85)
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
                                                .foregroundColor(.primary)
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
                            } else if viewModel.viewMode == 1 {
                                // Auslassplan with clean horizontal buffer
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
                                .padding(.horizontal, 16)
                            } else {
                                // 3. Live Plakatwechsel Tab
                                VStack(spacing: 12) {
                                    if viewModel.posterAlerts.isEmpty {
                                        VStack(spacing: 12) {
                                            Image("Oli_Success_bgless")
                                                .resizable()
                                                .scaledToFit()
                                                .frame(width: 80, height: 80)
                                            Text("Keine Plakatwechsel fällig")
                                                .font(.headline)
                                                .foregroundColor(.primary)
                                            Text("In allen Sälen laufen heute identische Filme oder der Wechsel für morgen ist schon vorbereitet.")
                                                .font(.caption)
                                                .foregroundColor(.gray)
                                                .multilineTextAlignment(.center)
                                                .padding(.horizontal, 30)
                                        }
                                        .padding(.top, 40)
                                    } else {
                                        ForEach(viewModel.posterAlerts) { alert in
                                            PosterAlertCard(
                                                alert: alert,
                                                onToggle: {
                                                    viewModel.togglePosterAlertCompleted(alert.id)
                                                }
                                            )
                                        }
                                    }
                                }
                                .padding(.horizontal, 16)
                            }
                        }
                    }
                    .padding(.bottom, 100)
                }
                .coordinateSpace(name: "liveScroll")
                .onPreferenceChange(ScrollOffsetPreferenceKey.self) { value in
                    withAnimation(.easeInOut(duration: 0.2)) {
                        isHeaderCollapsed = value < -20
                    }
                }
            }
            .task {
                await viewModel.fetchSessions()
            }
            .sheet(isPresented: $showSpickzettelSheet) {
                FilmSpickzettelSheet()
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
    
    private var isPinned: Bool {
        AuslassActivityManager.shared.pinnedAuslassID == auslass.id.uuidString
    }
    
    private var cardBorderColor: Color {
        (auslass.isActive && !isCheckedOff) ? Color.red.opacity(0.5) : Color.primary.opacity(0.1)
    }
    
    var body: some View {
        HStack {
            checkboxButton
            infoColumn
            Spacer()
            if !isCheckedOff {
                rightColumn
            }
        }
        .padding()
        .background(Color.primary.opacity(isCheckedOff ? 0.02 : 0.05))
        .cornerRadius(12)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(cardBorderColor, lineWidth: 1)
        )
        .opacity(isCheckedOff ? 0.5 : 1.0)
    }
    
    private var checkboxButton: some View {
        Button(action: onToggle) {
            Image(systemName: isCheckedOff ? "checkmark.circle.fill" : "circle")
                .font(.title2)
                .foregroundColor(isCheckedOff ? .green : .gray)
        }
        .padding(.trailing, 8)
    }
    
    private var infoColumn: some View {
        VStack(alignment: .leading, spacing: 4) {
            headerRow
            titleRow
            capacityRow
        }
    }
    
    private var headerRow: some View {
        HStack(spacing: 8) {
            Text("Saal \(auslass.hall)")
                .font(.caption)
                .fontWeight(.bold)
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(auslass.isActive ? Color.red : Color.blue.opacity(0.8))
                .foregroundColor(.primary)
                .cornerRadius(6)
            
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
    }
    
    private var titleRow: some View {
        Text(auslass.movieTitle)
            .font(.headline)
            .foregroundColor(isCheckedOff ? .gray : .primary)
            .lineLimit(1)
            .strikethrough(isCheckedOff)
    }
    
    private var capacityRow: some View {
        HStack {
            Image(systemName: "person.fill")
                .foregroundColor(.gray)
                .font(.caption)
            Text("\(auslass.sold) / \(auslass.capacity) verkauft")
                .font(.caption)
                .foregroundColor(.gray)
        }
    }
    
    private var rightColumn: some View {
        VStack(alignment: .trailing, spacing: 6) {
            countdownLabel
            pinButton
        }
    }
    
    @ViewBuilder
    private var countdownLabel: some View {
        if auslass.minutesLeft > 0 {
            Text("in \(auslass.minutesLeft) Min")
                .font(.caption)
                .fontWeight(.semibold)
                .foregroundColor(auslass.isActive ? .red : .gray)
        } else {
            Text("FÄLLIG")
                .font(.caption)
                .fontWeight(.black)
                .foregroundColor(.red)
        }
    }
    
    private var pinButton: some View {
        Button(action: handlePinToggle) {
            HStack(spacing: 4) {
                Image(systemName: isPinned ? "pin.fill" : "pin")
                    .font(.system(size: 11))
                Text(isPinned ? "Aktiv" : "Pin")
                    .font(.system(size: 10, weight: .bold))
            }
            .padding(.horizontal, 6)
            .padding(.vertical, 3)
            .background(isPinned ? Color.yellow.opacity(0.25) : Color.primary.opacity(0.08))
            .foregroundColor(isPinned ? .yellow : .gray)
            .cornerRadius(6)
        }
    }
    
    private func handlePinToggle() {
        let idStr = auslass.id.uuidString
        if isPinned {
            AuslassActivityManager.shared.stopCurrentActivity()
        } else {
            AuslassActivityManager.shared.startAuslassActivity(
                hallName: auslass.hall,
                movieTitle: auslass.movieTitle,
                guests: auslass.sold,
                endTime: auslass.endTime,
                auslassID: idStr
            )
            WatchConnectivityManager.shared.sendUpcomingAuslassToWatch(
                hall: auslass.hall,
                movie: auslass.movieTitle,
                minutesRemaining: auslass.minutesLeft,
                guests: auslass.sold
            )
        }
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
    
    var isPast: Bool {
        let parts = session.time.split(separator: ":")
        guard parts.count == 2, let h = Int(parts[0]), let m = Int(parts[1]) else { return false }
        let now = Date()
        let cal = Calendar.current
        guard let start = cal.date(bySettingHour: h, minute: m, second: 0, of: now) else { return false }
        return now > start
    }
    
    var hasEnded: Bool {
        let parts = session.time.split(separator: ":")
        guard parts.count == 2, let h = Int(parts[0]), let m = Int(parts[1]) else { return false }
        let now = Date()
        let cal = Calendar.current
        let duration = session.duration ?? 120
        guard let start = cal.date(bySettingHour: h, minute: m, second: 0, of: now) else { return false }
        let end = start.addingTimeInterval(TimeInterval(duration * 60))
        return now > end
    }
    
    var isRunning: Bool {
        isPast && !hasEnded
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(spacing: 8) {
                Text(session.time)
                    .font(.caption)
                    .fontWeight(.bold)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(isRunning ? Color.green.opacity(0.25) : (hasEnded ? Color.gray.opacity(0.2) : Color.blue.opacity(0.2)))
                    .foregroundColor(isRunning ? .green : (hasEnded ? .gray : .blue))
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
                
                if isRunning {
                    HStack(spacing: 4) {
                        Circle()
                            .fill(Color.green)
                            .frame(width: 6, height: 6)
                        Text("Läuft")
                            .font(.system(size: 10, weight: .bold))
                            .foregroundColor(.green)
                    }
                    .padding(.horizontal, 7)
                    .padding(.vertical, 3)
                    .background(Color.green.opacity(0.18))
                    .cornerRadius(6)
                } else if hasEnded {
                    Text("Beendet")
                        .font(.system(size: 9, weight: .bold))
                        .foregroundColor(.gray)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(Color.primary.opacity(0.06))
                        .cornerRadius(4)
                }
            }
            
            Text(session.title)
                .font(.headline)
                .foregroundColor(.primary)
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
        .background(Color.primary.opacity(hasEnded ? 0.02 : 0.05))
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(
                    isRunning ? Color.green.opacity(0.4) :
                    (timeWarning != nil && !hasEnded ? (fskAge == 18 ? Color.red.opacity(0.4) : Color.orange.opacity(0.3)) : Color.primary.opacity(hasEnded ? 0.04 : 0.1)),
                    lineWidth: isRunning ? 1.5 : 1
                )
        )
        .opacity(hasEnded ? 0.35 : 1.0)
        .grayscale(hasEnded ? 0.6 : 0)
    }
}

struct LiveView_Previews: PreviewProvider {
    static var previews: some View {
        LiveView().environmentObject(AuthManager.shared)
    }
}
