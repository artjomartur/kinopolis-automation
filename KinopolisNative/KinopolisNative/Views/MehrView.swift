import SwiftUI

struct MehrView: View {
    @EnvironmentObject var authManager: AuthManager
    
    @AppStorage("userXP") private var userXP: Int = 120
    @AppStorage("selectedLocation") private var selectedLocation = "su"
    @AppStorage("hapticsEnabled") private var hapticsEnabled = true
    @AppStorage("notificationsEnabled") private var notificationsEnabled = true
    
    @State private var showResetAlert = false
    @State private var showContactSheet = false
    @State private var showFundbueroSheet = false
    @State private var showPosterSheet = false
    @State private var showGastroSheet = false
    @State private var showDefektSheet = false
    @State private var showSchichtTauschSheet = false
    @State private var showSpickzettelSheet = false
    @State private var showDienstplanSheet = false
    
    @State private var showStatistikenSheet = false
    @State private var showTeamChatSheet = false
    @State private var showFAQSheet = false
    @State private var showMoodTrackerSheet = false
    @State private var showQuizSheet = false
    @State private var showARScanner = false
    @State private var showWalletPassSheet = false
    
    @StateObject private var walletManager = WalletPassManager.shared
    @StateObject private var pedometerManager = PedometerManager()
    
    @State private var isHeaderCollapsed = false
    @State private var animatedXP: Int = 0
    
    var userLevel: Int {
        (userXP / 150) + 1
    }
    
    var levelTitle: String {
        let titles = ["Anfänger", "Fortgeschrittener", "Kino-Profi", "Team-Experte", "Legende", "Kino-Gott"]
        let index = min(titles.count - 1, userLevel - 1)
        return titles[index]
    }
    
