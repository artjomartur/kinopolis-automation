import SwiftUI

struct LoginView: View {
    @StateObject private var viewModel = LoginViewModel()
    @EnvironmentObject var authManager: AuthManager
    
    var body: some View {
        ZStack {
            // Background
            Color(UIColor.systemBackground).ignoresSafeArea()
            
            VStack(spacing: 30) {
                Spacer()
                
                // Logo/Header
                VStack(spacing: 12) {
                    Image("Oli")
                        .resizable()
                        .scaledToFit()
                        .frame(height: 120)
                        .background(Color.primary.opacity(0.1))
                        .cornerRadius(24)
                        .shadow(color: Color.black.opacity(0.3), radius: 10, x: 0, y: 5)
                    
                    Text("Willkommen zurück")
                        .font(.title)
                        .fontWeight(.heavy)
                        .foregroundColor(.primary)
                    
                    Text("Bitte melde dich an, um fortzufahren.")
                        .font(.subheadline)
                        .foregroundColor(.gray)
                }
                
                // Error Message
                if let error = viewModel.errorMessage {
                    Text("❌ \(error)")
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .foregroundColor(Color(red: 255/255, green: 77/255, blue: 77/255))
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.red.opacity(0.15))
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.red.opacity(0.3), lineWidth: 1)
                        )
                        .cornerRadius(12)
                        .padding(.horizontal)
                }
                
                // Form
                VStack(spacing: 20) {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("E-MAIL ADRESSE")
                            .font(.caption)
                            .fontWeight(.bold)
                            .foregroundColor(.gray)
                        
                        TextField("name@kinopolis.de", text: $viewModel.email)
                            .keyboardType(.emailAddress)
                            .autocapitalization(.none)
                            .padding()
                            .background(Color.primary.opacity(0.05))
                            .cornerRadius(12)
                            .overlay(
                                RoundedRectangle(cornerRadius: 12)
                                    .stroke(Color.primary.opacity(0.1), lineWidth: 1)
                            )
                            .foregroundColor(.primary)
                    }
                    
                    VStack(alignment: .leading, spacing: 8) {
                        Text("PASSWORT")
                            .font(.caption)
                            .fontWeight(.bold)
                            .foregroundColor(.gray)
                        
                        SecureField("••••••••", text: $viewModel.password)
                            .padding()
                            .background(Color.primary.opacity(0.05))
                            .cornerRadius(12)
                            .overlay(
                                RoundedRectangle(cornerRadius: 12)
                                    .stroke(Color.primary.opacity(0.1), lineWidth: 1)
                            )
                            .foregroundColor(.primary)
                    }
                }
                .padding(.horizontal)
                
                // Login Button
                Button(action: {
                    viewModel.login()
                }) {
                    if viewModel.isLoading {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: .white))
                            .frame(maxWidth: .infinity)
                            .padding()
                    } else {
                        Text("Anmelden")
                            .font(.headline)
                            .fontWeight(.bold)
                            .frame(maxWidth: .infinity)
                            .padding()
                    }
                }
                .background(
                    LinearGradient(gradient: Gradient(colors: [Color(red: 229/255, green: 9/255, blue: 20/255), Color(red: 255/255, green: 61/255, blue: 71/255)]), startPoint: .topLeading, endPoint: .bottomTrailing)
                )
                .foregroundColor(.primary)
                .cornerRadius(12)
                .padding(.horizontal)
                .padding(.horizontal)
                .disabled(viewModel.isLoading)
                
                // Register Button
                Button(action: {
                    if let url = URL(string: "https://kinopolis.artjombecker.com/") {
                        UIApplication.shared.open(url)
                    }
                }) {
                    Text("Noch kein Account? Registrieren")
                        .font(.footnote)
                        .fontWeight(.medium)
                        .foregroundColor(.white)
                }
                .padding(.top, 15)
                
                // Guest Button
                Button(action: {
                    authManager.enableGuestMode()
                }) {
                    Text("Im Gast-Modus fortfahren (Eingeschränkt)")
                        .font(.footnote)
                        .fontWeight(.medium)
                        .foregroundColor(.gray)
                        .underline()
                }
                .padding(.top, 10)
                
                Spacer()
            }
        }
    }
}
