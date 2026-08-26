import SwiftUI
import AVFoundation
import AudioToolbox

struct MockTicket: Identifiable {
    let id = UUID()
    let isValid: Bool
    let reason: String?
    let peopleCount: Int
    let movieTitle: String
    let time: String
    let fsk: String
    let hall: String
}

// MARK: - Audio Feedback Helper
struct ScannerSoundHelper {
    static func play(isValid: Bool) {
        if isValid {
            // Crisp positive chime (Payment/Check tone)
            AudioServicesPlaySystemSound(1054)
        } else {
            // Negative alert buzz / rejection tone
            AudioServicesPlaySystemSound(1053)
        }
    }
}

struct ScannerView: View {
    @State private var scannedTicket: MockTicket? = nil
    @State private var showResult = false
    @State private var isScanning = true
    @State private var showAgeCalculator = false
    @AppStorage("selectedLocation") private var selectedLocation = "su"
    
    var body: some View {
        ZStack {
            Color.black.ignoresSafeArea()
            
            VStack(spacing: 0) {
                // Fixed Master Header
                MasterHeaderView(
                    imageName: "Oli_Security_bgless",
                    subtitle: "Kartenkontrolle",
                    title: "Einlass-Scanner",
                    shortTitle: "Scanner"
                ) {
                    Button(action: {
                        showAgeCalculator = true
                        let generator = UIImpactFeedbackGenerator(style: .medium)
                        generator.impactOccurred()
                    }) {
                        HStack(spacing: 5) {
                            Image(systemName: "calendar.badge.clock")
                                .font(.body)
                                .fontWeight(.bold)
                            Text("Rechner")
                                .font(.caption)
                                .fontWeight(.bold)
                        }
                        .foregroundColor(.white)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 6)
                        .background(Color.red.opacity(0.8))
                        .cornerRadius(10)
                        .shadow(color: Color.red.opacity(0.4), radius: 6, x: 0, y: 2)
                    }
                }
                .background(Color(red: 24/255, green: 24/255, blue: 26/255))
                
                // Camera View
                if isScanning {
                    ZStack(alignment: .bottom) {
                        QRScannerView { code in
                            handleScan(code: code)
                        }
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .overlay(
                            // Scanner Overlay Guide
                            RoundedRectangle(cornerRadius: 24)
                                .stroke(Color.red.opacity(0.8), lineWidth: 3)
                                .frame(width: 250, height: 250)
                        )
                        
                        // Floating Bottom Panel (JuSchG & Test Buttons)
                        VStack(spacing: 8) {
                            
                            // Test Scan Buttons Row
                            HStack(spacing: 10) {
                                Button(action: {
                                    triggerTestScan(forceValid: true)
                                }) {
                                    HStack(spacing: 6) {
                                        Image(systemName: "checkmark.circle.fill")
                                            .foregroundColor(.green)
                                        Text("Test: Gültig")
                                            .font(.caption)
                                            .fontWeight(.bold)
                                    }
                                    .foregroundColor(.white)
                                    .padding(.horizontal, 12)
                                    .padding(.vertical, 8)
                                    .background(Color(red: 28/255, green: 28/255, blue: 30/255).opacity(0.95))
                                    .cornerRadius(12)
                                    .overlay(
                                        RoundedRectangle(cornerRadius: 12)
                                            .stroke(Color.green.opacity(0.4), lineWidth: 1)
                                    )
                                }
                                
                                Button(action: {
                                    triggerTestScan(forceValid: false)
                                }) {
                                    HStack(spacing: 6) {
                                        Image(systemName: "xmark.circle.fill")
                                            .foregroundColor(.red)
                                        Text("Test: Ungültig")
                                            .font(.caption)
                                            .fontWeight(.bold)
                                    }
                                    .foregroundColor(.white)
                                    .padding(.horizontal, 12)
                                    .padding(.vertical, 8)
                                    .background(Color(red: 28/255, green: 28/255, blue: 30/255).opacity(0.95))
                                    .cornerRadius(12)
                                    .overlay(
                                        RoundedRectangle(cornerRadius: 12)
                                            .stroke(Color.red.opacity(0.4), lineWidth: 1)
                                    )
                                }
                            }
                            
                            // JuSchG & Ausweis Calculator Button
                            Button(action: {
                                showAgeCalculator = true
                                let generator = UIImpactFeedbackGenerator(style: .medium)
                                generator.impactOccurred()
                            }) {
                                HStack(spacing: 12) {
                                    Image(systemName: "person.text.rectangle.fill")
                                        .font(.title3)
                                        .foregroundColor(.red)
                                    
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text("JuSchG & FSK-Stichtage")
                                            .font(.subheadline)
                                            .fontWeight(.bold)
                                            .foregroundColor(.white)
                                        Text("Geburtstags- & Ausweis-Prüfung")
                                            .font(.caption2)
                                            .foregroundColor(.gray)
                                    }
                                    
                                    Spacer()
                                    
                                    Image(systemName: "chevron.right")
                                        .font(.caption)
                                        .fontWeight(.bold)
                                        .foregroundColor(.gray)
                                }
                                .padding(.horizontal, 16)
                                .padding(.vertical, 12)
                                .background(Color(red: 30/255, green: 30/255, blue: 34/255).opacity(0.95))
                                .cornerRadius(16)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 16)
                                        .stroke(Color.white.opacity(0.12), lineWidth: 1)
                                )
                                .shadow(color: Color.black.opacity(0.5), radius: 10, x: 0, y: 5)
                            }
                        }
                        .padding(.horizontal, 20)
                        .padding(.bottom, 95) // Above TabBar
                    }
                } else {
                    Color.black.frame(maxWidth: .infinity, maxHeight: .infinity)
                }
            }
        }
        .sheet(item: $scannedTicket, onDismiss: {
            isScanning = true
        }) { ticket in
            TicketResultView(ticket: ticket)
                .presentationDetents([.fraction(0.82), .large])
                .presentationDragIndicator(.visible)
        }
        .sheet(isPresented: $showAgeCalculator) {
            GeburtstagsRechnerSheet()
                .presentationDetents([.fraction(0.88), .large])
                .presentationDragIndicator(.visible)
        }
    }
    
    private func triggerTestScan(forceValid: Bool) {
        isScanning = false
        
        let movies = ["Deadpool & Wolverine", "Ich - Einfach unverbesserlich 4", "Alles steht Kopf 2", "Alien: Romulus"]
        let times = ["20:15", "17:30", "19:00", "22:45"]
        let fsks = ["FSK 16", "FSK 0", "FSK 6", "FSK 16"]
        let halls = getHallsList()
        let randomIndex = Int.random(in: 0..<movies.count)
        let randomHall = halls.randomElement() ?? "Kino 1"
        
        let ticket = MockTicket(
            isValid: forceValid,
            reason: forceValid ? nil : "Ticket bereits gescannt oder ungültig für diese Vorstellung.",
            peopleCount: forceValid ? Int.random(in: 1...4) : 1,
            movieTitle: movies[randomIndex],
            time: times[randomIndex],
            fsk: fsks[randomIndex],
            hall: randomHall
        )
        
        // Sound & Haptic Feedback
        ScannerSoundHelper.play(isValid: forceValid)
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(forceValid ? .success : .error)
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) {
            self.scannedTicket = ticket
            self.showResult = true
        }
    }
    
    private func handleScan(code: String) {
        // Pause scanning
        isScanning = false
        
        // Generate Mock Data
        let randomValid = Bool.random()
        let movies = ["Deadpool & Wolverine", "Ich - Einfach unverbesserlich 4", "Alles steht Kopf 2", "Alien: Romulus"]
        let times = ["20:15", "17:30", "19:00", "22:45"]
        let fsks = ["FSK 16", "FSK 0", "FSK 6", "FSK 16"]
        let halls = getHallsList()
        
        let randomIndex = Int.random(in: 0..<movies.count)
        let randomHall = halls.randomElement() ?? "Kino 1"
        
        let ticket = MockTicket(
            isValid: randomValid,
            reason: randomValid ? nil : "Ticket bereits gescannt oder ungültig für diese Vorstellung.",
            peopleCount: Int.random(in: 1...5),
            movieTitle: movies[randomIndex],
            time: times[randomIndex],
            fsk: fsks[randomIndex],
            hall: randomHall
        )
        
        // Sound & Haptic Feedback
        ScannerSoundHelper.play(isValid: randomValid)
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(randomValid ? .success : .error)
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
            self.scannedTicket = ticket
            self.showResult = true
        }
    }
    
    private func getHallsList() -> [String] {
        let location = UserDefaults.standard.string(forKey: "selectedLocation") ?? "su"
        if location == "kp" {
            return ["Kino 1", "Kino 2", "Kino 3", "Kino 4", "Kino 5", "Kino 6", "Kino 7", "Kino 8"]
        } else if location == "cd" {
            return ["Helia 1", "Helia 2", "Helia 3", "Helia 5", "Helia 7", "Festival", "Broadway", "Pali"]
        } else if location == "rx" {
            return ["Rex 1", "Rex 2", "Rex 3"]
        }
        return ["OnyxLED", "Kino 1", "Kino 2", "Kino 3", "Kino 4", "Kino 5", "Kino 6", "Kino 7", "Kino 8", "Kino 9"]
    }
}

