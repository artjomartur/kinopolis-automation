import SwiftUI

struct MehrView: View {
    @EnvironmentObject var authManager: AuthManager
    
    var body: some View {
        ZStack {
            Color.black.ignoresSafeArea()
            
            VStack(spacing: 20) {
                Text("Mehr (Coming soon)")
                    .foregroundColor(.white)
                
                Button(action: {
                    authManager.logout()
                }) {
                    Text("Ausloggen / Zum Login Screen")
                        .fontWeight(.bold)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.red.opacity(0.8))
                        .foregroundColor(.white)
                        .cornerRadius(12)
                        .padding(.horizontal)
                }
            }
        }
    }
}
