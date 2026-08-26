import Foundation
import SwiftUI
import Combine
import ActivityKit
import UserNotifications



// MARK: - Manager
@MainActor
public class AuslassActivityManager: ObservableObject {
    public static let shared = AuslassActivityManager()
    
    @Published public var pinnedAuslassID: String? = nil
    private var currentActivity: Any? = nil
    
    private init() {
        requestNotificationPermissions()
    }
    
    public func requestNotificationPermissions() {
        NotificationManager.shared.requestAuthorization()
    }
    
    public func startAuslassActivity(hallName: String, movieTitle: String, guests: Int, endTime: Date, auslassID: String) {
        let formatter = DateFormatter()
        formatter.dateFormat = "HH:mm"
        let endTimeStr = formatter.string(from: endTime)
        
        let diff = Int(endTime.timeIntervalSinceNow / 60.0)
        let remaining = max(0, diff)
        
        pinnedAuslassID = auslassID
        
        // 1. Schedule local push notification 5 minutes before
        scheduleAuslassNotification(for: hallName, movie: movieTitle, endTime: endTime)
        
        // 2. ActivityKit Live Activity (iOS 16.1+)
        if #available(iOS 16.1, *) {
            if ActivityAuthorizationInfo().areActivitiesEnabled {
                let attributes = AuslassActivityAttributes(
                    hallName: hallName,
                    movieTitle: movieTitle,
                    guestCount: guests,
                    endTimeString: endTimeStr
                )
                
                let state = AuslassActivityAttributes.ContentState(
                    remainingMinutes: remaining,
                    isAuslassActive: remaining <= 0,
                    progress: min(1.0, max(0.0, 1.0 - (Double(remaining) / 120.0)))
                )
                
                do {
                    // Stop any existing activity first
                    stopCurrentActivity()
                    
                    let activity = try Activity<AuslassActivityAttributes>.request(
                        attributes: attributes,
                        content: .init(state: state, staleDate: endTime.addingTimeInterval(1800))
                    )
                    self.currentActivity = activity
                    print("Live Activity started for Saal \(hallName)")
                } catch {
                    print("Failed to start Live Activity: \(error)")
                }
            }
        }
        
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.success)
    }
    
    public func stopCurrentActivity() {
        self.pinnedAuslassID = nil
        if #available(iOS 16.1, *) {
            if let act = self.currentActivity as? Activity<AuslassActivityAttributes> {
                let finalState = AuslassActivityAttributes.ContentState(
                    remainingMinutes: 0,
                    isAuslassActive: false,
                    progress: 1.0
                )
                let content = ActivityContent(state: finalState, staleDate: nil)
                
                Task {
                    await act.end(content, dismissalPolicy: .immediate)
                }
            }
        }
        self.currentActivity = nil
        NotificationManager.shared.cancelAllNotifications()
    }
    
    private func scheduleAuslassNotification(for hall: String, movie: String, endTime: Date) {
        let timeUntilEnd = endTime.timeIntervalSinceNow
        
        // Push notification 5 minutes before end
        let notifyTimeInterval = timeUntilEnd - (5 * 60)
        
        if notifyTimeInterval > 0 {
            NotificationManager.shared.scheduleNotification(
                title: "Baldiger Auslass: Saal \(hall)",
                body: "Der Film '\(movie)' endet in 5 Minuten! Bitte bereithalten.",
                timeInterval: notifyTimeInterval
            )
        } else {
            // If already less than 5 minutes, notify immediately
            NotificationManager.shared.scheduleNotification(
                title: "Auslass läuft: Saal \(hall)",
                body: "Der Film '\(movie)' endet in Kürze oder ist bereits zu Ende.",
                timeInterval: 1.0
            )
        }
    }
}