    var body: some View {
        ZStack {
            Color(UIColor.systemBackground).ignoresSafeArea()
            
            VStack(spacing: 0) {
                // Fixed Master Header (Collapses on scroll)
                MasterHeaderView(
                    imageName: "Oli_Success_bgless",
                    subtitle: "Konto & Einstellungen",
                    title: authManager.currentUser?.name ?? "Artjom Becker",
                    shortTitle: "Mehr",
                    isCollapsed: isHeaderCollapsed
                )
                
                ScrollView {
                    VStack(spacing: 20) {
                        
                        GeometryReader { proxy in
                            Color.clear.preference(
                                key: ScrollOffsetPreferenceKey.self,
                                value: proxy.frame(in: .named("mehrScroll")).minY
                            )
                        }
                        .frame(height: 0)
                        
                        // 1. PROFIL & LEVEL CARD
                    VStack(spacing: 16) {
                        HStack(spacing: 16) {
                            VStack(alignment: .leading, spacing: 4) {
                                Text("\(pedometerManager.steps) Schritte gelaufen")
                                    .font(.caption)
                                    .foregroundColor(.gray)
                                    .contentTransition(.numericText())
                                    .animation(.snappy, value: pedometerManager.steps)
                                Text(authManager.currentUser?.role.uppercased() ?? "ADMINISTRATOR")
                                    .font(.headline)
                                    .fontWeight(.bold)
                                    .foregroundColor(.primary)
                            }
                            
                            Spacer()
                            
                            Text(LocationData.name(for: selectedLocation))
                                .font(.caption)
                                .fontWeight(.bold)
                                .padding(.horizontal, 10)
                                .padding(.vertical, 5)
                                .background(Color.primary.opacity(0.08))
                                .foregroundColor(.primary)
                                .cornerRadius(8)
                        }
                        
                        // XP Progress Bar
                        VStack(alignment: .leading, spacing: 6) {
                            HStack {
                                Text("Level \(userLevel) • \(levelTitle)")
                                    .font(.caption)
                                    .fontWeight(.bold)
                                    .foregroundColor(.yellow)
                                Spacer()
                                Text("\(userXP % 150) / 150 XP")
                                    .font(.caption)
                                    .foregroundColor(.gray)
                            }
                            
                            GeometryReader { geo in
                                ZStack(alignment: .leading) {
                                    Capsule()
                                        .fill(Color.primary.opacity(0.1))
                                        .frame(height: 8)
                                    Capsule()
                                        .fill(LinearGradient(colors: [.yellow, .orange], startPoint: .leading, endPoint: .trailing))
                                        .frame(width: geo.size.width * CGFloat(animatedXP % 150) / 150.0, height: 8)
                                        .animation(.spring(response: 0.8, dampingFraction: 0.6), value: animatedXP)
                                }
                            }
                            .frame(height: 8)
                        }
                        
                        // AR Mängel-Scanner
                        Button(action: { showARScanner = true }) {
                            HStack {
                                Image(systemName: "viewfinder")
                                    .foregroundColor(.primary)
                                Text("AR Saal-Scanner")
                                    .font(.subheadline)
                                    .fontWeight(.semibold)
                                    .foregroundColor(.primary)
                                Spacer()
                            }
                            .padding()
                            .background(Color.primary.opacity(0.1))
                            .cornerRadius(12)
                        }
                        .fullScreenCover(isPresented: $showARScanner) {
                            MangelARView()
                        }
                        
                        Divider().background(Color.primary.opacity(0.1))
                        
                        // Popcorn-Schritte Zähler
                        HStack {
                            Image(systemName: "figure.walk")
                                .font(.title2)
                                .foregroundColor(.orange)
                            VStack(alignment: .leading) {
                                Text("Popcorn-Schritte (Diese Schicht)")
                                    .font(.subheadline)
                                    .fontWeight(.semibold)
                                    .foregroundColor(.primary)
                                Text("\(pedometerManager.steps) Schritte gelaufen")
                                    .font(.caption)
                                    .foregroundColor(.gray)
                                    .contentTransition(.numericText())
                                    .animation(.snappy, value: pedometerManager.steps)
                            }
                            Spacer()
                            Button(pedometerManager.isTracking ? "Stopp" : "Start") {
                                if pedometerManager.isTracking {
                                    pedometerManager.stopTracking()
                                } else {
                                    pedometerManager.startTracking()
                                }
                            }
                            .font(.caption)
                            .buttonStyle(.bordered)
                            .tint(pedometerManager.isTracking ? .red : .green)
                        }
                        .padding()
                        .background(Color.primary.opacity(0.1))
                        .cornerRadius(12)
                        
                        Divider().background(Color.primary.opacity(0.1))
                        
                        // Daily Quests
                        VStack(alignment: .leading, spacing: 12) {
                            HStack {
                                Image(systemName: "target")
                                    .foregroundColor(.red)
                                Text("Daily Quests")
                                    .font(.headline)
                                    .fontWeight(.bold)
                                    .foregroundColor(.primary)
                            }
                            
                            VStack(spacing: 8) {
                                QuestRow(title: "Checkliste 100% abschließen", xp: 50, progress: 0, total: 1)
                                QuestRow(title: "5000 Schritte gehen", xp: 30, progress: pedometerManager.steps, total: 5000)
                                QuestRow(title: "3 Vorfälle melden", xp: 20, progress: 1, total: 3)
                            }
                        }
                        .padding()
                        .background(Color.primary.opacity(0.04))
                        .cornerRadius(12)
                        
                        Divider().background(Color.primary.opacity(0.1))
                        
                        // Achievements
                        VStack(alignment: .leading, spacing: 12) {
                            HStack {
                                Image(systemName: "medal.fill")
                                    .foregroundColor(.yellow)
                                Text("Erfolge")
                                    .font(.headline)
                                    .fontWeight(.bold)
                                    .foregroundColor(.primary)
                            }
                            
                            ScrollView(.horizontal, showsIndicators: false) {
                                HStack(spacing: 12) {
                                    GamificationBadge(title: "Kino-Gott", icon: "crown.fill", color: .yellow, isUnlocked: userXP >= 750)
                                    GamificationBadge(title: "Marathon", icon: "figure.walk", color: .orange, isUnlocked: pedometerManager.steps >= 10000)
                                    GamificationBadge(title: "Nachteule", icon: "moon.fill", color: .purple, isUnlocked: true)
                                    GamificationBadge(title: "Theken-Meister", icon: "box.truck.fill", color: .green, isUnlocked: false)
                                }
                            }
                        }
                        .padding()
                        .background(Color.primary.opacity(0.04))
                        .cornerRadius(12)
                        
                        Divider().background(Color.primary.opacity(0.1))
                        
                        // Wallet Button
                        Button(action: {
                            showWalletPassSheet = true
                        }) {
                            HStack {
                                Image(systemName: "wallet.pass.fill")
                                    .foregroundColor(.primary)
                                Text("Ausweis zu Apple Wallet hinzufügen")
                                    .font(.subheadline)
                                    .fontWeight(.semibold)
                                    .foregroundColor(.primary)
                                Spacer()
                            }
                            .padding()
                            .background(Color.primary.opacity(0.1))
                            .cornerRadius(12)
                        }
                        .sheet(isPresented: $showWalletPassSheet) {
                            WalletPassView()
                        }
                    }
                    .padding(20)
                    .background(Color.primary.opacity(0.04))
                    .cornerRadius(20)
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(Color.primary.opacity(0.08), lineWidth: 1)
                    )
                    .padding(.horizontal)
                    .padding(.top, 16)
                    
                    // NEW: STATISTIKEN & STIMMUNG
                    VStack(alignment: .leading, spacing: 14) {
                        Text("📊 Gamification & Feedback")
                            .font(.headline)
                            .fontWeight(.bold)
                            .foregroundColor(.primary)
                            .padding(.horizontal)
                        
                        VStack(spacing: 12) {
                            Button(action: { showQuizSheet = true }) {
                                ServiceRowItem(
                                    icon: "gamecontroller.fill",
                                    color: .orange,
                                    title: "Kino-Wissens-Quiz",
                                    subtitle: "Teste dein Filmwissen und sammle XP!"
                                )
                            }
                            
                            Button(action: { showStatistikenSheet = true }) {
                                ServiceRowItem(
                                    icon: "chart.bar.xaxis",
                                    color: .indigo,
                                    title: "Saal-Heatmap & Statistiken",
                                    subtitle: "Auslastungstrends und Stimmungs-Verlauf"
                                )
                            }
                            
                            Button(action: { showMoodTrackerSheet = true }) {
                                ServiceRowItem(
                                    icon: "face.smiling.inverse",
                                    color: .pink,
                                    title: "Schicht-Feedback (Stimmungs-Tracker)",
                                    subtitle: "Wie war deine Schicht heute?"
                                )
                            }
                        }
                        .padding(.horizontal)
                    }
                    
                    // 2. KINO-TOOLS & SERVICES
                    VStack(alignment: .leading, spacing: 14) {
                        Text("🛠️ Kino-Services")
                            .font(.headline)
                            .fontWeight(.bold)
                            .foregroundColor(.primary)
                            .padding(.horizontal)
                        
                        VStack(spacing: 12) {
                            // Gastro & Popcorn Rechner
                            Button(action: { showGastroSheet = true }) {
                                ServiceRowItem(
                                    icon: "popcorn.fill",
                                    color: .yellow,
                                    title: "🍿 Popcorn & Gastro-Bedarfsrechner",
                                    subtitle: "Live-Kesselberechnung, Nachos & FIFO-MHD Lager"
                                )
                            }
                            
                            // Saal-Mängel & Defektmelder
                            Button(action: { showDefektSheet = true }) {
                                ServiceRowItem(
                                    icon: "wrench.and.screwdriver.fill",
                                    color: .red,
                                    title: "🔧 Saal- & Mängelmelder",
                                    subtitle: "Sitze, Ton, Bild & Klima-Defekte mit Foto melden"
                                )
                            }
                            
                            // Digitales Fundbüro
                            Button(action: { showFundbueroSheet = true }) {
                                ServiceRowItem(
                                    icon: "bag.fill",
                                    color: .orange,
                                    title: "🎒 Digitales Fundbüro",
                                    subtitle: "Fundsachen erfassen, suchen & aushändigen"
                                )
                            }
                            
                            // Poster-Erinnerung & Plakatwechsel
                            Button(action: { showPosterSheet = true }) {
                                ServiceRowItem(
                                    icon: "photo.stack.fill",
                                    color: .cyan,
                                    title: "🖼️ Plakatwechsel & Poster-Erinnerung",
                                    subtitle: "Live-Plakattausch an Sälen & Poster für Mitarbeiter"
                                )
                            }
                        }
                        .padding(.horizontal)
                    }
                    
                    // 3. TEAM & GÄSTE-SUPPORT
                    VStack(alignment: .leading, spacing: 14) {
                        Text("👥 Team & Gäste-Support")
                            .font(.headline)
                            .fontWeight(.bold)
                            .foregroundColor(.primary)
                            .padding(.horizontal)
                        
                        VStack(spacing: 12) {
                            // Mein Dienstplan & Kalender
                            Button(action: { showDienstplanSheet = true }) {
                                ServiceRowItem(
                                    icon: "calendar.badge.clock",
                                    color: .yellow,
                                    title: "📅 Mein Dienstplan & Kalender",
                                    subtitle: "Schichten erfassen, Wochenstunden & Apple Kalender Sync"
                                )
                            }
                            
                            // Schicht-Tauschbörse
                            Button(action: { showSchichtTauschSheet = true }) {
                                ServiceRowItem(
                                    icon: "arrow.triangle.2.circlepath.circle.fill",
                                    color: .purple,
                                    title: "🔄 Schicht-Tauschbörse",
                                    subtitle: "Schichten anbieten, übernehmen & TL-Freigaben"
                                )
                            }
                            
                            // Film-Spickzettel & Post-Credit Info
                            Button(action: { showSpickzettelSheet = true }) {
                                ServiceRowItem(
                                    icon: "book.pages.fill",
                                    color: .blue,
                                    title: "📖 Film-Spickzettel & Post-Credit",
                                    subtitle: "Kurzinhalte, Zielgruppen & Trailer-Preview"
                                )
                            }
                            
                            // Gäste FAQ
                            Button(action: { showFAQSheet = true }) {
                                ServiceRowItem(
                                    icon: "questionmark.bubble.fill",
                                    color: .cyan,
                                    title: "❓ Gäste-FAQ Bot",
                                    subtitle: "Häufige Gästefragen schnell beantwortet (Preise, FSK)"
                                )
                            }
                            
                            // Team Quick-Chat
                            Button(action: { showTeamChatSheet = true }) {
                                ServiceRowItem(
                                    icon: "paperplane.fill",
                                    color: .mint,
                                    title: "💬 Team Quick-Chat",
                                    subtitle: "Schnelle Push-Nachrichten ans Dienstteam senden"
                                )
                            }
                        }
                        .padding(.horizontal)
                    }
                    
                    // 3. WICHTIGE KONTAKTE (DIREKTANRUF)
                    VStack(alignment: .leading, spacing: 14) {
                        Text("📞 Team & Notfall-Kontakte")
                            .font(.headline)
                            .fontWeight(.bold)
                            .foregroundColor(.primary)
                            .padding(.horizontal)
                        
                        VStack(spacing: 0) {
                            ContactRow(name: "TL / Betriebsleitung (Diensthandy)", number: "0170 1234567", role: "Notfall / Freigaben", icon: "phone.fill", color: .red)
                            ContactRow(name: "Haustechnik & Vorführer", number: "0171 9876543", role: "Projektion & Ton", icon: "wrench.and.screwdriver.fill", color: .orange)
                            ContactRow(name: "Kinopolis IT-Support", number: "06181 5080", role: "Kassensystem & Scanner", icon: "desktopcomputer", color: .blue)
                        }
                        .background(Color.primary.opacity(0.03))
                        .cornerRadius(18)
                        .overlay(
                            RoundedRectangle(cornerRadius: 18)
                                .stroke(Color.primary.opacity(0.08), lineWidth: 1)
                        )
                        .padding(.horizontal)
                    }
                    
                    // 3. APP-EINSTELLUNGEN
                    VStack(alignment: .leading, spacing: 14) {
                        Text("⚙️ Einstellungen")
                            .font(.headline)
                            .fontWeight(.bold)
                            .foregroundColor(.primary)
                            .padding(.horizontal)
                        
                        VStack(spacing: 0) {
                            // Location Picker Row
                            HStack {
                                Image(systemName: "mappin.and.ellipse")
                                    .foregroundColor(.red)
                                    .frame(width: 28)
                                Text("Standort")
                                    .foregroundColor(.primary)
                                Spacer()
                                Picker("Standort", selection: $selectedLocation) {
                                    ForEach(LocationData.all) { loc in
                                        Text(loc.name).tag(loc.slug)
                                    }
                                }
                                .pickerStyle(MenuPickerStyle())
                                .tint(.white)
                                .onChange(of: selectedLocation) { _, newLoc in
                                    NotificationCenter.default.post(name: NSNotification.Name("LocationChanged"), object: nil)
                                    let generator = UIImpactFeedbackGenerator(style: .medium)
                                    generator.impactOccurred()
                                }
                            }
                            .padding(.horizontal, 16)
                            .padding(.vertical, 12)
                            
                            Divider().background(Color.primary.opacity(0.06))
                            
                            Toggle(isOn: $hapticsEnabled) {
                                HStack {
                                    Image(systemName: "hand.tap.fill")
                                        .foregroundColor(.purple)
                                        .frame(width: 28)
                                    Text("Haptisches Feedback")
                                        .foregroundColor(.primary)
                                }
                            }
                            .padding(.horizontal, 16)
                            .padding(.vertical, 12)
                            
                            Divider().background(Color.primary.opacity(0.06))
                            
                            Toggle(isOn: $notificationsEnabled) {
                                HStack {
                                    Image(systemName: "bell.fill")
                                        .foregroundColor(.yellow)
                                        .frame(width: 28)
                                    Text("Funk & Push-Benachrichtigungen")
                                        .foregroundColor(.primary)
                                }
                            }
                            .padding(.horizontal, 16)
                            .padding(.vertical, 12)
                        }
                        .background(Color.primary.opacity(0.03))
                        .cornerRadius(18)
                        .overlay(
                            RoundedRectangle(cornerRadius: 18)
                                .stroke(Color.primary.opacity(0.08), lineWidth: 1)
                        )
                        .padding(.horizontal)
                    }
                    
                    // 5. CACHE LEEREN & LOGOUT
                    VStack(spacing: 12) {
                        Button(action: {
                            showResetAlert = true
                        }) {
                            HStack {
                                Image(systemName: "arrow.triangle.2.circlepath")
                                Text("App-Cache leeren & Daten neu laden")
                                    .font(.subheadline)
                                    .fontWeight(.medium)
                            }
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 12)
                            .background(Color.primary.opacity(0.06))
                            .foregroundColor(.gray)
                            .cornerRadius(14)
                        }
                        
                        Button(action: {
                            authManager.logout()
                        }) {
                            HStack {
                                Image(systemName: "rectangle.portrait.and.arrow.right")
                                Text("Abmelden")
                                    .fontWeight(.bold)
                            }
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 14)
                            .background(Color.red.opacity(0.15))
                            .foregroundColor(.red)
                            .cornerRadius(14)
                            .overlay(
                                RoundedRectangle(cornerRadius: 14)
                                    .stroke(Color.red.opacity(0.3), lineWidth: 1)
                            )
                        }
                    }
                    .padding(.horizontal)
                    .alert(isPresented: $showResetAlert) {
                        Alert(
                            title: Text("Cache geleert"),
                            message: Text("Alle Vorstellungsdaten und Caches wurden aktualisiert."),
                            dismissButton: .default(Text("OK"))
                        )
                    }
                    
                    // Version Footer with Oli
                    VStack(spacing: 4) {
                        Text("Kinopolis Native iOS • Version 1.0 (Build 42)")
                            .font(.caption2)
                            .foregroundColor(.gray.opacity(0.5))
                        Text("Entwickelt für das Kinopolis Team 🍿")
                            .font(.caption2)
                            .foregroundColor(.gray.opacity(0.3))
                    }
                    .padding(.top, 8)
                }
                .buttonStyle(BouncyButtonStyle())
                .coordinateSpace(name: "mehrScroll")
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
        .sheet(isPresented: $showPosterSheet) {
            PosterErinnerungView()
        }
        .sheet(isPresented: $showGastroSheet) {
            GastroRechnerView()
        }
        .sheet(isPresented: $showDefektSheet) {
            SaalDefektView()
        }
        .sheet(isPresented: $showSchichtTauschSheet) {
            SchichtTauschView()
        }
        .sheet(isPresented: $showSpickzettelSheet) {
            FilmSpickzettelSheet()
        }
        .sheet(isPresented: $showDienstplanSheet) {
            DienstplanView()
        }
        .sheet(isPresented: $showStatistikenSheet) {
            StatistikenView()
        }
        .sheet(isPresented: $showTeamChatSheet) {
            TeamChatView()
        }
        .sheet(isPresented: $showFAQSheet) {
            FAQView()
        }
        .sheet(isPresented: $showMoodTrackerSheet) {
            MoodTrackerView()
        }
        .sheet(isPresented: $showQuizSheet) {
            QuizView()
        }
        .onChange(of: authManager.currentUser) { _, user in
            if user == nil {
                isHeaderCollapsed = false
            }
        }
        .onAppear {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                animatedXP = userXP
            }
        }
    }
}
}