struct TicketResultView: View {
    let ticket: MockTicket
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        ZStack {
            Color(red: 20/255, green: 20/255, blue: 22/255).ignoresSafeArea()
            
            ScrollView {
                VStack(spacing: 20) {
                    // Header Oli + Status
                    VStack(spacing: 12) {
                        Image(ticket.isValid ? "Oli_Success_bgless" : "Oli_Error_bgless")
                            .resizable()
                            .scaledToFit()
                            .frame(height: 120)
                            .shadow(color: (ticket.isValid ? Color.green : Color.red).opacity(0.3), radius: 15, x: 0, y: 5)
                            .padding(.top, 10)
                        
                        Text(ticket.isValid ? "EINLASS GESTATTET" : "EINLASS VERWEIGERT")
                            .font(.system(size: 24, weight: .heavy, design: .rounded))
                            .foregroundColor(ticket.isValid ? .green : .red)
                            .tracking(1)
                        
                        if let reason = ticket.reason {
                            Text(reason)
                                .font(.footnote)
                                .foregroundColor(.red.opacity(0.9))
                                .multilineTextAlignment(.center)
                                .padding(.horizontal, 24)
                        }
                    }
                    
                    // PROMINENTE PERSONEN-ANZAHL
                    HStack(spacing: 14) {
                        Image(systemName: ticket.peopleCount == 1 ? "person.fill" : "person.2.fill")
                            .font(.system(size: 32))
                            .foregroundColor(ticket.isValid ? .green : .red)
                        
                        VStack(alignment: .leading, spacing: 2) {
                            Text("PERSONEN")
                                .font(.system(size: 11, weight: .bold))
                                .foregroundColor(.gray)
                                .tracking(1)
                            
                            Text("\(ticket.peopleCount) \(ticket.peopleCount == 1 ? "Person" : "Personen")")
                                .font(.system(size: 32, weight: .black, design: .rounded))
                                .foregroundColor(.white)
                        }
                        
                        Spacer()
                        
                        Text("TICKET")
                            .font(.system(size: 12, weight: .bold))
                            .padding(.horizontal, 10)
                            .padding(.vertical, 5)
                            .background(Color.white.opacity(0.1))
                            .cornerRadius(8)
                            .foregroundColor(.white.opacity(0.8))
                    }
                    .padding(.horizontal, 20)
                    .padding(.vertical, 16)
                    .background(
                        RoundedRectangle(cornerRadius: 18)
                            .fill((ticket.isValid ? Color.green : Color.red).opacity(0.12))
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 18)
                            .stroke((ticket.isValid ? Color.green : Color.red).opacity(0.4), lineWidth: 1.5)
                    )
                    .padding(.horizontal)
                    
                    // Detail-Box
                    VStack(spacing: 14) {
                        HStack {
                            Text("Film")
                                .foregroundColor(.gray)
                                .font(.subheadline)
                            Spacer()
                            Text(ticket.movieTitle)
                                .font(.headline)
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                                .multilineTextAlignment(.trailing)
                        }
                        
                        Divider().background(Color.white.opacity(0.1))
                        
                        HStack {
                            Text("Saal")
                                .foregroundColor(.gray)
                                .font(.subheadline)
                            Spacer()
                            Text(ticket.hall)
                                .font(.headline)
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                        }
                        
                        Divider().background(Color.white.opacity(0.1))
                        
                        HStack {
                            Text("Uhrzeit")
                                .foregroundColor(.gray)
                                .font(.subheadline)
                            Spacer()
                            Text(ticket.time)
                                .font(.headline)
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                        }
                        
                        Divider().background(Color.white.opacity(0.1))
                        
                        HStack {
                            Text("Altersfreigabe")
                                .foregroundColor(.gray)
                                .font(.subheadline)
                            Spacer()
                            Text(ticket.fsk)
                                .font(.subheadline)
                                .fontWeight(.heavy)
                                .padding(.horizontal, 10)
                                .padding(.vertical, 4)
                                .background(ticket.fsk == "FSK 16" || ticket.fsk == "FSK 18" ? Color.red.opacity(0.2) : Color.blue.opacity(0.2))
                                .foregroundColor(ticket.fsk == "FSK 16" || ticket.fsk == "FSK 18" ? .red : .blue)
                                .cornerRadius(8)
                        }
                    }
                    .padding(18)
                    .background(Color.white.opacity(0.04))
                    .cornerRadius(18)
                    .overlay(
                        RoundedRectangle(cornerRadius: 18)
                            .stroke(Color.white.opacity(0.08), lineWidth: 1)
                    )
                    .padding(.horizontal)
                    
                    // Scan Next Button
                    Button(action: {
                        dismiss()
                    }) {
                        HStack(spacing: 8) {
                            Image(systemName: "qrcode.viewfinder")
                                .font(.title3)
                            Text("Nächsten scannen")
                                .font(.headline)
                                .fontWeight(.bold)
                        }
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 16)
                        .background(
                            LinearGradient(
                                colors: ticket.isValid ? [Color.green, Color(red: 34/255, green: 160/255, blue: 85/255)] : [Color.red, Color(red: 180/255, green: 20/255, blue: 30/255)],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .foregroundColor(.white)
                        .cornerRadius(16)
                        .shadow(color: (ticket.isValid ? Color.green : Color.red).opacity(0.4), radius: 10, x: 0, y: 4)
                        .padding(.horizontal)
                        .padding(.top, 6)
                        .padding(.bottom, 24)
                    }
                }
                .padding(.top, 10)
            }
        }
    }
}

