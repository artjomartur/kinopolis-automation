import Foundation

class NetworkManager {
    static let shared = NetworkManager()
    
    // For iOS Simulator testing, localhost points to the Mac.
    // Replace with actual Cloudflare worker URL or physical device IP when building for production/device.
    let baseURL = "http://localhost:3001/api"
    
    enum NetworkError: Error {
        case invalidURL
        case requestFailed
        case decodingFailed
        case unauthorized
    }
    
    func fetch<T: Decodable>(endpoint: String, method: String = "GET", body: Data? = nil) async throws -> T {
        guard let url = URL(string: baseURL + endpoint) else {
            throw NetworkError.invalidURL
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        // Inject Auth Token
        if let tokenData = KeychainHelper.standard.read(service: "kp_auth_token", account: "kinopolis"),
           let token = String(data: tokenData, encoding: .utf8) {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }
        
        request.httpBody = body
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        if let httpResponse = response as? HTTPURLResponse {
            if httpResponse.statusCode == 401 || httpResponse.statusCode == 403 {
                throw NetworkError.unauthorized
            }
        }
        
        do {
            let decodedResponse = try JSONDecoder().decode(T.self, from: data)
            return decodedResponse
        } catch {
            throw NetworkError.decodingFailed
        }
    }
}
