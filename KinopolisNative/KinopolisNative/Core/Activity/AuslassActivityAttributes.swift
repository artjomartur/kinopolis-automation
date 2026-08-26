import Foundation
import ActivityKit

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