// MARK: - JuSchG & FSK Alters- / Geburtstagsrechner
struct GeburtstagsRechnerSheet: View {
    @Environment(\.dismiss) private var dismiss
    @State private var birthDate: Date = Calendar.current.date(byAdding: .year, value: -16, to: Date()) ?? Date()
    
    private var today: Date { Date() }
    private var cal: Calendar { Calendar.current }
    
    private func cutoffDate(yearsAgo: Int) -> String {
        guard let d = cal.date(byAdding: .year, value: -yearsAgo, to: today) else { return "" }
        let formatter = DateFormatter()
        formatter.dateFormat = "dd.MM.yyyy"
        return formatter.string(from: d)
    }
    
    private var calculatedAge: Int {
        let ageComponents = cal.dateComponents([.year], from: birthDate, to: today)
        return max(0, ageComponents.year ?? 0)
    }
    
    private var exactAgeDescription: String {
        let comp = cal.dateComponents([.year, .month, .day], from: birthDate, to: today)
        let y = comp.year ?? 0
        let m = comp.month ?? 0
        let d = comp.day ?? 0
        if y == 0 {
            return "\(m) Monate, \(d) Tage alt"
        }
        return "\(y) Jahre, \(m) Monate (\(d) Tage)"
    }
    
    var body: some View {
        ZStack {
            Color(red: 20/255, green: 20/255, blue: 22/255).ignoresSafeArea()
            
            ScrollView {
                VStack(spacing: 20) {
                    
                    // Header
                    HStack(spacing: 14) {
                        Image("Oli_Security_bgless")
                            .resizable()
                            .scaledToFit()
                            .frame(width: 56, height: 56)
                            .clipShape(Circle())
                            .shadow(color: Color.black.opacity(0.3), radius: 4)
                        
                        VStack(alignment: .leading, spacing: 3) {
                            Text("AUSWEISKONTROLLE")
                                .font(.caption2)
                                .fontWeight(.heavy)
                                .foregroundColor(.red)
                            
                            Text("FSK & Altersrechner")
                                .font(.title3)
                                .fontWeight(.heavy)
                                .foregroundColor(.white)
                        }
                        
                        Spacer()
                        
                        Button(action: { dismiss() }) {
                            Image(systemName: "xmark.circle.fill")
                                .font(.title2)
                                .foregroundColor(.gray.opacity(0.8))
                        }
                    }
                    .padding(.horizontal)
                    .padding(.top, 16)
                    
                    // 1. HEUTIGE STICHTAGE (SCHNELLBLICK FÜR EINLASS)
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Image(systemName: "calendar.badge.checkmark")
                                .foregroundColor(.red)
                            Text("Heutige Stichtage (Geboren am/vor)")
                                .font(.subheadline)
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                            Spacer()
                            Text("Heute")
                                .font(.caption2)
                                .fontWeight(.bold)
                                .padding(.horizontal, 6)
                                .padding(.vertical, 2)
                                .background(Color.red.opacity(0.2))
                                .foregroundColor(.red)
                                .cornerRadius(4)
                        }
                        
                        // FSK Grid
                        VStack(spacing: 8) {
                            StichtagRow(fskLabel: "FSK 18", requiredAge: "ab 18 Jahre", cutoff: cutoffDate(yearsAgo: 18), color: .red, note: "Volljährig")
                            StichtagRow(fskLabel: "FSK 16", requiredAge: "ab 16 Jahre", cutoff: cutoffDate(yearsAgo: 16), color: .orange, note: "Keine Ausnahme")
                            StichtagRow(fskLabel: "FSK 12", requiredAge: "ab 12 Jahre", cutoff: cutoffDate(yearsAgo: 12), color: .yellow, note: "Ab 6 mit Eltern")
                            StichtagRow(fskLabel: "FSK 6", requiredAge: "ab 6 Jahre", cutoff: cutoffDate(yearsAgo: 6), color: .green, note: "Ab 6 Jahre")
                        }
                    }
                    .padding(16)
                    .background(Color.white.opacity(0.04))
                    .cornerRadius(20)
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(Color.white.opacity(0.08), lineWidth: 1)
                    )
                    .padding(.horizontal)
                    
                    // 2. GEBURTSDATUM EINGABE & RECHNER
                    VStack(alignment: .leading, spacing: 14) {
                        HStack {
                            Image(systemName: "person.crop.circle.badge.questionmark")
                                .foregroundColor(.yellow)
                            Text("Geburtsdatum vom Ausweis prüfen")
                                .font(.subheadline)
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                        }
                        
                        DatePicker(
                            "Geburtsdatum",
                            selection: $birthDate,
                            in: ...today,
                            displayedComponents: .date
                        )
                        .datePickerStyle(.graphical)
                        .colorScheme(.dark)
                        .accentColor(.red)
                        .padding(8)
                        .background(Color.black.opacity(0.3))
                        .cornerRadius(16)
                        
                        // Quick Presets
                        HStack(spacing: 8) {
                            PresetAgeButton(title: "Vor 18 J.", years: 18, birthDate: $birthDate)
                            PresetAgeButton(title: "Vor 16 J.", years: 16, birthDate: $birthDate)
                            PresetAgeButton(title: "Vor 12 J.", years: 12, birthDate: $birthDate)
                            PresetAgeButton(title: "Vor 6 J.", years: 6, birthDate: $birthDate)
                        }
                    }
                    .padding(16)
                    .background(Color.white.opacity(0.04))
                    .cornerRadius(20)
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(Color.white.opacity(0.08), lineWidth: 1)
                    )
                    .padding(.horizontal)
                    
