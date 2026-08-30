import SwiftUI

struct TagesabschlussView: View {
    @Environment(\.dismiss) var dismiss
    @AppStorage("userXP") private var userXP: Int = 120
    @StateObject private var pedometerManager = PedometerManager()
    
    // Mock Data
    private let completedTasks = 12
    private let totalTasks = 15
    private let scannedTickets = Int.random(in: 50...200)
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(UIColor.systemGroupedBackground).ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: 20) {
                        // Header
                        VStack(spacing: 12) {
                            Image(systemName: "checkmark.seal.fill")
                                .font(.system(size: 60))
                                .foregroundColor(.blue)
                                .shadow(color: .blue.opacity(0.4), radius: 10, x: 0, y: 5)
                            
                            Text("Tagesabschluss")
                                .font(.title)
                                .fontWeight(.bold)
                            
                            Text("Zusammenfassung deiner heutigen Schicht")
                                .font(.subheadline)
                                .foregroundColor(.gray)
                                .multilineTextAlignment(.center)
                        }
                        .padding(.top, 20)
                        
                        // Stats Grid
                        VStack(spacing: 16) {
                            HStack(spacing: 16) {
                                StatCard(
                                    title: "Aufgaben",
                                    value: "\(completedTasks)/\(totalTasks)",
                                    icon: "checklist",
                                    color: .green
                                )
                                
                                StatCard(
                                    title: "Ticket Scans",
                                    value: "\(scannedTickets)",
                                    icon: "qrcode.viewfinder",
                                    color: .purple
                                )
                            }
                            
                            HStack(spacing: 16) {
                                StatCard(
                                    title: "Schritte",
                                    value: "\(pedometerManager.steps)",
                                    icon: "figure.walk",
                                    color: .orange
                                )
                                
                                StatCard(
                                    title: "Dein XP",
                                    value: "\(userXP) XP",
                                    icon: "star.fill",
                                    color: .yellow
                                )
                            }
                        }
                        .padding(.horizontal)
                        
                        // Submit Button
                        Button(action: {
                            submitData()
                        }) {
                            HStack {
                                Image(systemName: "paperplane.fill")
                                Text("Bericht absenden & Schicht beenden")
                                    .fontWeight(.bold)
                            }
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(
                                LinearGradient(colors: [.blue, .cyan], startPoint: .leading, endPoint: .trailing)
                            )
                            .foregroundColor(.white)
                            .cornerRadius(16)
                            .shadow(color: .blue.opacity(0.4), radius: 8, x: 0, y: 4)
                        }
                        .padding(.horizontal)
                        .padding(.top, 10)
                        
                    }
                    .padding(.bottom, 30)
                }
            }
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Schließen") {
                        dismiss()
                    }
                    .fontWeight(.bold)
                }
            }
        }
    }
    
    private func submitData() {
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.success)
        dismiss()
    }
}

struct StatCard: View {
    let title: String
    let value: String
    let icon: String
    let color: Color
    
    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(color)
                .padding()
                .background(color.opacity(0.15))
                .clipShape(Circle())
            
            VStack(spacing: 4) {
                Text(value)
                    .font(.title3)
                    .fontWeight(.bold)
                    .foregroundColor(.primary)
                Text(title)
                    .font(.caption)
                    .foregroundColor(.gray)
            }
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 20)
        .background(Color(UIColor.secondarySystemGroupedBackground))
        .cornerRadius(20)
        .shadow(color: Color.black.opacity(0.05), radius: 8, x: 0, y: 4)
    }
}
