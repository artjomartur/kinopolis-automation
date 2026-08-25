import Foundation
import Combine

class FunkViewModel: ObservableObject {
    @Published var activeCategory: String? = nil
    @Published var toastMessage: String? = nil
    @Published var showToast: Bool = false
    
    // Subscribe to WebSocketManager's messages
    private var cancellables = Set<AnyCancellable>()
    
    init() {
        WebSocketManager.shared.connect()
        
        WebSocketManager.shared.$messages
            .receive(on: RunLoop.main)
            .sink { [weak self] messages in
                guard let self = self, let last = messages.last else { return }
                self.triggerToast(message: "Nachricht: \(last)")
            }
            .store(in: &cancellables)
    }
    
    func toggleCategory(_ category: String) {
        if activeCategory == category {
            activeCategory = nil
        } else {
            activeCategory = category
        }
    }
    
    func requestRestock(item: String) {
        WebSocketManager.shared.sendRestock(item: item)
        triggerToast(message: "Nachschub angefragt: \(item)")
        activeCategory = nil // Collapse
    }
    
    private func triggerToast(message: String) {
        self.toastMessage = message
        self.showToast = true
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
            self.showToast = false
        }
    }
    
    deinit {
        WebSocketManager.shared.disconnect()
    }
}