                    // 3. ERGEBNIS & BERECHTIGUNG
                    VStack(spacing: 14) {
                        HStack {
                            VStack(alignment: .leading, spacing: 4) {
                                Text("Berechnetes Alter")
                                    .font(.caption)
                                    .foregroundColor(.gray)
                                Text("\(calculatedAge) Jahre alt")
                                    .font(.title)
                                    .fontWeight(.heavy)
                                    .foregroundColor(.white)
                                Text(exactAgeDescription)
                                    .font(.caption2)
                                    .foregroundColor(.gray)
                            }
                            Spacer()
                            
                            // Biggest approved badge
                            VStack(spacing: 2) {
                                Text(calculatedAge >= 18 ? "FSK 18" : (calculatedAge >= 16 ? "FSK 16" : (calculatedAge >= 12 ? "FSK 12" : (calculatedAge >= 6 ? "FSK 6" : "FSK 0"))))
                                    .font(.title2)
                                    .fontWeight(.heavy)
                                    .foregroundColor(.white)
                                Text("Erlaubt")
                                    .font(.caption2)
                                    .fontWeight(.bold)
                                    .foregroundColor(.green)
                            }
                            .padding(.horizontal, 16)
                            .padding(.vertical, 10)
                            .background(Color.green.opacity(0.2))
                            .cornerRadius(14)
                            .overlay(RoundedRectangle(cornerRadius: 14).stroke(Color.green.opacity(0.4), lineWidth: 1.5))
                        }
                        
                        Divider().background(Color.white.opacity(0.1))
                        
                        // Allowed FSK Grid
                        HStack(spacing: 8) {
                            FSKEligibilityBadge(label: "FSK 0", isAllowed: calculatedAge >= 0)
                            FSKEligibilityBadge(label: "FSK 6", isAllowed: calculatedAge >= 6)
                            FSKEligibilityBadge(label: "FSK 12", isAllowed: calculatedAge >= 12, sub: "ab 6 mit Eltern")
                            FSKEligibilityBadge(label: "FSK 16", isAllowed: calculatedAge >= 16)
                            FSKEligibilityBadge(label: "FSK 18", isAllowed: calculatedAge >= 18)
                        }
                        
                        Divider().background(Color.white.opacity(0.1))
                        
                        // JuSchG Time Rules
                        VStack(alignment: .leading, spacing: 6) {
                            Text("JuSchG Auslass-Zeitbeschränkung:")
                                .font(.caption)
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                            
                            if calculatedAge < 14 {
                                Text("⚠️ Unter 14 Jahre: Filmende vor 20:00 Uhr erforderlich (ohne Begleitung).")
                                    .font(.caption2)
                                    .foregroundColor(.orange)
                            } else if calculatedAge < 16 {
                                Text("⚠️ Unter 16 Jahre: Filmende vor 22:00 Uhr erforderlich (ohne Begleitung).")
                                    .font(.caption2)
                                    .foregroundColor(.orange)
                            } else if calculatedAge < 18 {
                                Text("ℹ️ 16-17 Jahre: Filmende vor 24:00 Uhr erlaubt.")
                                    .font(.caption2)
                                    .foregroundColor(.blue)
                            } else {
                                Text("✅ Ab 18 Jahre: Keine zeitlichen Einschränkungen.")
                                    .font(.caption2)
                                    .foregroundColor(.green)
                            }
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                    }
                    .padding(16)
                    .background(Color.white.opacity(0.06))
                    .cornerRadius(20)
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(Color.red.opacity(0.3), lineWidth: 1.5)
                    )
                    .padding(.horizontal)
                    .padding(.bottom, 30)
                }
            }
        }
    }
}

