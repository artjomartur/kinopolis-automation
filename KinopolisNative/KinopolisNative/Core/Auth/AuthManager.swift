import SwiftUI
import Combine

class AuthManager: ObservableObject {
    static let shared = AuthManager()
    
    @Published var isAuthenticated: Bool = false
    @Published var currentUser: User? = nil
    @Published var isGuest: Bool = false
    
    // Auth Tokens
    private let tokenKey = "kp_auth_token"
    private let guestKey = "kp_guest_mode"
    private let userKey = "kp_user_data"
    
    struct User: Codable {
        let id: String
        let name: String
        let location: String
        let role: String
    }
    
    init() {
        checkToken()
    }
    
    func checkToken() {
        // 1. Check if user profile was stored in UserDefaults
        if let userData = UserDefaults.standard.data(forKey: userKey),
           let user = try? JSONDecoder().decode(User.self, from: userData),
           !user.name.trimmingCharacters(in: .whitespaces).isEmpty && user.name != "Mitarbeiter" {
            self.currentUser = user
            self.isAuthenticated = true
            self.isGuest = false
            return
        }
        
        // 2. Check keychain token & decode JWT payload
        if let data = KeychainHelper.standard.read(service: tokenKey, account: "kinopolis"),
           let token = String(data: data, encoding: .utf8), !token.isEmpty {
            if let decodedUser = decodeUserFromJWT(token) {
                self.currentUser = decodedUser
                if let encoded = try? JSONEncoder().encode(decodedUser) {
                    UserDefaults.standard.set(encoded, forKey: userKey)
                }
            }
            self.isAuthenticated = true
            self.isGuest = false
            return
        }
        
        // 3. Check if guest mode is active
        if UserDefaults.standard.bool(forKey: guestKey) {
            self.isGuest = true
            self.isAuthenticated = true
            self.currentUser = nil
            return
        }
        
        self.isAuthenticated = false
        self.isGuest = false
        self.currentUser = nil
    }
    
    private func decodeUserFromJWT(_ token: String) -> User? {
        let parts = token.split(separator: ".")
        guard parts.count >= 2 else { return nil }
        var base64 = String(parts[1])
            .replacingOccurrences(of: "-", with: "+")
            .replacingOccurrences(of: "_", with: "/")
        while base64.count % 4 != 0 {
            base64.append("=")
        }
        guard let data = Data(base64Encoded: base64),
              let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else {
            return nil
        }
        
        let first = json["first_name"] as? String ?? ""
        let last = json["last_name"] as? String ?? ""
        var fullName = "\(first) \(last)".trimmingCharacters(in: .whitespaces)
        if fullName.isEmpty {
            fullName = json["name"] as? String ?? ""
        }
        if fullName.isEmpty {
            fullName = json["email"] as? String ?? ""
        }
        if fullName.isEmpty {
            fullName = "Artjom Becker"
        }
        
        return User(
            id: json["id"] as? String ?? "\(json["id"] as? Int ?? 1)",
            name: fullName,
            location: json["location"] as? String ?? "su",
            role: json["role"] as? String ?? "admin"
        )
    }
    
    func enableGuestMode() {
        UserDefaults.standard.set(true, forKey: guestKey)
        UserDefaults.standard.removeObject(forKey: userKey)
        DispatchQueue.main.async {
            self.isGuest = true
            self.currentUser = nil
            self.isAuthenticated = true
        }
    }
    
    func login(token: String, user: User) {
        if let data = token.data(using: .utf8) {
            KeychainHelper.standard.save(data, service: tokenKey, account: "kinopolis")
        }
        
        // Save user to UserDefaults
        if let encoded = try? JSONEncoder().encode(user) {
            UserDefaults.standard.set(encoded, forKey: userKey)
        }
        
        // Remove guest mode
        UserDefaults.standard.removeObject(forKey: guestKey)
        
        // Sync user location to selectedLocation
        if !user.location.isEmpty {
            UserDefaults.standard.set(user.location.lowercased(), forKey: "selectedLocation")
            NotificationCenter.default.post(name: NSNotification.Name("LocationChanged"), object: nil)
        }
        
        DispatchQueue.main.async {
            self.isGuest = false
            self.currentUser = user
            self.isAuthenticated = true
        }
    }
    
    func logout() {
        KeychainHelper.standard.delete(service: tokenKey, account: "kinopolis")
        UserDefaults.standard.removeObject(forKey: guestKey)
        UserDefaults.standard.removeObject(forKey: userKey)
        DispatchQueue.main.async {
            self.currentUser = nil
            self.isAuthenticated = false
            self.isGuest = false
        }
    }
}