// MARK: - Reusable Service Row Item
struct ServiceRowItem: View {
    let icon: String
    let color: Color
    let title: String
    let subtitle: String
    
    var body: some View {
        HStack(spacing: 14) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundColor(color)
                .frame(width: 32)
            
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.subheadline)
                    .fontWeight(.bold)
                    .foregroundColor(.primary)
                Text(subtitle)
                    .font(.caption)
                    .foregroundColor(.gray)
                    .lineLimit(1)
            }
            
            Spacer()
            
            Image(systemName: "chevron.right")
                .font(.caption)
                .foregroundColor(.gray)
        }
        .padding(16)
        .background(Color.primary.opacity(0.04))
        .cornerRadius(18)
        .overlay(
            RoundedRectangle(cornerRadius: 18)
                .stroke(Color.primary.opacity(0.08), lineWidth: 1)
        )
    }
}

// Models & Supporting Views
struct ContactRow: View {
    let name: String
    let number: String
    let role: String
    let icon: String
    let color: Color
    
    var body: some View {
        Button(action: {
            if let url = URL(string: "tel://\(number.replacingOccurrences(of: " ", with: ""))") {
                UIApplication.shared.open(url)
            }
        }) {
            HStack(spacing: 14) {
                Image(systemName: icon)
                    .font(.body)
                    .foregroundColor(color)
                    .frame(width: 32, height: 32)
                    .background(color.opacity(0.15))
                    .cornerRadius(8)
                
                VStack(alignment: .leading, spacing: 2) {
                    Text(name)
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .foregroundColor(.primary)
                    Text("\(role) • \(number)")
                        .font(.caption)
                        .foregroundColor(.gray)
                }
                
                Spacer()
                
                Image(systemName: "phone.circle.fill")
                    .font(.title3)
                    .foregroundColor(.green)
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Bouncy Button Style
struct BouncyButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.96 : 1.0)
            .animation(.spring(response: 0.3, dampingFraction: 0.6, blendDuration: 0), value: configuration.isPressed)
    }
}

// MARK: - Gamification Components
struct QuestRow: View {
    let title: String
    let xp: Int
    let progress: Int
    let total: Int
    
