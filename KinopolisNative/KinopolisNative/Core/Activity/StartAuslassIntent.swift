import AppIntents
import SwiftUI

struct StartAuslassIntent: AppIntent {
    static var title: LocalizedStringResource = "Auslass starten"
    static var description = IntentDescription("Startet den 15-Minuten Auslass-Timer für einen Kinosaal.")
    
    func perform() async throws -> some IntentResult & ProvidesDialog {
        // Start the activity
        await MainActor.run {
            let endTime = Date().addingTimeInterval(15 * 60)
            AuslassActivityManager.shared.startAuslassActivity(
                hallName: "1",
                movieTitle: "Über Siri gestartet",
                guests: 150,
                endTime: endTime,
                auslassID: UUID().uuidString
            )
        }
        
        return .result(dialog: "Alles klar, der Auslass-Timer wurde gestartet!")
    }
}

struct KinopolisShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: StartAuslassIntent(),
            phrases: [
                "Starte den Auslass in \(.applicationName)",
                "Auslass starten in \(.applicationName)"
            ],
            shortTitle: "Auslass starten",
            systemImageName: "timer"
        )
    }
}