struct StichtagRow: View {
    let fskLabel: String
    let requiredAge: String
    let cutoff: String
    let color: Color
    let note: String
    
    var body: some View {
        HStack {
            Text(fskLabel)
                .font(.caption)
                .fontWeight(.heavy)
                .foregroundColor(.white)
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(color.opacity(0.8))
                .cornerRadius(6)
            
            VStack(alignment: .leading, spacing: 1) {
                Text(requiredAge)
                    .font(.caption)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                Text(note)
                    .font(.system(size: 10))
                    .foregroundColor(.gray)
            }
            
            Spacer()
            
            Text("≤ \(cutoff)")
                .font(.subheadline)
                .fontWeight(.heavy)
                .foregroundColor(color)
                .padding(.horizontal, 10)
                .padding(.vertical, 4)
                .background(color.opacity(0.15))
                .cornerRadius(8)
        }
        .padding(.vertical, 3)
    }
}

struct PresetAgeButton: View {
    let title: String
    let years: Int
    @Binding var birthDate: Date
    
    var body: some View {
        Button(action: {
            if let d = Calendar.current.date(byAdding: .year, value: -years, to: Date()) {
                birthDate = d
                let generator = UIImpactFeedbackGenerator(style: .light)
                generator.impactOccurred()
            }
        }) {
            Text(title)
                .font(.caption2)
                .fontWeight(.bold)
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 8)
                .background(Color.white.opacity(0.08))
                .cornerRadius(8)
        }
    }
}

struct FSKEligibilityBadge: View {
    let label: String
    let isAllowed: Bool
    var sub: String? = nil
    
    var body: some View {
        VStack(spacing: 3) {
            Text(label)
                .font(.caption2)
                .fontWeight(.heavy)
                .foregroundColor(isAllowed ? .white : .gray.opacity(0.5))
            
            Image(systemName: isAllowed ? "checkmark.circle.fill" : "xmark.circle.fill")
                .font(.caption)
                .foregroundColor(isAllowed ? .green : .red.opacity(0.7))
            
            if let sub = sub {
                Text(sub)
                    .font(.system(size: 8))
                    .foregroundColor(.gray)
                    .multilineTextAlignment(.center)
            }
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 6)
        .background(isAllowed ? Color.green.opacity(0.1) : Color.red.opacity(0.06))
        .cornerRadius(8)
    }
}

