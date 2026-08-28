import SwiftUI

struct WalletPassView: View {
    @Environment(\.presentationMode) var presentationMode
    @EnvironmentObject var authManager: AuthManager
    @AppStorage("selectedLocation") private var selectedLocation = "su"
    
    @State private var isAdded = false
    
    // Animation states
    @State private var passOffset: CGFloat = 200
    @State private var passOpacity: Double = 0
    
    var body: some View {
        NavigationView {
            ZStack {
                // Cool blurred background
                Color(UIColor.secondarySystemBackground)
                    .ignoresSafeArea()
                
                LinearGradient(
                    colors: [.red.opacity(0.3), .clear, .blue.opacity(0.2)],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
                .ignoresSafeArea()
                
                VStack {
                    if isAdded {
                        VStack(spacing: 20) {
                            Image(systemName: "checkmark.circle.fill")
                                .font(.system(size: 100))
                                .foregroundColor(.green)
                            Text("Ausweis hinzugefügt!")
                                .font(.title)
                                .fontWeight(.bold)
                                .foregroundColor(.primary)
                            Text("Dein digitaler Mitarbeiterausweis ist jetzt in deinem In-App-Wallet gespeichert.")
                                .font(.subheadline)
                                .foregroundColor(.gray)
                                .multilineTextAlignment(.center)
                                .padding(.horizontal, 40)
                        }
                        .transition(.scale.combined(with: .opacity))
                    } else {
                        // The Cool "Pass" Card
                        VStack(spacing: 0) {
                            // Header with Oli
                            ZStack(alignment: .topTrailing) {
                                LinearGradient(
                                    colors: [Color.red, Color(red: 0.8, green: 0, blue: 0)],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                                
                                HStack {
                                    // Offizielles Kinopolis Logo
                                    Image("KinopolisLogo")
                                        .resizable()
                                        .scaledToFit()
                                        .frame(height: 60)
                                    Spacer()
                                }
                                .padding(24)
                                
                                // Größerer Oli (anderes Bild: Oli_2_bgless)
                                Image("Oli_2_bgless")
                                    .resizable()
                                    .scaledToFit()
                                    .frame(width: 140, height: 140)
                                    .offset(x: -5, y: -25)
                            }
                            .frame(height: 120)
                            
                            // Body
                            VStack(spacing: 30) {
                                HStack {
                                    VStack(alignment: .leading, spacing: 6) {
                                        Text("Mitarbeiter")
                                            .font(.caption)
                                            .fontWeight(.bold)
                                            .foregroundColor(.gray)
                                            .textCase(.uppercase)
                                        Text(authManager.currentUser?.name ?? "Mitarbeiter")
                                            .font(.title2)
                                            .fontWeight(.bold)
                                            .foregroundColor(.primary)
                                    }
                                    Spacer()
                                    VStack(alignment: .trailing, spacing: 6) {
                                        Text("Standort")
                                            .font(.caption)
                                            .fontWeight(.bold)
                                            .foregroundColor(.gray)
                                            .textCase(.uppercase)
                                        Text(LocationData.name(for: selectedLocation))
                                            .font(.title3)
                                            .fontWeight(.bold)
                                            .foregroundColor(.primary)
                                    }
                                }
                                
                                HStack {
                                    VStack(alignment: .leading, spacing: 6) {
                                        Text("Rolle")
                                            .font(.caption)
                                            .fontWeight(.bold)
                                            .foregroundColor(.gray)
                                            .textCase(.uppercase)
                                        Text((authManager.currentUser?.role ?? "Mitarbeiter").capitalized)
                                            .font(.headline)
                                            .foregroundColor(.primary)
                                    }
                                    Spacer()
                                    VStack(alignment: .trailing, spacing: 6) {
                                        Text("Personal-ID")
                                            .font(.caption)
                                            .fontWeight(.bold)
                                            .foregroundColor(.gray)
                                            .textCase(.uppercase)
                                        Text("K-\(String(format: "%05d", Int.random(in: 10000...99999)))")
                                            .font(.headline)
                                            .foregroundColor(.primary)
                                    }
                                }
                                
                                // Fake Barcode
                                VStack(spacing: 8) {
                                    Image(systemName: "barcode")
                                        .resizable()
                                        .scaledToFit()
                                        .frame(height: 70)
                                        .foregroundColor(.primary)
                                    Text("9 4827 103 481")
                                        .font(.caption)
                                        .foregroundColor(.gray)
                                }
                                .padding(.top, 10)
                            }
                            .padding(24)
                            .background(Color.white)
                        }
                        .cornerRadius(24)
                        .shadow(color: .red.opacity(0.2), radius: 30, x: 0, y: 20)
                        .padding(.horizontal, 24)
                        
                        // Pass Animation states
                        .offset(y: passOffset)
                        .opacity(passOpacity)
                        .onAppear {
                            withAnimation(.spring(response: 0.6, dampingFraction: 0.8)) {
                                passOffset = 0
                                passOpacity = 1
                            }
                        }
                    }
                }
            }
            .navigationTitle(isAdded ? "" : "Mitarbeiterausweis")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Schließen") {
                        presentationMode.wrappedValue.dismiss()
                    }
                    .foregroundColor(.primary)
                    .opacity(isAdded ? 0 : 1)
                }
                
                ToolbarItem(placement: .navigationBarTrailing) {
                    if !isAdded {
                        Button("Hinzufügen") {
                            withAnimation(.spring(response: 0.5, dampingFraction: 0.7)) {
                                isAdded = true
                            }
                            
                            let generator = UINotificationFeedbackGenerator()
                            generator.notificationOccurred(.success)
                            
                            // Dismiss automatically after success
                            DispatchQueue.main.asyncAfter(deadline: .now() + 2.5) {
                                presentationMode.wrappedValue.dismiss()
                            }
                        }
                        .fontWeight(.bold)
                        .foregroundColor(.blue)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(Color.blue.opacity(0.15))
                        .cornerRadius(16)
                    }
                }
            }
        }
        .preferredColorScheme(.dark)
    }
}
