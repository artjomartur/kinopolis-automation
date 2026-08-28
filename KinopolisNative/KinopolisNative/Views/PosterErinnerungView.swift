import SwiftUI
import Combine

// MARK: - Models
struct PosterChangeAlert: Identifiable {
    let id: String
    let hallName: String
    let currentMovie: String
    let nextMovie: String
    let nextMovieTime: String
    let nextMoviePoster: String?
    let changeTime: Date
    let isLastSession: Bool
    var isCompleted: Bool
}

struct PosterReservation: Identifiable, Codable {
    let id: UUID
    let movieTitle: String
    let employeeName: String
    let size: String // e.g. "DIN A1", "DIN A0", "Aufsteller"
    let dateAdded: Date
    var isReady: Bool
    var notes: String
}

// MARK: - ViewModel
@MainActor
class PosterErinnerungViewModel: ObservableObject {
    @Published var alerts: [PosterChangeAlert] = []
    @Published var reservations: [PosterReservation] = []
    @Published var availableMovies: [String] = []
    @Published var isLoading = false
    
    private let completedIDsKey = "completedPosterIDs"
    private let reservationsKey = "posterReservationsData"
    
    private var selectedLocation: String {
        UserDefaults.standard.string(forKey: "selectedLocation") ?? "su"
    }
    
    private var completedIDs: Set<String> {
        get {
            if let data = UserDefaults.standard.string(forKey: completedIDsKey)?.data(using: .utf8),
               let arr = try? JSONDecoder().decode([String].self, from: data) {
                return Set(arr)
            }
            return []
        }
        set {
            if let data = try? JSONEncoder().encode(Array(newValue)),
               let str = String(data: data, encoding: .utf8) {
                UserDefaults.standard.set(str, forKey: completedIDsKey)
            }
        }
    }
    
    init() {
        loadReservations()
    }
    
    func loadReservations() {
        if let str = UserDefaults.standard.string(forKey: reservationsKey),
           let data = str.data(using: .utf8),
           let arr = try? JSONDecoder().decode([PosterReservation].self, from: data) {
            self.reservations = arr
        } else {
            // Default sample reservations if empty
            self.reservations = [
                PosterReservation(id: UUID(), movieTitle: "Deadpool & Wolverine", employeeName: "Artjom Becker", size: "DIN A1", dateAdded: Date().addingTimeInterval(-86400 * 3), isReady: true, notes: "Im Büro hinterlegt"),
                PosterReservation(id: UUID(), movieTitle: "Spider-Man: Brand New Day", employeeName: "Artjom Becker", size: "DIN A0", dateAdded: Date(), isReady: false, notes: "Vorgemerkt für Letztspielung")
            ]
            saveReservations()
        }
    }
    
    func saveReservations() {
        if let data = try? JSONEncoder().encode(reservations),
           let str = String(data: data, encoding: .utf8) {
            UserDefaults.standard.set(str, forKey: reservationsKey)
        }
    }
    
