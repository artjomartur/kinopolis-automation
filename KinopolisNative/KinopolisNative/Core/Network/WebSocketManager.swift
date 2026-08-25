import Foundation
import Combine

class WebSocketManager: ObservableObject {
    static let shared = WebSocketManager()
    
    @Published var isConnected = false
    @Published var messages: [String] = []
    
    private var webSocketTask: URLSessionWebSocketTask?
    private let serverURL = URL(string: "ws://localhost:3001")! // Default to local for now
    
    private init() {}
    
    func connect() {
        let session = URLSession(configuration: .default)
        webSocketTask = session.webSocketTask(with: serverURL)
        webSocketTask?.resume()
        receiveMessage()
        
        // Simple ping to keep alive and check connection
        ping()
    }
    
    func disconnect() {
        webSocketTask?.cancel(with: .normalClosure, reason: nil)
        isConnected = false
    }
    
    private func ping() {
        webSocketTask?.sendPing { [weak self] error in
            DispatchQueue.main.async {
                self?.isConnected = (error == nil)
            }
            if error == nil {
                DispatchQueue.global().asyncAfter(deadline: .now() + 10) {
                    self?.ping()
                }
            }
        }
    }
    
    private func receiveMessage() {
        webSocketTask?.receive { [weak self] result in
            switch result {
            case .failure(let error):
                print("WebSocket error: \(error)")
                DispatchQueue.main.async {
                    self?.isConnected = false
                }
            case .success(let message):
                switch message {
                case .string(let text):
                    DispatchQueue.main.async {
                        self?.messages.append(text)
                    }
                case .data(let data):
                    print("Received data: \(data)")
                @unknown default:
                    break
                }
                // Recursively call to keep listening
                self?.receiveMessage()
            }
        }
    }
    
    func sendMessage(_ message: String) {
        let message = URLSessionWebSocketTask.Message.string(message)
        webSocketTask?.send(message) { error in
            if let error = error {
                print("Error sending message: \(error)")
            }
        }
    }
    
    func sendRestock(item: String) {
        let payload = """
        {"type": "restock", "item": "\(item)", "time": "\(Date().timeIntervalSince1970)"}
        """
        sendMessage(payload)
    }
}
