import Foundation
import WatchConnectivity
import Combine

// MARK: - Watch Connectivity Bridge
public class WatchConnectivityManager: NSObject, ObservableObject, WCSessionDelegate {
    public static let shared = WatchConnectivityManager()
    
    @Published public var isWatchConnected: Bool = false
    @Published public var lastSyncedAuslass: String? = nil
    
    private override init() {
        super.init()
        if WCSession.isSupported() {
            let session = WCSession.default
            session.delegate = self
            session.activate()
        }
    }
    
    // Send Auslass / Funk update to Apple Watch Companion
    public func sendUpcomingAuslassToWatch(hall: String, movie: String, minutesRemaining: Int, guests: Int) {
        guard WCSession.isSupported() else { return }
        let session = WCSession.default
        
        let payload: [String: Any] = [
            "type": "auslass_alert",
            "hall": hall,
            "movie": movie,
            "minutes": minutesRemaining,
            "guests": guests,
            "timestamp": Date().timeIntervalSince1970
        ]
        
        if session.isReachable {
            session.sendMessage(payload, replyHandler: nil) { error in
                print("Watch send error: \(error)")
            }
        } else {
            try? session.updateApplicationContext(payload)
        }
        
        DispatchQueue.main.async {
            self.lastSyncedAuslass = "Saal \(hall): \(movie) (\(minutesRemaining) Min)"
        }
    }
    
    // MARK: - WCSessionDelegate
    public func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
        DispatchQueue.main.async {
            self.isWatchConnected = (activationState == .activated && session.isPaired && session.isWatchAppInstalled)
        }
    }
    
    #if os(iOS)
    public func sessionDidBecomeInactive(_ session: WCSession) {}
    public func sessionDidDeactivate(_ session: WCSession) {
        WCSession.default.activate()
    }
    #endif
}
