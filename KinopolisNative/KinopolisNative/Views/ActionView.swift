import SwiftUI

struct ActionView: View {
    @EnvironmentObject var authManager: AuthManager
    
    // Shift state
    @AppStorage("isShiftActive") private var isShiftActive = false
    @AppStorage("shiftStartTime") private var shiftStartTime: Double = 0
    @AppStorage("userXP") private var userXP: Int = 120
    @AppStorage("selectedDept") private var selectedDept = "tl"
    
    // TL State
    @State private var showIncidentSheet = false
    @State private var showFundbueroSheet = false
    @State private var incidentCategory = "Technik"
    @State private var incidentText = ""
    @State private var incidentLogs: [IncidentLog] = []
    
    
    var currentHallsList: [String] {
        let loc = UserDefaults.standard.string(forKey: "selectedLocation") ?? "su"
        if loc == "kp" {
            return ["Kino 1", "Kino 2", "Kino 3", "Kino 4", "Kino 5", "Kino 6", "Kino 7", "Kino 8"]
        } else if loc == "cd" {
            return ["Helia 1", "Helia 2", "Helia 3", "Helia 5", "Helia 7", "Festival", "Broadway", "Pali"]
        } else if loc == "rx" {
            return ["Rex 1", "Rex 2", "Rex 3"]
        }
        return ["OnyxLED", "Kino 1", "Kino 2", "Kino 3", "Kino 4", "Kino 5", "Kino 6", "Kino 7", "Kino 8", "Kino 9"]
    }
    
    // TL Shift Opening Checklist
    @State private var tlOpeningChecklist: [ChecklistItem] = [
        ChecklistItem(title: "🔑 Tresor-Schlüssel & Wechselgeldkassetten ausgegeben", isCompleted: false),
        ChecklistItem(title: "🚪 Notausgänge & Fluchtwege kontrolliert (Brandschutz)", isCompleted: false),
        ChecklistItem(title: "🎬 TMS / Projektion Vorführer synchronisiert", isCompleted: false),
        ChecklistItem(title: "🎟️ Einlass-Scanner Akkus & FSK-Hinweise geprüft", isCompleted: true),
        ChecklistItem(title: "🍿 Theke Postmix-Sirup & CO2-Druck geprüft", isCompleted: true)
    ]
    
    // Department Specific Checklists
    @State private var standardChecklist: [ChecklistItem] = [
        ChecklistItem(title: "Saal 1-4 Rundgang & Becherkontrolle", isCompleted: false),
        ChecklistItem(title: "Popcorn-Warmhalter auffüllen", isCompleted: true),
        ChecklistItem(title: "Nachos-Käsespender Temperatur prüfen", isCompleted: false),
        ChecklistItem(title: "Einlass-Scanner Akkus geladen", isCompleted: true),
        ChecklistItem(title: "MHD-Prüfung Kühlhaus erledigt", isCompleted: false)
    ]
    
    // Announcement state
    @State private var announcementText = ""
    @State private var isPriorityBroadcast = false
    @State private var showAnnouncementToast = false
    
    @State private var isHeaderCollapsed = false
    
    var isUserTLOrAdmin: Bool {
        let role = authManager.currentUser?.role.lowercased() ?? ""
        return role == "admin" || role == "bl" || role == "tl" || selectedDept == "tl"
    }
    
