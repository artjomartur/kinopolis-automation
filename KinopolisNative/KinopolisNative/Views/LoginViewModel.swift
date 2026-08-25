import Foundation
import Combine

class LoginViewModel: ObservableObject {
    @Published var email = ""
    @Published var password = ""
    @Published var isLoading = false
    @Published var errorMessage: String? = nil
    
    func login() {
        guard !email.isEmpty, !password.isEmpty else {
            self.errorMessage = "Bitte E-Mail und Passwort eingeben"
            return
        }
        
        self.isLoading = true
        self.errorMessage = nil
        
        guard let url = URL(string: "http://localhost:3001/api/auth/login") else { return }
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body: [String: Any] = ["email": email, "password": password]
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            DispatchQueue.main.async {
                self.isLoading = false
                
                if let error = error {
                    self.errorMessage = "Netzwerkfehler: \(error.localizedDescription)"
                    return
                }
                
                guard let data = data else {
                    self.errorMessage = "Keine Daten empfangen"
                    return
                }
                
                do {
                    if let json = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
                        if let success = json["success"] as? Bool, success == true,
                           let token = json["token"] as? String,
                           let userDict = json["user"] as? [String: Any] {
                            
                            let user = AuthManager.User(
                                id: userDict["id"] as? String ?? "",
                                name: userDict["name"] as? String ?? "",
                                location: userDict["location"] as? String ?? "",
                                role: userDict["role"] as? String ?? "user"
                            )
                            
                            AuthManager.shared.login(token: token, user: user)
                        } else {
                            self.errorMessage = json["error"] as? String ?? "Anmeldung fehlgeschlagen"
                        }
                    }
                } catch {
                    self.errorMessage = "Fehler beim Verarbeiten der Antwort"
                }
            }
        }.resume()
    }
}
