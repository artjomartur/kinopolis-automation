import Foundation

class NetworkManager {
    static let shared = NetworkManager()
    
    let baseURL = "https://kinopolis.artjombecker.com/api"
    
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
        
        let cacheKey = "offline_cache_\(endpoint)"
        var fetchedData: Data
        
        do {
            let (data, response) = try await URLSession.shared.data(for: request)
            
            if let httpResponse = response as? HTTPURLResponse {
                if httpResponse.statusCode == 401 || httpResponse.statusCode == 403 {
                    throw NetworkError.unauthorized
                }
            }
            
            fetchedData = data
            // Cache successful GET requests for offline use
            if method == "GET" {
                UserDefaults.standard.set(data, forKey: cacheKey)
            }
        } catch {
            // Fallback to cache if network fails
            if method == "GET", let cachedData = UserDefaults.standard.data(forKey: cacheKey) {
                fetchedData = cachedData
                print("Network offline. Loaded \(endpoint) from cache.")
            } else {
                throw error
            }
        }
        
        do {
            let decodedResponse = try JSONDecoder().decode(T.self, from: fetchedData)
            return decodedResponse
        } catch {
            throw NetworkError.decodingFailed
        }
    }
}