    var body: some View {
        ZStack {
            Color(red: 24/255, green: 24/255, blue: 26/255).ignoresSafeArea()
            
            VStack(spacing: 0) {
                // Fixed Master Header (Collapses on scroll)
                MasterHeaderView(
                    imageName: "Oli_3_bgless",
                    subtitle: selectedDept == "tl" ? "👔 TL / BL Leitstand" : "Schicht-Management",
                    title: "Team & Aktionen",
                    shortTitle: "Action",
                    isCollapsed: isHeaderCollapsed
                )
                
                ScrollView {
                    VStack(spacing: 20) {
                        
                        GeometryReader { proxy in
                            Color.clear.preference(
                                key: ScrollOffsetPreferenceKey.self,
                                value: proxy.frame(in: .named("actionScroll")).minY
                            )
                        }
                        .frame(height: 0)
                        
                        // 1. SCHICHT-CONTROL CARD
                    VStack(spacing: 14) {
                        HStack {
                            VStack(alignment: .leading, spacing: 4) {
                                HStack(spacing: 8) {
                                    Circle()
                                        .fill(isShiftActive ? Color.green : Color.gray)
                                        .frame(width: 10, height: 10)
                                    Text(isShiftActive ? "SCHICHT LÄUFT" : "KEINE SCHICHT AKTIV")
                                        .font(.caption)
                                        .fontWeight(.heavy)
                                        .foregroundColor(isShiftActive ? .green : .gray)
                                        .tracking(1)
                                }
                                
                                Text(isShiftActive ? "Seit \(formattedStartTime()) eingestempelt" : "Tippe zum Einstempeln")
                                    .font(.subheadline)
                                    .foregroundColor(.white)
                            }
                            
                            Spacer()
                            
                            HStack(spacing: 4) {
                                Text("⭐️ \(userXP) XP")
                                    .font(.subheadline)
                                    .fontWeight(.bold)
                                    .foregroundColor(.yellow)
                            }
                            .padding(.horizontal, 10)
                            .padding(.vertical, 6)
                            .background(Color.yellow.opacity(0.15))
                            .cornerRadius(10)
                        }
                        
                        // Shift Button
                        Button(action: toggleShift) {
                            HStack(spacing: 10) {
                                Image(systemName: isShiftActive ? "stop.circle.fill" : "play.circle.fill")
                                    .font(.title3)
                                Text(isShiftActive ? "Schicht beenden (+50 XP)" : "Schicht starten")
                                    .fontWeight(.bold)
                            }
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 14)
                            .background(
                                isShiftActive ?
                                LinearGradient(colors: [Color.red, Color(red: 180/255, green: 20/255, blue: 30/255)], startPoint: .leading, endPoint: .trailing) :
                                LinearGradient(colors: [Color.green, Color(red: 34/255, green: 160/255, blue: 85/255)], startPoint: .leading, endPoint: .trailing)
                            )
                            .foregroundColor(.white)
                            .cornerRadius(14)
                            .shadow(color: (isShiftActive ? Color.red : Color.green).opacity(0.3), radius: 8, y: 3)
                        }
                    }
                    .padding(18)
                    .background(Color.white.opacity(0.04))
                    .cornerRadius(20)
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(isShiftActive ? Color.green.opacity(0.3) : Color.white.opacity(0.08), lineWidth: 1)
                    )
                    .padding(.horizontal)
                    
                    // 2. BEREICH / DEPT PICKER
                    VStack(alignment: .leading, spacing: 10) {
                        Text("AKTIVER BEREICH")
                            .font(.system(size: 11, weight: .bold))
                            .foregroundColor(.gray)
                            .padding(.horizontal)
                        
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(spacing: 10) {
                                DeptChip(title: "👔 TL / BL", id: "tl", selectedId: $selectedDept)
                                DeptChip(title: "🎟️ Einlass", id: "einlass", selectedId: $selectedDept)
                                DeptChip(title: "🍿 Theke", id: "theke", selectedId: $selectedDept)
                                DeptChip(title: "💰 Kasse", id: "kasse", selectedId: $selectedDept)
                                DeptChip(title: "🌐 Alles", id: "alles", selectedId: $selectedDept)
                            }
                            .padding(.horizontal)
                        }
                    }
                    
                    // 3. TL / BL SPEZIAL-FUNKTIONEN
                    if selectedDept == "tl" {
                        VStack(alignment: .leading, spacing: 16) {
                            HStack {
                                Image(systemName: "shield.lefthalf.filled")
                                    .foregroundColor(.red)
                                Text("TL / BL Schichtstart-Checkliste")
                                    .font(.headline)
                                    .fontWeight(.bold)
                                    .foregroundColor(.white)
                                Spacer()
                                let completed = tlOpeningChecklist.filter { $0.isCompleted }.count
                                Text("\(completed)/\(tlOpeningChecklist.count)")
                                    .font(.caption)
                                    .fontWeight(.bold)
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 3)
                                    .background(Color.red.opacity(0.2))
                                    .foregroundColor(.red)
                                    .cornerRadius(6)
                            }
                            
                            VStack(spacing: 10) {
                                ForEach(tlOpeningChecklist.indices, id: \.self) { index in
                                    Button(action: {
                                        tlOpeningChecklist[index].isCompleted.toggle()
                                        let generator = UIImpactFeedbackGenerator(style: .medium)
                                        generator.impactOccurred()
                                    }) {
                                        HStack(spacing: 12) {
                                            Image(systemName: tlOpeningChecklist[index].isCompleted ? "checkmark.seal.fill" : "circle")
                                                .font(.title3)
                                                .foregroundColor(tlOpeningChecklist[index].isCompleted ? .green : .gray)
                                            
                                            Text(tlOpeningChecklist[index].title)
                                                .font(.subheadline)
                                                .foregroundColor(tlOpeningChecklist[index].isCompleted ? .gray : .white)
                                                .strikethrough(tlOpeningChecklist[index].isCompleted)
                                                .multilineTextAlignment(.leading)
                                            
                                            Spacer()
                                        }
                                        .padding(.vertical, 6)
                                    }
                                }
                            }
                        }
                        .padding(18)
                        .background(Color.red.opacity(0.06))
                        .cornerRadius(20)
                        .overlay(
                            RoundedRectangle(cornerRadius: 20)
                                .stroke(Color.red.opacity(0.3), lineWidth: 1.5)
                        )
                        .padding(.horizontal)
                        
                        // SAAL MONITOR & EINLASS-STATUS (TL / BL LIVE-ÜBERSICHT)
                        VStack(alignment: .leading, spacing: 14) {
                            HStack {
                                Image(systemName: "tv.fill")
                                    .foregroundColor(.blue)
                                Text("Live Saal- & Einlass-Monitor")
                                    .font(.headline)
                                    .fontWeight(.bold)
                                    .foregroundColor(.white)
                                Spacer()
                                Text("Echtzeit")
                                    .font(.caption2)
                                    .fontWeight(.bold)
                                    .padding(.horizontal, 6)
                                    .padding(.vertical, 2)
                                    .background(Color.blue.opacity(0.2))
                                    .foregroundColor(.blue)
                                    .cornerRadius(4)
                            }
                            
                            VStack(spacing: 8) {
                                ForEach(currentHallsList, id: \.self) { hall in
                                    let status = getLiveHallStatus(for: hall)
                                    HStack(spacing: 12) {
                                        VStack(alignment: .leading, spacing: 2) {
                                            Text(hall)
                                                .font(.subheadline)
                                                .fontWeight(.bold)
                                                .foregroundColor(.white)
                                            
                                            Text(status.detail)
                                                .font(.caption2)
                                                .foregroundColor(.gray)
                                                .lineLimit(1)
                                        }
                                        
                                        Spacer()
                                        
                                        Text(status.badge)
                                            .font(.caption)
                                            .fontWeight(.bold)
                                            .padding(.horizontal, 10)
                                            .padding(.vertical, 5)
                                            .background(status.color.opacity(0.18))
                                            .foregroundColor(status.color)
                                            .cornerRadius(8)
                                            .overlay(
                                                RoundedRectangle(cornerRadius: 8)
                                                    .stroke(status.color.opacity(0.4), lineWidth: 1)
                                            )
                                    }
                                    .padding(.vertical, 4)
                                    if hall != currentHallsList.last {
                                        Divider().background(Color.white.opacity(0.06))
                                    }
                                }
                            }
                        }
                        .padding(18)
                        .background(Color.white.opacity(0.04))
                        .cornerRadius(20)
                        .overlay(
                            RoundedRectangle(cornerRadius: 20)
                                .stroke(Color.white.opacity(0.08), lineWidth: 1)
                        )
                        .padding(.horizontal)
                        
                        // VORKOMMNIS / SCHICHTBERICHT ERFASSEN
                        VStack(alignment: .leading, spacing: 12) {
                            HStack {
                                Image(systemName: "exclamationmark.bubble.fill")
                                    .foregroundColor(.yellow)
                                Text("Vorkommnis / Vorfall erfassen")
                                    .font(.headline)
                                    .fontWeight(.bold)
                                    .foregroundColor(.white)
                                Spacer()
                            }
                            
                            HStack(spacing: 8) {
                                ForEach(["Technik", "Fundsache", "Gast", "Kasse"], id: \.self) { cat in
                                    Button(action: { incidentCategory = cat }) {
                                        Text(cat)
                                            .font(.caption)
                                            .fontWeight(incidentCategory == cat ? .bold : .medium)
                                            .padding(.horizontal, 10)
                                            .padding(.vertical, 6)
                                            .background(incidentCategory == cat ? Color.yellow : Color.white.opacity(0.06))
                                            .foregroundColor(incidentCategory == cat ? .black : .white)
                                            .cornerRadius(8)
                                    }
                                }
                            }
                            
                            HStack {
                                TextField("Notiz / Vorfall für Schichtbericht...", text: $incidentText)
                                    .padding(12)
                                    .background(Color.white.opacity(0.06))
                                    .cornerRadius(10)
                                    .foregroundColor(.white)
                                
                                Button(action: addIncident) {
                                    Image(systemName: "plus.circle.fill")
                                        .font(.title2)
                                        .foregroundColor(incidentText.isEmpty ? .gray : .yellow)
                                }
                                .disabled(incidentText.isEmpty)
                            }
                            
                            if !incidentLogs.isEmpty {
                                VStack(spacing: 8) {
                                    ForEach(incidentLogs) { log in
                                        HStack {
                                            Text("[\(log.category)]")
                                                .font(.caption2)
                                                .fontWeight(.bold)
                                                .foregroundColor(.yellow)
                                            Text(log.text)
                                                .font(.caption)
                                                .foregroundColor(.white)
                                            Spacer()
                                            Text(log.time)
                                                .font(.caption2)
                                                .foregroundColor(.gray)
                                        }
                                        .padding(8)
                                        .background(Color.white.opacity(0.03))
                                        .cornerRadius(8)
                                    }
                                }
                                .padding(.top, 4)
                            }
                        }
                        .padding(18)
                        .background(Color.white.opacity(0.04))
                        .cornerRadius(20)
                        .overlay(
                            RoundedRectangle(cornerRadius: 20)
                                .stroke(Color.white.opacity(0.08), lineWidth: 1)
                        )
                        .padding(.horizontal)
                    } else {
                        // 4. NORMALE TEAM-CHECKLISTE
                        VStack(alignment: .leading, spacing: 14) {
                            HStack {
                                Image(systemName: "checklist")
                                    .foregroundColor(.blue)
                                Text("Schicht-Aufgaben (\(selectedDept.uppercased()))")
                                    .font(.headline)
                                    .fontWeight(.bold)
                                    .foregroundColor(.white)
                                
                                Spacer()
                                
                                let completed = standardChecklist.filter { $0.isCompleted }.count
                                Text("\(completed)/\(standardChecklist.count)")
                                    .font(.caption)
                                    .fontWeight(.bold)
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 3)
                                    .background(Color.blue.opacity(0.2))
                                    .foregroundColor(.blue)
                                    .cornerRadius(6)
                            }
                            
                            VStack(spacing: 8) {
                                ForEach(standardChecklist.indices, id: \.self) { index in
                                    Button(action: {
                                        standardChecklist[index].isCompleted.toggle()
                                        let generator = UIImpactFeedbackGenerator(style: .light)
                                        generator.impactOccurred()
                                    }) {
                                        HStack(spacing: 12) {
                                            Image(systemName: standardChecklist[index].isCompleted ? "checkmark.circle.fill" : "circle")
                                                .font(.title3)
                                                .foregroundColor(standardChecklist[index].isCompleted ? .green : .gray)
                                            
                                            Text(standardChecklist[index].title)
                                                .font(.subheadline)
                                                .foregroundColor(standardChecklist[index].isCompleted ? .gray : .white)
                                                .strikethrough(standardChecklist[index].isCompleted)
                                            
                                            Spacer()
                                        }
                                        .padding(.vertical, 8)
                                    }
                                }
                            }
                        }
                        .padding(18)
                        .background(Color.white.opacity(0.04))
                        .cornerRadius(20)
                        .overlay(
                            RoundedRectangle(cornerRadius: 20)
                                .stroke(Color.white.opacity(0.08), lineWidth: 1)
                        )
                        .padding(.horizontal)
                    }
                    
