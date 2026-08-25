import SwiftUI

struct MehrView: View {
    @EnvironmentObject var authManager: AuthManager
    
    var body: some View {
        ZStack {
            Color(red: 24/255, green: 24/255, blue: 26/255).ignoresSafeArea()
            
            ScrollView {
                VStack(spacing: 24) {
                    // Profile Card
                    VStack(spacing: 16) {
                        Image("Oli_Security_bgless")
                            .resizable()
                            .scaledToFit()
                            .frame(height: 80)
                        
                        Text(authManager.currentUser?.name ?? "Gast")
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                        
                        Text(authManager.currentUser?.role?.uppercased() ?? "USER")
                            .font(.caption)
                            .fontWeight(.heavy)
                            .foregroundColor(.red)
                            .padding(.horizontal, 16)
                            .padding(.vertical, 6)
                            .background(Color.red.opacity(0.15))
                            .cornerRadius(20)
                    }
                    .padding(.vertical, 30)
                    .frame(maxWidth: .infinity)
                    .background(Color.white.opacity(0.03))
                    .cornerRadius(20)
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(Color.white.opacity(0.08), lineWidth: 1)
                    )
                    .padding(.horizontal)
                    .padding(.top, 20)
                    
                    // Settings List
                    VStack(spacing: 0) {
                        SettingsRow(icon: "person.fill", title: "Profil bearbeiten", color: .blue)
                        SettingsRow(icon: "bell.fill", title: "Benachrichtigungen", color: .orange)
                        SettingsRow(icon: "moon.fill", title: "Dark Mode", color: .purple, trailing: "Immer an")
                        SettingsRow(icon: "globe", title: "Standort", color: .green, trailing: authManager.currentUser?.location?.uppercased() ?? "SU")
                    }
                    .background(Color.white.opacity(0.03))
                    .cornerRadius(16)
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(Color.white.opacity(0.08), lineWidth: 1)
                    )
                    .padding(.horizontal)
                    
                    // Info
                    VStack(spacing: 0) {
                        SettingsRow(icon: "info.circle.fill", title: "Über die App", color: .gray)
                        SettingsRow(icon: "doc.text.fill", title: "Changelog", color: .gray)
                    }
                    .background(Color.white.opacity(0.03))
                    .cornerRadius(16)
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(Color.white.opacity(0.08), lineWidth: 1)
                    )
                    .padding(.horizontal)
                    
                    // Logout
                    Button(action: {
                        authManager.logout()
                    }) {
                        HStack {
                            Image(systemName: "rectangle.portrait.and.arrow.right")
                            Text("Abmelden")
                                .fontWeight(.bold)
                        }
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.red.opacity(0.15))
                        .foregroundColor(.red)
                        .cornerRadius(16)
                        .overlay(
                            RoundedRectangle(cornerRadius: 16)
                                .stroke(Color.red.opacity(0.3), lineWidth: 1)
                        )
                    }
                    .padding(.horizontal)
                    
                    // Version
                    Text("Kinopolis Native v1.0 • Made with ❤️")
                        .font(.caption)
                        .foregroundColor(.gray.opacity(0.5))
                        .padding(.top, 10)
                    
                    Spacer().frame(height: 100)
                }
            }
        }
    }
}

struct SettingsRow: View {
    let icon: String
    let title: String
    let color: Color
    var trailing: String? = nil
    
    var body: some View {
        HStack(spacing: 14) {
            Image(systemName: icon)
                .font(.body)
                .foregroundColor(color)
                .frame(width: 30, height: 30)
                .background(color.opacity(0.15))
                .cornerRadius(8)
            
            Text(title)
                .foregroundColor(.white)
            
            Spacer()
            
            if let trailing = trailing {
                Text(trailing)
                    .font(.subheadline)
                    .foregroundColor(.gray)
            }
            
            Image(systemName: "chevron.right")
                .font(.caption)
                .foregroundColor(.gray.opacity(0.5))
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 14)
    }
}