    func addReservation(movie: String, employee: String, size: String, notes: String) {
        let newRes = PosterReservation(
            id: UUID(),
            movieTitle: movie.trimmingCharacters(in: .whitespaces),
            employeeName: employee.trimmingCharacters(in: .whitespaces),
            size: size,
            dateAdded: Date(),
            isReady: false,
            notes: notes
        )
        reservations.insert(newRes, at: 0)
        saveReservations()
        
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.success)
    }
    
    func toggleReservationReady(_ id: UUID) {
        if let idx = reservations.firstIndex(where: { $0.id == id }) {
            reservations[idx].isReady.toggle()
            saveReservations()
            let generator = UIImpactFeedbackGenerator(style: .medium)
            generator.impactOccurred()
        }
    }
    
    func deleteReservation(_ id: UUID) {
        reservations.removeAll(where: { $0.id == id })
        saveReservations()
    }
    
    func fetchPosterAlerts() async {
        isLoading = true
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        let dateStr = formatter.string(from: Date())
        
        do {
            let halls = try await ScraperManager.shared.fetchSessions(location: selectedLocation, dateStr: dateStr)
            
            // Also fetch tomorrow's sessions to know the first film of tomorrow
            let calendar = Calendar.current
            let now = Date()
            let tomorrow = calendar.date(byAdding: .day, value: 1, to: now) ?? now.addingTimeInterval(86400)
            let tomorrowStr = formatter.string(from: tomorrow)
            let hallsTomorrow = (try? await ScraperManager.shared.fetchSessions(location: selectedLocation, dateStr: tomorrowStr)) ?? []
            
            var generatedAlerts: [PosterChangeAlert] = []
            var foundMovieTitles: Set<String> = []
            
            for hall in halls {
                let sessions = hall.sessions ?? []
                let sortedSessions = sessions.filter { $0.time.contains(":") }.sorted { $0.time < $1.time }
                
                for s in sortedSessions {
                    foundMovieTitles.insert(s.title)
                }
                
                guard !sortedSessions.isEmpty else { continue }
                
                for i in 0..<sortedSessions.count {
                    let currentSession = sortedSessions[i]
                    
                    // Parse start time
                    let parts = currentSession.time.split(separator: ":")
                    guard parts.count == 2,
                          let hour = Int(parts[0]),
                          let minute = Int(parts[1]) else { continue }
                    
                    var comps = calendar.dateComponents([.year, .month, .day], from: now)
                    comps.hour = hour
                    comps.minute = minute
                    guard let sessionDate = calendar.date(from: comps) else { continue }
                    
                    // Poster change is due 20 minutes after session start
                    let changeDueDate = sessionDate.addingTimeInterval(20 * 60)
                    
                    if i < sortedSessions.count - 1 {
                        let nextSession = sortedSessions[i + 1]
                        
                        // Only alert if movie actually changes
                        if currentSession.title != nextSession.title {
                            let alertId = "poster-\(hall.name)-\(nextSession.title)-\(nextSession.time)"
                            let isDone = completedIDs.contains(alertId)
                            
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
                                    isCompleted: isDone
                                )
                            )
                        }
                    } else {
                        // Last session of today -> determine first film of tomorrow!
                        let tomorrowHall = hallsTomorrow.first(where: { $0.name.lowercased() == hall.name.lowercased() })
                        let tomorrowSessions = (tomorrowHall?.sessions ?? []).filter { $0.time.contains(":") }.sorted { $0.time < $1.time }
                        
                        let nextMovieTitle: String
                        let nextMovieTime: String
                        let nextMoviePoster: String?
                        
                        if let firstTomorrow = tomorrowSessions.first {
                            nextMovieTitle = "Morgen: \(firstTomorrow.title)"
                            nextMovieTime = "\(firstTomorrow.time) Uhr"
                            nextMoviePoster = firstTomorrow.poster
                            foundMovieTitles.insert(firstTomorrow.title)
                        } else {
                            nextMovieTitle = "Morgen: Erste Vorstellung"
                            nextMovieTime = "Morgen Früh"
                            nextMoviePoster = nil
                        }
                        
                        let alertId = "poster-last-\(hall.name)-\(currentSession.title)-\(nextMovieTitle)"
                        let isDone = completedIDs.contains(alertId)
                        
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
                                isCompleted: isDone
                            )
                        )
                    }
                }
            }
            
            // Sort by change time
            self.alerts = generatedAlerts.sorted { $0.changeTime < $1.changeTime }
            self.availableMovies = Array(foundMovieTitles).sorted()
            
        } catch {
            print("Poster alerts fetch error: \(error)")
        }
        
        isLoading = false
    }
    
    func toggleAlertCompleted(_ alertId: String) {
        var ids = completedIDs
        if ids.contains(alertId) {
            ids.remove(alertId)
        } else {
            ids.insert(alertId)
            let generator = UINotificationFeedbackGenerator()
            generator.notificationOccurred(.success)
        }
        self.completedIDs = ids
        
        if let idx = alerts.firstIndex(where: { $0.id == alertId }) {
            alerts[idx].isCompleted.toggle()
        }
    }
}

// MARK: - Main View
struct PosterErinnerungView: View {
    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject var authManager: AuthManager
    @StateObject private var viewModel = PosterErinnerungViewModel()
    @State private var selectedTab = 0 // 0: Live-Plakatwechsel, 1: Poster-Reservierung
    @State private var showAddReservationSheet = false
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(UIColor.systemBackground).ignoresSafeArea()
                
