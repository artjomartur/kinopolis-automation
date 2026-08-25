import SwiftUI

struct LoginView: View {
    @EnvironmentObject var authManager: AuthManager
    
    @State private var pin: String = ""
    @State private var isLoading = false
    @State private var errorMessage: String? = nil
    
    var body: some View {
        ZStack {
            // Dark Background
            Color(red: 24/255, green: 24/255, blue: 26/255).ignoresSafeArea()
            
            VStack(spacing: 30) {
                Spacer()
                
                // Kinopolis Native Logo / Header
                VStack(spacing: 8) {
                    Image(systemName: "film")
                        .font(.system(size: 60))
                        .foregroundColor(.white)
                    
                    Text("Kinopolis Automation")
                        .font(.title2)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                    
                    Text("Native iOS Edition")
                        .font(.subheadline)
                        .foregroundColor(.gray)
                }
                
                // PIN Input
                VStack(alignment: .leading, spacing: 8) {
                    Text("PIN EINGEBEN")
                        .font(.caption)
                        .fontWeight(.semibold)
                        .foregroundColor(.gray)
                    
                    SecureField("Dein 4- bis 6-stelliger PIN", text: $pin)
                        .padding()
                        .background(Color.white.opacity(0.1))
                        .cornerRadius(12)
                        .foregroundColor(.white)
                        .keyboardType(.numberPad)
                }
                .padding(.horizontal, 30)
                
                if let errorMessage = errorMessage {
                    Text(errorMessage)
                        .foregroundColor(.red)
                        .font(.footnote)
                }
                
                Button(action: performLogin) {
                    HStack {
                        if isLoading {
                            ProgressView()
                                .progressViewStyle(CircularProgressViewStyle(tint: .white))
                        } else {
                            Text("Einloggen")
                                .fontWeight(.bold)
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(12)
                }
                .padding(.horizontal, 30)
                .disabled(pin.isEmpty || isLoading)
                
                Spacer()
                
                Button("Als Gast fortfahren") {
                    authManager.login(token: "guest", user: AuthManager.User(id: "guest", name: "Gast", location: "su", role: "guest"))
                }
                .foregroundColor(.gray)
                .font(.footnote)
                .padding(.bottom, 20)
            }
        }
    }
    
    func performLogin() {
        isLoading = true
        errorMessage = nil
        
        // Mock Login for now (usually hits /api/auth/login)
        // Here we simulate network delay
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            isLoading = false
            if pin == "1234" { // Replace with actual API call
                authManager.login(token: "mock_token_xyz", user: AuthManager.User(id: "1", name: "Artjom", location: "su", role: "admin"))
            } else {
                errorMessage = "Falscher PIN"
            }
        }
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView().environmentObject(AuthManager.shared)
    }
}
