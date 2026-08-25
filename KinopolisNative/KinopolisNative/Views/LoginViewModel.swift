import Foundation
import Combine

class LoginViewModel: ObservableObject {
    @Published var email = ""
    @Published var password = ""
    @Published var isLoading = false
    @Published var errorMessage: String? = nil
    
    // Lokale Benutzer-Datenbank (kein Server nötig)
    // Hier kannst du Accounts hinzufügen/ändern:
    private let localUsers: [[String: String]] = [
        ["email": "admin@kinopolis.de", "password": "admin123", "name": "Admin", "role": "admin", "location": "su"],
        ["email": "artjom@kinopolis.de", "password": "artjom123", "name": "Artjom", "role": "admin", "location": "su"],
        ["email": "test@kinopolis.de", "password": "test123", "name": "Testnutzer", "role": "user", "location": "su"],
    ]
    
    func login() {
        guard !email.isEmpty, !password.isEmpty else {
            self.errorMessage = "Bitte E-Mail und Passwort eingeben"
            return
        }
        
        self.isLoading = true
        self.errorMessage = nil
        
        // Kurze Verzögerung für realistisches Gefühl
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            self.isLoading = false
            
            // Lokale Prüfung
            if let user = self.localUsers.first(where: {
                $0["email"]?.lowercased() == self.email.lowercased() && $0["password"] == self.password
            }) {
                let authUser = AuthManager.User(
                    id: UUID().uuidString,
                    name: user["name"] ?? "Mitarbeiter",
                    location: user["location"] ?? "su",
                    role: user["role"] ?? "user"
                )
                
                // Token generieren und speichern
                let token = "local-\(UUID().uuidString)"
                AuthManager.shared.login(token: token, user: authUser)
            } else {
                self.errorMessage = "E-Mail oder Passwort falsch"
            }
        }
    }
}
