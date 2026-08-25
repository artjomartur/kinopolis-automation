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
        if UserDefaults.standard.bool(forKey: guestKey) {
            self.isGuest = true
            self.isAuthenticated = true
            return
        }
        
        if let data = KeychainHelper.standard.read(service: tokenKey, account: "kinopolis"),
           let token = String(data: data, encoding: .utf8), !token.isEmpty {
            self.isAuthenticated = true
            self.isGuest = false
        } else {
            self.isAuthenticated = false
            self.isGuest = false
        }
    }
    
    func enableGuestMode() {
        UserDefaults.standard.set(true, forKey: guestKey)
        DispatchQueue.main.async {
            self.isGuest = true
            self.isAuthenticated = true
        }
    }
    
    func login(token: String, user: User) {
        if let data = token.data(using: .utf8) {
            KeychainHelper.standard.save(data, service: tokenKey, account: "kinopolis")
        }
        
        DispatchQueue.main.async {
            self.currentUser = user
            self.isAuthenticated = true
        }
    }
    
    func logout() {
        KeychainHelper.standard.delete(service: tokenKey, account: "kinopolis")
        UserDefaults.standard.removeObject(forKey: guestKey)
        DispatchQueue.main.async {
            self.currentUser = nil
            self.isAuthenticated = false
            self.isGuest = false
        }
    }
}
