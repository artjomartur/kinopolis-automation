import SwiftUI
import Combine

class AuthManager: ObservableObject {
    static let shared = AuthManager()
    
    @Published var isAuthenticated: Bool = false
    @Published var currentUser: User? = nil
    
    // Auth Tokens
    private let tokenKey = "kp_auth_token"
    
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
        if let data = KeychainHelper.standard.read(service: tokenKey, account: "kinopolis"),
           let token = String(data: data, encoding: .utf8), !token.isEmpty {
            self.isAuthenticated = true
            // Ideally, we fetch the user profile here using the token
        } else {
            self.isAuthenticated = false
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
        DispatchQueue.main.async {
            self.currentUser = nil
            self.isAuthenticated = false
        }
    }
}