                    // 5. DIGITALES FUNDBÜRO (FÜR ALLE)
                    Button(action: { showFundbueroSheet = true }) {
                        HStack(spacing: 14) {
                            Image(systemName: "bag.fill")
                                .font(.title2)
                                .foregroundColor(.orange)
                                .frame(width: 36)
                            
                            VStack(alignment: .leading, spacing: 3) {
                                Text("🎒 Digitales Fundbüro")
                                    .font(.headline)
                                    .fontWeight(.bold)
                                    .foregroundColor(.white)
                                Text("Fundsachen einsehen, eintragen & aushändigen")
                                    .font(.caption)
                                    .foregroundColor(.gray)
                            }
                            
                            Spacer()
                            
                            Image(systemName: "chevron.right")
                                .foregroundColor(.gray)
                        }
                        .padding(16)
                        .background(Color.white.opacity(0.04))
                        .cornerRadius(20)
                        .overlay(
                            RoundedRectangle(cornerRadius: 20)
                                .stroke(Color.white.opacity(0.08), lineWidth: 1)
                        )
                    }
                    .padding(.horizontal)
                    
                    // 6. DURCHSAGE / NOTIZ SCHREIBEN
                    VStack(alignment: .leading, spacing: 14) {
                        HStack {
                            Image(systemName: "megaphone.fill")
                                .foregroundColor(selectedDept == "tl" ? .red : .orange)
                            Text(selectedDept == "tl" ? "🚨 TL-Broadcast (An alle pinnen)" : "Team-Mitteilung senden")
                                .font(.headline)
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                            Spacer()
                        }
                        
                        HStack {
                            TextField(selectedDept == "tl" ? "Wichtige TL-Anweisung an alle Bereiche..." : "Kurze Info für die nächste Schicht...", text: $announcementText)
                                .padding(12)
                                .background(Color.white.opacity(0.06))
                                .cornerRadius(10)
                                .foregroundColor(.white)
                            
                            Button(action: sendAnnouncement) {
                                Image(systemName: "paperplane.fill")
                                    .foregroundColor(.white)
                                    .padding(12)
                                    .background(announcementText.isEmpty ? Color.gray.opacity(0.3) : (selectedDept == "tl" ? Color.red : Color.orange))
                                    .cornerRadius(10)
                            }
                            .disabled(announcementText.isEmpty)
                        }
                    }
                    .padding(18)
                    .background(Color.white.opacity(0.04))
                    .cornerRadius(20)
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(Color.white.opacity(0.08), lineWidth: 1)
                    )
                    .padding(.horizontal)
                    
                    Spacer().frame(height: 100)
                }
                .coordinateSpace(name: "actionScroll")
                .onPreferenceChange(ScrollOffsetPreferenceKey.self) { value in
                    withAnimation(.easeInOut(duration: 0.2)) {
                        isHeaderCollapsed = value < -20
                    }
                }
            }
        }
        .sheet(isPresented: $showFundbueroSheet) {
                FundbueroView()
            }
            
            // Toast
            if showAnnouncementToast {
                VStack {
                    Spacer()
                    HStack(spacing: 8) {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundColor(.green)
                        Text("Mitteilung ans Team übertragen!")
                            .font(.subheadline)
                            .foregroundColor(.white)
                    }
                    .padding()
                    .background(Color(red: 30/255, green: 30/255, blue: 34/255))
                    .cornerRadius(14)
                    .shadow(radius: 10)
                    .padding(.bottom, 110)
                }
                .transition(.move(edge: .bottom).combined(with: .opacity))
            }
        }
        .task {
            await loadLiveSessions()
        }
    }
    
    @State private var liveHalls: [HallData] = []
    
    private func loadLiveSessions() async {
        let loc = UserDefaults.standard.string(forKey: "selectedLocation") ?? "su"
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        let dateStr = formatter.string(from: Date())
        if let halls = try? await ScraperManager.shared.fetchSessions(location: loc, dateStr: dateStr) {
            self.liveHalls = halls
        }
    }
    
    private func getLiveHallStatus(for hallName: String) -> (badge: String, detail: String, color: Color) {
        let cleanName = hallName.lowercased().replacingOccurrences(of: "kino ", with: "").trimmingCharacters(in: .whitespaces)
        guard let hallData = liveHalls.first(where: {
            let h = $0.name.lowercased().replacingOccurrences(of: "kino ", with: "").trimmingCharacters(in: .whitespaces)
            return h == cleanName || $0.name.lowercased().contains(cleanName)
        }), let sessions = hallData.sessions, !sessions.isEmpty else {
            return ("✨ Bereit", "Aktuell keine Vorstellungen", .gray)
        }
        
        let now = Date()
        let cal = Calendar.current
        
        // 1. Check if admission, film running or cleaning
        for s in sessions {
            let parts = s.time.split(separator: ":")
            guard parts.count == 2, let h = Int(parts[0]), let m = Int(parts[1]) else { continue }
            guard let startTime = cal.date(bySettingHour: h, minute: m, second: 0, of: now) else { continue }
            let duration = s.duration ?? 120
            let endTime = startTime.addingTimeInterval(TimeInterval(duration * 60))
            let admissionStartTime = startTime.addingTimeInterval(-20 * 60) // 20 min before start
            let admissionEndTime = startTime.addingTimeInterval(5 * 60)   // 5 min after start
            
            if now >= admissionStartTime && now < admissionEndTime {
                return ("🎟️ Einlass", "\(s.title) (Start \(s.time))", .orange)
            } else if now >= admissionEndTime && now < endTime {
                let endStr = formatTime(endTime)
                return ("🎬 Läuft", "\(s.title) (bis ~\(endStr))", .green)
            } else if now >= endTime && now < endTime.addingTimeInterval(15 * 60) {
                return ("🧹 Auslass", "\(s.title)", .blue)
            }
        }
        
        // 2. Next upcoming session today
        let upcoming = sessions.compactMap { s -> (Session, Date)? in
            let parts = s.time.split(separator: ":")
            guard parts.count == 2, let h = Int(parts[0]), let m = Int(parts[1]) else { return nil }
            guard let startTime = cal.date(bySettingHour: h, minute: m, second: 0, of: now), startTime > now else { return nil }
            return (s, startTime)
        }.sorted { $0.1 < $1.1 }.first
        
        if let next = upcoming {
            return ("✨ Bereit", "Nächste: \(next.0.title) (\(next.0.time) Uhr)", .gray)
        }
        
        return ("🏁 Beendet", "Keine weiteren Vorstellungen heute", .gray.opacity(0.8))
    }
    
    private func formatTime(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "HH:mm"
        return formatter.string(from: date)
    }
    
    private func toggleShift() {
        let generator = UINotificationFeedbackGenerator()
        if isShiftActive {
            userXP += 50
            isShiftActive = false
            generator.notificationOccurred(.success)
        } else {
            shiftStartTime = Date().timeIntervalSince1970
            isShiftActive = true
            generator.notificationOccurred(.success)
        }
    }
    
    private func formattedStartTime() -> String {
        let date = Date(timeIntervalSince1970: shiftStartTime)
        let formatter = DateFormatter()
        formatter.dateFormat = "HH:mm"
        return formatter.string(from: date)
    }
    
    private func addIncident() {
        guard !incidentText.isEmpty else { return }
        let formatter = DateFormatter()
        formatter.dateFormat = "HH:mm"
        let log = IncidentLog(category: incidentCategory, text: incidentText, time: formatter.string(from: Date()))
        incidentLogs.insert(log, at: 0)
        incidentText = ""
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.success)
    }
    
    private func sendAnnouncement() {
        guard !announcementText.isEmpty else { return }
        let textToSend = announcementText
        let author = authManager.currentUser?.name ?? "TL Schichtleitung"
        let location = UserDefaults.standard.string(forKey: "selectedLocation") ?? "su"
        announcementText = ""
        
        // Post to live backend
        guard let url = URL(string: "https://kinopolis.artjombecker.com/api/messages") else { return }
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body: [String: Any] = [
            "title": selectedDept == "tl" ? "🚨 TL-Anweisung von \(author)" : "Mitteilung von \(author)",
            "content": textToSend,
            "author": author,
            "location": location
        ]
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)
        
        URLSession.shared.dataTask(with: request) { _, _, _ in
            DispatchQueue.main.async {
                withAnimation {
                    self.showAnnouncementToast = true
                }
                let generator = UINotificationFeedbackGenerator()
                generator.notificationOccurred(.success)
                
                DispatchQueue.main.asyncAfter(deadline: .now() + 2.5) {
                    withAnimation {
                        self.showAnnouncementToast = false
                    }
                }
            }
        }.resume()
    }
}

// Models & Components
struct IncidentLog: Identifiable {
    let id = UUID()
    let category: String
    let text: String
    let time: String
}

struct ChecklistItem: Identifiable {
    let id = UUID()
    let title: String
    var isCompleted: Bool
}

struct DeptChip: View {
    let title: String
    let id: String
    @Binding var selectedId: String
    
    var isSelected: Bool { selectedId == id }
    
    var body: some View {
        Button(action: {
            selectedId = id
            let generator = UIImpactFeedbackGenerator(style: .light)
            generator.impactOccurred()
        }) {
            Text(title)
                .font(.subheadline)
                .fontWeight(isSelected ? .bold : .medium)
                .foregroundColor(isSelected ? .white : .gray)
                .padding(.horizontal, 14)
                .padding(.vertical, 8)
                .background(isSelected ? (id == "tl" ? Color.red : Color.red.opacity(0.8)) : Color.white.opacity(0.06))
                .cornerRadius(12)
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(isSelected ? Color.red : Color.white.opacity(0.08), lineWidth: 1)
                )
        }
    }
}
