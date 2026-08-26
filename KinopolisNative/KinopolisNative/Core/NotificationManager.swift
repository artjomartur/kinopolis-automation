import Foundation
import UserNotifications
import Combine
import SwiftUI

@MainActor
class NotificationManager: ObservableObject {
    static let shared = NotificationManager()
    
    @Published var isAuthorized: Bool = false
    
    private init() {
        checkAuthorization()
    }
    
    func requestAuthorization() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .badge, .sound]) { granted, error in
            DispatchQueue.main.async {
                self.isAuthorized = granted
            }
        }
    }
    
    private func checkAuthorization() {
        UNUserNotificationCenter.current().getNotificationSettings { settings in
            DispatchQueue.main.async {
                self.isAuthorized = settings.authorizationStatus == .authorized
            }
        }
    }
    
    func scheduleNotification(title: String, body: String, timeInterval: TimeInterval) {
        guard isAuthorized else { return }
        
        let content = UNMutableNotificationContent()
        content.title = title
        content.body = body
        content.sound = .default
        
        // Use a time interval (e.g., 5 seconds from now)
        // If timeInterval is <= 0, we can't schedule it. Fallback to 1 second.
        let safeInterval = max(timeInterval, 1.0)
        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: safeInterval, repeats: false)
        
        let request = UNNotificationRequest(
            identifier: UUID().uuidString,
            content: content,
            trigger: trigger
        )
        
        UNUserNotificationCenter.current().add(request) { error in
            if let error = error {
                print("Error scheduling notification: \(error)")
            } else {
                print("Notification scheduled successfully for \(safeInterval) seconds from now.")
            }
        }
    }
    
    func cancelAllNotifications() {
        UNUserNotificationCenter.current().removeAllPendingNotificationRequests()
    }
}