                VStack(spacing: 0) {
                    
                    // Segmented Switcher
                    Picker("Kategorie", selection: $selectedTab) {
                        Text("🖼️ Plakatwechsel (\(viewModel.alerts.filter { !$0.isCompleted }.count))").tag(0)
                        Text("🔖 Reservierungen (\(viewModel.reservations.count))").tag(1)
                    }
                    .pickerStyle(SegmentedPickerStyle())
                    .padding(.horizontal, 16)
                    .padding(.top, 12)
                    .padding(.bottom, 12)
                    
                    if selectedTab == 0 {
                        // TAB 0: LIVE PLAKATWECHSEL
                        ScrollView {
                            VStack(spacing: 14) {
                                
                                // Info Card
                                HStack(spacing: 12) {
                                    Image(systemName: "info.circle.fill")
                                        .foregroundColor(.blue)
                                        .font(.title3)
                                    
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text("Plakattausch an den Kinosälen")
                                            .font(.subheadline)
                                            .fontWeight(.bold)
                                            .foregroundColor(.primary)
                                        Text("Sobald ein Film 20 Min. läuft, kann der Schaukasten für den nächsten Film getauscht werden.")
                                            .font(.caption)
                                            .foregroundColor(.gray)
                                    }
                                }
                                .padding(14)
                                .background(Color.blue.opacity(0.12))
                                .cornerRadius(14)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 14)
                                        .stroke(Color.blue.opacity(0.3), lineWidth: 1)
                                )
                                .padding(.horizontal, 16)
                                
                                if viewModel.isLoading && viewModel.alerts.isEmpty {
                                    VStack(spacing: 12) {
                                        ProgressView()
                                            .progressViewStyle(CircularProgressViewStyle(tint: .white))
                                        Text("Prüfe Saal-Pläne...")
                                            .font(.caption)
                                            .foregroundColor(.gray)
                                    }
                                    .padding(.top, 40)
                                } else if viewModel.alerts.isEmpty {
                                    VStack(spacing: 12) {
                                        Image(systemName: "checkmark.seal.fill")
                                            .font(.system(size: 40))
                                            .foregroundColor(.green)
                                        Text("Keine Plakatwechsel anstehend")
                                            .font(.headline)
                                            .foregroundColor(.primary)
                                        Text("In allen Sälen laufen heute identische Filme oder das Programm ist abgeschlossen.")
                                            .font(.caption)
                                            .foregroundColor(.gray)
                                            .multilineTextAlignment(.center)
                                            .padding(.horizontal, 30)
                                    }
                                    .padding(.top, 50)
                                } else {
                                    ForEach(viewModel.alerts) { alert in
                                        PosterAlertCard(
                                            alert: alert,
                                            onToggle: {
                                                viewModel.toggleAlertCompleted(alert.id)
                                            }
                                        )
                                    }
                                    .padding(.horizontal, 16)
                                }
                                
                                Spacer().frame(height: 30)
                            }
                            .padding(.top, 6)
                        }
                    } else {
                        // TAB 1: POSTER-RESERVIERUNGEN
                        ScrollView {
                            VStack(spacing: 14) {
                                
                                // Header Button to add reservation
                                Button(action: { showAddReservationSheet = true }) {
                                    HStack {
                                        Image(systemName: "plus.circle.fill")
                                            .font(.title3)
                                        Text("Neues Plakat für mich vormerken")
                                            .fontWeight(.bold)
                                    }
                                    .frame(maxWidth: .infinity)
                                    .padding()
                                    .background(LinearGradient(colors: [.red, .orange], startPoint: .leading, endPoint: .trailing))
                                    .foregroundColor(.primary)
                                    .cornerRadius(16)
                                    .shadow(color: Color.red.opacity(0.3), radius: 8, x: 0, y: 3)
                                }
                                .padding(.horizontal, 16)
                                
                                if viewModel.reservations.isEmpty {
                                    VStack(spacing: 12) {
                                        Image(systemName: "photo.on.rectangle.angled")
                                            .font(.system(size: 44))
                                            .foregroundColor(.gray.opacity(0.4))
                                        Text("Keine Poster reserviert")
                                            .font(.headline)
                                            .foregroundColor(.primary)
                                        Text("Merke dir Kinoplakate für dein Zimmer vor, bevor die Filme aus dem Programm genommen werden.")
                                            .font(.caption)
                                            .foregroundColor(.gray)
                                            .multilineTextAlignment(.center)
                                            .padding(.horizontal, 30)
                                    }
                                    .padding(.top, 40)
                                } else {
                                    ForEach(viewModel.reservations) { res in
                                        PosterReservationCard(
                                            reservation: res,
                                            onToggleReady: { viewModel.toggleReservationReady(res.id) },
                                            onDelete: { viewModel.deleteReservation(res.id) }
                                        )
                                    }
                                    .padding(.horizontal, 16)
                                }
                                
                                Spacer().frame(height: 30)
                            }
                            .padding(.top, 6)
                        }
                    }
                }
            }
            .navigationTitle("🖼️ Poster & Plakatwechsel")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button(action: {
                        Task { await viewModel.fetchPosterAlerts() }
                    }) {
                        Image(systemName: "arrow.triangle.2.circlepath")
                            .foregroundColor(.primary)
                    }
                }
                
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Schließen") {
                        dismiss()
                    }
                    .foregroundColor(.red)
                    .fontWeight(.bold)
                }
            }
            .sheet(isPresented: $showAddReservationSheet) {
                AddPosterReservationSheet(
                    availableMovies: viewModel.availableMovies,
                    defaultName: authManager.currentUser?.name ?? "Artjom Becker",
                    onAdd: { movie, name, size, notes in
                        viewModel.addReservation(movie: movie, employee: name, size: size, notes: notes)
                    }
                )
            }
            .task {
                await viewModel.fetchPosterAlerts()
            }
        }
    }
}

