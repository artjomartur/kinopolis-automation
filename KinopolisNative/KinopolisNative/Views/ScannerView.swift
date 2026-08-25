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
    
    var body: some View {
        ZStack {
            Color.black.ignoresSafeArea()
            
            VStack(spacing: 0) {
                // Header
                HStack {
                    Text("Einlass-Scanner")
                        .font(.title2)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                    Spacer()
                }
                .padding()
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
                .presentationDetents([.height(400)])
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
        let halls = ["Kino 1", "Kino 4", "Kino 10", "Kino 5"]
        
        let randomIndex = Int.random(in: 0..<movies.count)
        
        let ticket = MockTicket(
            isValid: randomValid,
            reason: randomValid ? nil : "Ticket bereits gescannt oder ungültig für diese Vorstellung.",
            peopleCount: Int.random(in: 1...4),
            movieTitle: movies[randomIndex],
            time: times[randomIndex],
            fsk: fsks[randomIndex],
            hall: halls[randomIndex]
        )
        
        // Haptic feedback
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(randomValid ? .success : .error)
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
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
            Color(red: 24/255, green: 24/255, blue: 26/255).ignoresSafeArea()
            
            VStack(spacing: 20) {
                // Status Icon
                Image(systemName: ticket.isValid ? "checkmark.circle.fill" : "xmark.circle.fill")
                    .font(.system(size: 80))
                    .foregroundColor(ticket.isValid ? .green : .red)
                    .padding(.top, 20)
                
                Text(ticket.isValid ? "Einlass gewährt" : "Einlass verweigert")
                    .font(.title)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                
                if let reason = ticket.reason {
                    Text(reason)
                        .font(.subheadline)
                        .foregroundColor(.gray)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                }
                
                VStack(spacing: 12) {
                    HStack {
                        Text("Film:")
                            .foregroundColor(.gray)
                        Spacer()
                        Text(ticket.movieTitle)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                    }
                    HStack {
                        Text("Saal:")
                            .foregroundColor(.gray)
                        Spacer()
                        Text(ticket.hall)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                    }
                    HStack {
                        Text("Zeit:")
                            .foregroundColor(.gray)
                        Spacer()
                        Text(ticket.time)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                    }
                    HStack {
                        Text("Personen:")
                            .foregroundColor(.gray)
                        Spacer()
                        Text("\(ticket.peopleCount)")
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                    }
                    HStack {
                        Text("FSK:")
                            .foregroundColor(.gray)
                        Spacer()
                        Text(ticket.fsk)
                            .fontWeight(.bold)
                            .foregroundColor(ticket.fsk == "FSK 16" || ticket.fsk == "FSK 18" ? .red : .white)
                    }
                }
                .padding()
                .background(Color.white.opacity(0.05))
                .cornerRadius(12)
                .padding(.horizontal)
                
                Spacer()
                
                Button(action: {
                    dismiss()
                }) {
                    Text("Nächsten scannen")
                        .fontWeight(.bold)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(ticket.isValid ? Color.green : Color.red)
                        .foregroundColor(.white)
                        .cornerRadius(12)
                        .padding(.horizontal)
                        .padding(.bottom, 20)
                }
            }
        }
    }
}
