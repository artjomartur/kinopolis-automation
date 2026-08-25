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
        // First check if a real user profile was stored
        if let userData = UserDefaults.standard.data(forKey: userKey),
           let user = try? JSONDecoder().decode(User.self, from: userData) {
            self.currentUser = user
            self.isAuthenticated = true
            self.isGuest = false
            return
        }
        
        // Then check if guest mode is active
        if UserDefaults.standard.bool(forKey: guestKey) {
            self.isGuest = true
            self.isAuthenticated = true
            self.currentUser = nil
            return
        }
        
        // Check keychain token
        if let data = KeychainHelper.standard.read(service: tokenKey, account: "kinopolis"),
           let token = String(data: data, encoding: .utf8), !token.isEmpty {
            self.isAuthenticated = true
            self.isGuest = false
        } else {
            self.isAuthenticated = false
            self.isGuest = false
            self.currentUser = nil
        }
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