// MARK: - Poster Alert Card
struct PosterAlertCard: View {
    let alert: PosterChangeAlert
    let onToggle: () -> Void
    
    var isDueNow: Bool {
        Date() >= alert.changeTime
    }
    
    var timeFormatted: String {
        let formatter = DateFormatter()
        formatter.dateFormat = "HH:mm"
        return formatter.string(from: alert.changeTime)
    }
    
    var body: some View {
        HStack(spacing: 14) {
            // Checkmark button
            Button(action: onToggle) {
                Image(systemName: alert.isCompleted ? "checkmark.circle.fill" : "circle")
                    .font(.system(size: 26))
                    .foregroundColor(alert.isCompleted ? .green : (isDueNow ? .red : .gray))
            }
            
            VStack(alignment: .leading, spacing: 5) {
                HStack(spacing: 6) {
                    Text(alert.hallName)
                        .font(.caption)
                        .fontWeight(.black)
                        .padding(.horizontal, 7)
                        .padding(.vertical, 3)
                        .background(Color.red)
                        .foregroundColor(.primary)
                        .cornerRadius(5)
                    
                    if alert.isCompleted {
                        Text("ERLEDIGT")
                            .font(.caption2)
                            .fontWeight(.bold)
                            .foregroundColor(.green)
                    } else if isDueNow {
                        Text("JETZT WECHSELN")
                            .font(.caption2)
                            .fontWeight(.bold)
                            .foregroundColor(.red)
                    } else {
                        Text("Ab \(timeFormatted) Uhr")
                            .font(.caption2)
                            .foregroundColor(.gray)
                    }
                }
                
                Text("Neu: \(alert.nextMovie)")
                    .font(.subheadline)
                    .fontWeight(.bold)
                    .foregroundColor(alert.isCompleted ? .gray : .white)
                    .strikethrough(alert.isCompleted)
                    .lineLimit(1)
                
                Text("Ersetzt: \(alert.currentMovie) (Start: \(alert.nextMovieTime) Uhr)")
                    .font(.caption)
                    .foregroundColor(.gray)
                    .lineLimit(1)
            }
            
            Spacer()
            
            if let posterUrl = alert.nextMoviePoster, let url = URL(string: posterUrl) {
                AsyncImage(url: url) { image in
                    image.resizable().scaledToFill()
                } placeholder: {
                    Color.white.opacity(0.1)
                }
                .frame(width: 40, height: 58)
                .cornerRadius(6)
                .clipped()
            } else {
                Image(systemName: "photo")
                    .foregroundColor(.gray.opacity(0.4))
                    .frame(width: 40, height: 58)
                    .background(Color.white.opacity(0.05))
                    .cornerRadius(6)
            }
        }
        .padding(14)
        .background(Color.white.opacity(alert.isCompleted ? 0.02 : 0.05))
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(isDueNow && !alert.isCompleted ? Color.red.opacity(0.6) : Color.white.opacity(0.08), lineWidth: 1)
        )
        .opacity(alert.isCompleted ? 0.5 : 1.0)
    }
}

