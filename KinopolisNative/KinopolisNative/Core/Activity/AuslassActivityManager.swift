import Foundation
import SwiftUI
import Combine
import ActivityKit
import UserNotifications

// MARK: - Activity Attributes (Dynamic Island & Lock Screen)
public struct AuslassActivityAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        public var remainingMinutes: Int
        public var isAuslassActive: Bool
        public var progress: Double // 0.0 to 1.0
        
        public init(remainingMinutes: Int, isAuslassActive: Bool, progress: Double) {
            self.remainingMinutes = remainingMinutes
            self.isAuslassActive = isAuslassActive
            self.progress = progress
        }
    }
    
    public var hallName: String
    public var movieTitle: String
    public var guestCount: Int
    public var endTimeString: String
    
    public init(hallName: String, movieTitle: String, guestCount: Int, endTimeString: String) {
        self.hallName = hallName
        self.movieTitle = movieTitle
        self.guestCount = guestCount
        self.endTimeString = endTimeString
    }
}

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
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
            if granted {
                print("Notification permissions granted for Auslass alerts")
            }
        }
    }
    
    public func startAuslassActivity(hallName: String, movieTitle: String, guests: Int, endTime: Date, auslassID: String) {
        let formatter = DateFormatter()
        formatter.dateFormat = "HH:mm"
        let endTimeStr = formatter.string(from: endTime)
        
        let diff = Int(endTime.timeIntervalSinceNow / 60.0)
        let remaining = max(0, diff)
        
        pinnedAuslassID = auslassID
        
        // 1. Schedule local push notification 5 minutes before
        scheduleAuslassReminder(hall: hallName, movie: movieTitle, endTime: endTime)
        
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
        pinnedAuslassID = nil
        if #available(iOS 16.1, *) {
            if let act = currentActivity as? Activity<AuslassActivityAttributes> {
                let finalState = AuslassActivityAttributes.ContentState(
                    remainingMinutes: 0,
                    isAuslassActive: true,
                    progress: 1.0
                )
                Task {
                    await act.end(
                        ActivityContent(state: finalState, staleDate: nil),
                        dismissalPolicy: .immediate
                    )
                }
            }
        }
        currentActivity = nil
        UNUserNotificationCenter.current().removePendingNotificationRequests(withIdentifiers: ["auslass_reminder"])
    }
    
    private func scheduleAuslassReminder(hall: String, movie: String, endTime: Date) {
        let triggerDate = endTime.addingTimeInterval(-300) // 5 minutes before
        guard triggerDate > Date() else { return }
        
        let content = UNMutableNotificationContent()
        content.title = "⏱️ Auslass in 5 Minuten!"
        content.body = "Saal \(hall): \(movie) endet gleich. Bitte Türen für Auslass vorbereiten."
        content.sound = .defaultCritical
        
        let comps = Calendar.current.dateComponents([.year, .month, .day, .hour, .minute, .second], from: triggerDate)
        let trigger = UNCalendarNotificationTrigger(dateMatching: comps, repeats: false)
        let request = UNNotificationRequest(identifier: "auslass_reminder", content: content, trigger: trigger)
        
        UNUserNotificationCenter.current().add(request) { error in
            if let error = error {
                print("Notification schedule error: \(error)")
            }
        }
    }
}
