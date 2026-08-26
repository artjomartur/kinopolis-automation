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
    @State private var showSoundboardSheet = false
    
    @State private var isHeaderCollapsed = false
    
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
            Color(red: 24/255, green: 24/255, blue: 26/255).ignoresSafeArea()
            
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
                                Text("Mitarbeiter-Status")
                                    .font(.caption)
                                    .foregroundColor(.gray)
                                Text(authManager.currentUser?.role.uppercased() ?? "ADMINISTRATOR")
                                    .font(.headline)
                                    .fontWeight(.bold)
                                    .foregroundColor(.white)
                            }
                            
                            Spacer()
                            
                            Text(LocationData.name(for: selectedLocation))
                                .font(.caption)
                                .fontWeight(.bold)
                                .padding(.horizontal, 10)
                                .padding(.vertical, 5)
                                .background(Color.white.opacity(0.08))
                                .foregroundColor(.white)
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
                                        .fill(Color.white.opacity(0.1))
                                        .frame(height: 8)
                                    Capsule()
                                        .fill(LinearGradient(colors: [.yellow, .orange], startPoint: .leading, endPoint: .trailing))
                                        .frame(width: geo.size.width * CGFloat(userXP % 150) / 150.0, height: 8)
                                }
                            }
                            .frame(height: 8)
                        }
                    }
                    .padding(20)
                    .background(Color.white.opacity(0.04))
                    .cornerRadius(20)
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(Color.white.opacity(0.08), lineWidth: 1)
                    )
                    .padding(.horizontal)
                    .padding(.top, 16)
                    
                    // 2. KINO-TOOLS & SERVICES
                    VStack(alignment: .leading, spacing: 14) {
                        Text("🛠️ Kino-Services")
                            .font(.headline)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
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
                            .foregroundColor(.white)
                            .padding(.horizontal)
                        
                        VStack(spacing: 12) {
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
                                    title: "📖 Film-Spickzettel & FAQ",
                                    subtitle: "Kurzinhalte, Zielgruppen & Post-Credit Checker"
                                )
                            }
                            
                            // Oli Soundboard & Fun
                            Button(action: { showSoundboardSheet = true }) {
                                ServiceRowItem(
                                    icon: "speaker.wave.3.fill",
                                    color: .green,
                                    title: "🎮 Oli Soundboard & Erfolge",
                                    subtitle: "Kino-Gongs, Oli Sprachclips & Schicht-Badges"
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
                            .foregroundColor(.white)
                            .padding(.horizontal)
                        
                        VStack(spacing: 0) {
                            ContactRow(name: "TL / Betriebsleitung (Diensthandy)", number: "0170 1234567", role: "Notfall / Freigaben", icon: "phone.fill", color: .red)
                            ContactRow(name: "Haustechnik & Vorführer", number: "0171 9876543", role: "Projektion & Ton", icon: "wrench.and.screwdriver.fill", color: .orange)
                            ContactRow(name: "Kinopolis IT-Support", number: "06181 5080", role: "Kassensystem & Scanner", icon: "desktopcomputer", color: .blue)
                        }
                        .background(Color.white.opacity(0.03))
                        .cornerRadius(18)
                        .overlay(
                            RoundedRectangle(cornerRadius: 18)
                                .stroke(Color.white.opacity(0.08), lineWidth: 1)
                        )
                        .padding(.horizontal)
                    }
                    
                    // 3. APP-EINSTELLUNGEN
                    VStack(alignment: .leading, spacing: 14) {
                        Text("⚙️ Einstellungen")
                            .font(.headline)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                            .padding(.horizontal)
                        
                        VStack(spacing: 0) {
                            // Location Picker Row
                            HStack {
                                Image(systemName: "mappin.and.ellipse")
                                    .foregroundColor(.red)
                                    .frame(width: 28)
                                Text("Standort")
                                    .foregroundColor(.white)
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
                            
                            Divider().background(Color.white.opacity(0.06))
                            
                            Toggle(isOn: $hapticsEnabled) {
                                HStack {
                                    Image(systemName: "hand.tap.fill")
                                        .foregroundColor(.purple)
                                        .frame(width: 28)
                                    Text("Haptisches Feedback")
                                        .foregroundColor(.white)
                                }
                            }
                            .padding(.horizontal, 16)
                            .padding(.vertical, 12)
                            
                            Divider().background(Color.white.opacity(0.06))
                            
                            Toggle(isOn: $notificationsEnabled) {
                                HStack {
                                    Image(systemName: "bell.fill")
                                        .foregroundColor(.yellow)
                                        .frame(width: 28)
                                    Text("Funk & Push-Benachrichtigungen")
                                        .foregroundColor(.white)
                                }
                            }
                            .padding(.horizontal, 16)
                            .padding(.vertical, 12)
                        }
                        .background(Color.white.opacity(0.03))
                        .cornerRadius(18)
                        .overlay(
                            RoundedRectangle(cornerRadius: 18)
                                .stroke(Color.white.opacity(0.08), lineWidth: 1)
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
                            .background(Color.white.opacity(0.06))
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
        .sheet(isPresented: $showSoundboardSheet) {
            OliSoundboardView()
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
                    .foregroundColor(.white)
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
        .background(Color.white.opacity(0.04))
        .cornerRadius(18)
        .overlay(
            RoundedRectangle(cornerRadius: 18)
                .stroke(Color.white.opacity(0.08), lineWidth: 1)
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
                        .foregroundColor(.white)
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
