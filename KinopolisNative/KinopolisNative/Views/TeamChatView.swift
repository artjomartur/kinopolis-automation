import SwiftUI

struct TeamChatView: View {
    @Environment(\.dismiss) var dismiss
    
    let messages = [
        "Kasse: Brauche kurz Ablösung (Toilettenpause)",
        "Theke: Popcorn Saal 1 bis 4 nachfüllen bitte",
        "Einlass: Unterstützung bei Saal 3 benötigt",
        "Alle: Spätschicht verspätet sich um 10 Min.",
        "Technik: Bildausfall Saal 5!",
        "Gastro: Eis-Maschine defekt"
    ]
    
    @State private var showSentToast = false
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(UIColor.systemBackground).ignoresSafeArea()
                
                VStack(alignment: .leading, spacing: 20) {
                    Text("Quick-Chat")
                        .font(.title2)
                        .fontWeight(.bold)
                        .foregroundColor(.primary)
                        .padding(.top)
                    
                    Text("Tippe auf eine Nachricht, um sie sofort als Push-Benachrichtigung an das diensthabende Team zu senden.")
                        .font(.subheadline)
                        .foregroundColor(.gray)
                    
                    ScrollView {
                        VStack(spacing: 12) {
                            ForEach(messages, id: \.self) { msg in
                                Button(action: {
                                    sendMessage()
                                }) {
                                    HStack {
                                        Text(msg)
                                            .foregroundColor(.primary)
                                            .multilineTextAlignment(.leading)
                                        Spacer()
                                        Image(systemName: "paperplane.fill")
                                            .foregroundColor(.blue)
                                    }
                                    .padding()
                                    .background(Color.white.opacity(0.05))
                                    .cornerRadius(12)
                                }
                            }
                        }
                    }
                    
                    Spacer()
                }
                .padding()
                
                if showSentToast {
                    VStack {
                        Spacer()
                        HStack {
                            Image(systemName: "checkmark.circle.fill")
                                .foregroundColor(.green)
                            Text("Nachricht gesendet!")
                                .foregroundColor(.primary)
                                .fontWeight(.medium)
                        }
                        .padding()
                        .background(Color.black.opacity(0.8))
                        .cornerRadius(20)
                        .padding(.bottom, 40)
                        .transition(.move(edge: .bottom).combined(with: .opacity))
                    }
                }
            }
            .navigationTitle("Team Chat")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Schließen") {
                        dismiss()
                    }
                    .foregroundColor(.blue)
                }
            }
        }
    }
    
    private func sendMessage() {
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.success)
        
        withAnimation {
            showSentToast = true
        }
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            withAnimation {
                showSentToast = false
            }
        }
    }
}