    var isCompleted: Bool { progress >= total }
    
    var body: some View {
        HStack {
            Image(systemName: isCompleted ? "checkmark.circle.fill" : "circle")
                .foregroundColor(isCompleted ? .green : .gray)
                .font(.title3)
            
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.subheadline)
                    .foregroundColor(isCompleted ? .gray : .white)
                    .strikethrough(isCompleted)
                
                // Progress Bar
                GeometryReader { geo in
                    ZStack(alignment: .leading) {
                        Capsule().fill(Color.primary.opacity(0.1))
                        Capsule().fill(isCompleted ? Color.green : Color.blue)
                            .frame(width: max(0, min(geo.size.width, geo.size.width * CGFloat(progress) / CGFloat(max(total, 1)))))
                    }
                }
                .frame(height: 4)
            }
            
            Spacer()
            
            Text("+\(xp) XP")
                .font(.caption2)
                .fontWeight(.bold)
                .padding(.horizontal, 6)
                .padding(.vertical, 3)
                .background(isCompleted ? Color.green.opacity(0.2) : Color.yellow.opacity(0.2))
                .foregroundColor(isCompleted ? .green : .yellow)
                .cornerRadius(6)
        }
    }
}

struct GamificationBadge: View {
    let title: String
    let icon: String
    let color: Color
    let isUnlocked: Bool
    
    var body: some View {
        VStack(spacing: 8) {
            ZStack {
                Circle()
                    .fill(isUnlocked ? color.opacity(0.2) : Color.gray.opacity(0.1))
                    .frame(width: 50, height: 50)
                
                Image(systemName: isUnlocked ? icon : "lock.fill")
                    .font(.title2)
                    .foregroundColor(isUnlocked ? color : .gray)
            }
            
            Text(title)
                .font(.caption2)
                .fontWeight(.semibold)
                .foregroundColor(isUnlocked ? .white : .gray)
        }
        .frame(width: 70)
        .opacity(isUnlocked ? 1.0 : 0.6)
    }
}
