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
            
            ScrollView {
                VStack(spacing: 24) {
                    
                    // 1. PROFIL & LEVEL CARD
                    VStack(spacing: 16) {
                        HStack(spacing: 16) {
                            Image("Oli_Security_bgless")
                                .resizable()
                                .scaledToFit()
                                .frame(width: 90, height: 90)
                                .background(Color.white.opacity(0.06))
                                .clipShape(Circle())
                                .overlay(Circle().stroke(Color.red.opacity(0.4), lineWidth: 2.5))
                            
                            VStack(alignment: .leading, spacing: 4) {
                                Text(authManager.currentUser?.name ?? "Artjom Becker")
                                    .font(.title3)
                                    .fontWeight(.bold)
                                    .foregroundColor(.white)
                                
                                HStack(spacing: 8) {
                                    Text(authManager.currentUser?.role.uppercased() ?? "ADMIN")
                                        .font(.system(size: 10, weight: .heavy))
                                        .foregroundColor(.red)
                                        .padding(.horizontal, 8)
                                        .padding(.vertical, 3)
                                        .background(Color.red.opacity(0.15))
                                        .cornerRadius(6)
                                                                        Text("STANDORT: \(selectedLocation.uppercased())")
                                        .font(.system(size: 10, weight: .bold))
                                        .foregroundColor(.gray)
                                }
                            }
                            
                            Spacer()
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
                        
                        Button(action: { showFundbueroSheet = true }) {
                            HStack(spacing: 14) {
                                Image(systemName: "bag.fill")
                                    .font(.title3)
                                    .foregroundColor(.orange)
                                    .frame(width: 32)
                                
                                VStack(alignment: .leading, spacing: 2) {
                                    Text("🎒 Digitales Fundbüro")
                                        .font(.subheadline)
                                        .fontWeight(.bold)
                                        .foregroundColor(.white)
                                    Text("Fundsachen erfassen, suchen & aushändigen")
                                        .font(.caption)
                                        .foregroundColor(.gray)
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
                                .onChange(of: selectedLocation) { newLoc in
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
            }
            .sheet(isPresented: $showFundbueroSheet) {
                FundbueroView()
            }
        }
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