// MARK: - Poster Reservation Card
struct PosterReservationCard: View {
    let reservation: PosterReservation
    let onToggleReady: () -> Void
    let onDelete: () -> Void
    
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack {
                VStack(alignment: .leading, spacing: 3) {
                    Text(reservation.movieTitle)
                        .font(.headline)
                        .fontWeight(.bold)
                        .foregroundColor(.primary)
                    
                    HStack(spacing: 6) {
                        Text(reservation.size)
                            .font(.caption2)
                            .fontWeight(.bold)
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(Color.orange.opacity(0.2))
                            .foregroundColor(.orange)
                            .cornerRadius(4)
                        
                        Text("Für \(reservation.employeeName)")
                            .font(.caption)
                            .foregroundColor(.gray)
                    }
                }
                
                Spacer()
                
                // Status Badge & Action
                Button(action: onToggleReady) {
                    HStack(spacing: 4) {
                        Image(systemName: reservation.isReady ? "checkmark.seal.fill" : "clock.fill")
                            .font(.caption2)
                        Text(reservation.isReady ? "Abholbereit" : "Vorgemerkt")
                            .font(.caption2)
                            .fontWeight(.bold)
                    }
                    .padding(.horizontal, 8)
                    .padding(.vertical, 5)
                    .background(reservation.isReady ? Color.green.opacity(0.2) : Color.yellow.opacity(0.15))
                    .foregroundColor(reservation.isReady ? .green : .yellow)
                    .cornerRadius(8)
                }
            }
            
            if !reservation.notes.isEmpty {
                Text("📌 \(reservation.notes)")
                    .font(.caption)
                    .foregroundColor(.gray.opacity(0.8))
            }
            
            HStack {
                Text(reservation.dateAdded.formatted(date: .abbreviated, time: .omitted))
                    .font(.caption2)
                    .foregroundColor(.gray.opacity(0.5))
                
                Spacer()
                
                Button(role: .destructive, action: onDelete) {
                    Image(systemName: "trash")
                        .font(.caption)
                        .foregroundColor(.red.opacity(0.7))
                }
            }
        }
        .padding(14)
        .background(Color.white.opacity(0.04))
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(reservation.isReady ? Color.green.opacity(0.4) : Color.white.opacity(0.08), lineWidth: 1)
        )
    }
}

// MARK: - Add Poster Reservation Sheet
struct AddPosterReservationSheet: View {
    @Environment(\.dismiss) private var dismiss
    let availableMovies: [String]
    let defaultName: String
    let onAdd: (String, String, String, String) -> Void
    
    @State private var movieTitle = ""
    @State private var employeeName = ""
    @State private var selectedSize = "DIN A1"
    @State private var notes = ""
    
    let sizes = ["DIN A1 (Standard)", "DIN A0 (Groß)", "Aufsteller / Pappe", "Banner"]
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Kinofilm auswählen")) {
                    if !availableMovies.isEmpty {
                        Picker("Aktuelles Programm", selection: $movieTitle) {
                            Text("-- Aus Liste wählen --").tag("")
                            ForEach(availableMovies, id: \.self) { movie in
                                Text(movie).tag(movie)
                            }
                        }
                    }
                    
                    TextField("Oder Film manuell eingeben", text: $movieTitle)
                }
                
                Section(header: Text("Reservierungsdetails")) {
                    TextField("Mitarbeiter-Name", text: $employeeName)
                    
                    Picker("Format / Größe", selection: $selectedSize) {
                        ForEach(sizes, id: \.self) { size in
                            Text(size).tag(size)
                        }
                    }
                    
                    TextField("Notiz (z.B. Ablageort oder Wunsch)", text: $notes)
                }
            }
            .navigationTitle("Poster reservieren")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Abbrechen") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Speichern") {
                        onAdd(movieTitle, employeeName, selectedSize, notes)
                        dismiss()
                    }
                    .disabled(movieTitle.trimmingCharacters(in: .whitespaces).isEmpty || employeeName.trimmingCharacters(in: .whitespaces).isEmpty)
                }
            }
            .onAppear {
                self.employeeName = defaultName
                if let first = availableMovies.first, movieTitle.isEmpty {
                    self.movieTitle = first
                }
            }
        }
    }
}
