import Foundation
import Combine

class RegisterViewModel: ObservableObject {
    @Published var email = ""
    @Published var firstName = ""
    @Published var lastName = ""
    @Published var location = "kp" // default Darmstadt
    @Published var employeeNumber = ""
    @Published var password = ""
    
    @Published var isLoading = false
    @Published var errorMessage: String? = nil
    @Published var registrationSuccess = false
    
    // Cloudflare Workers API (D1)
    private let apiURL = "https://kinopolis.artjombecker.com"
    
    func register() {
        guard !email.isEmpty, !firstName.isEmpty, !lastName.isEmpty, !password.isEmpty else {
            self.errorMessage = "Bitte alle Pflichtfelder ausfüllen"
            return
        }
        
        self.isLoading = true
        self.errorMessage = nil
        
        guard let url = URL(string: "\(apiURL)/api/auth/register") else { return }
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.timeoutInterval = 10
        
        let body: [String: Any] = [
            "email": email,
            "first_name": firstName,
            "last_name": lastName,
            "location": location,
            "employee_number": employeeNumber,
            "password": password
        ]
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
                        if let errorMsg = json["error"] as? String {
                            self.errorMessage = errorMsg
                        } else {
                            // Success
                            self.registrationSuccess = true
                        }
                    }
                } catch {
                    // Falls die Antwort kein JSON ist (z.B. OK)
                    if let httpResp = response as? HTTPURLResponse, httpResp.statusCode == 200 {
                        self.registrationSuccess = true
                    } else {
                        self.errorMessage = "Fehler bei der Registrierung."
                    }
                }
            }
        }.resume()
    }
}
