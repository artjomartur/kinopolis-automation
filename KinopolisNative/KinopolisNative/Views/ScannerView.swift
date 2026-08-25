import SwiftUI
import AVFoundation

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

struct ScannerView: View {
    @State private var scannedTicket: MockTicket? = nil
    @State private var showResult = false
    @State private var isScanning = true
    @AppStorage("selectedLocation") private var selectedLocation = "su"
    
    var body: some View {
        ZStack {
            Color.black.ignoresSafeArea()
            
            VStack(spacing: 0) {
                // Unified App Header
                AppHeaderView(
                    imageName: "Oli_Security_bgless",
                    subtitle: "Kartenkontrolle",
                    title: "Einlass-Scanner"
                )
                .background(Color(red: 24/255, green: 24/255, blue: 26/255))
                
                // Camera View
                if isScanning {
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
    }
    
    private func handleScan(code: String) {
        // Pause scanning
        isScanning = false
        
        // Generate Mock Data
        let randomValid = Bool.random()
        let movies = ["Deadpool & Wolverine", "Ich - Einfach unverbesserlich 4", "Alles steht Kopf 2", "Alien: Romulus"]
        let times = ["20:15", "17:30", "19:00", "22:45"]
        let fsks = ["FSK 16", "FSK 0", "FSK 6", "FSK 16"]
        let location = UserDefaults.standard.string(forKey: "selectedLocation") ?? "su"
        let halls: [String]
        if location == "kp" {
            halls = ["Kino 1", "Kino 2", "Kino 3", "Kino 4", "Kino 5", "Kino 6", "Kino 7", "Kino 8"]
        } else if location == "cd" {
            halls = ["Helia 1", "Helia 2", "Helia 3", "Helia 5", "Helia 7", "Festival", "Broadway", "Pali"]
        } else if location == "rx" {
            halls = ["Rex 1", "Rex 2", "Rex 3"]
        } else {
            halls = ["OnyxLED", "Kino 1", "Kino 2", "Kino 3", "Kino 4", "Kino 5", "Kino 6", "Kino 7", "Kino 8", "Kino 9"]
        }
        
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
        
        // Haptic feedback
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(randomValid ? .success : .error)
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
            self.scannedTicket = ticket
            self.showResult = true
        }
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
