import WidgetKit
import SwiftUI

// MARK: - Models & Timeline

struct OliMood {
    let imageName: String
    let message: String
}

struct Provider: AppIntentTimelineProvider {
    let moods = [
        OliMood(imageName: "Oli_Success_bgless", message: "Wow, du hast schon 120 XP! Weiter so!"),
        OliMood(imageName: "Oli_2_bgless", message: "Vergiss nicht dein Popcorn-Quiz für heute!"),
        OliMood(imageName: "Oli_3_bgless", message: "Gute Schicht! Zeig dein bestes Lächeln."),
        OliMood(imageName: "Oli_Security_bgless", message: "Sicherheit zuerst! Achte auf Sauberkeit in den Sälen."),
        OliMood(imageName: "Oli_Error_bgless", message: "Schicht bald vorbei? Denk ans Ausloggen!")
    ]
    
    func placeholder(in context: Context) -> OliWidgetEntry {
        OliWidgetEntry(date: Date(), configuration: ConfigurationAppIntent(), mood: moods[0])
    }

    func snapshot(for configuration: ConfigurationAppIntent, in context: Context) async -> OliWidgetEntry {
        OliWidgetEntry(date: Date(), configuration: configuration, mood: moods[0])
    }
    
    func timeline(for configuration: ConfigurationAppIntent, in context: Context) async -> Timeline<OliWidgetEntry> {
        var entries: [OliWidgetEntry] = []
        let currentDate = Date()
        
        // Generate an entry for the next 5 hours with a random Oli mood
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            let randomMood = moods.randomElement() ?? moods[0]
            let entry = OliWidgetEntry(date: entryDate, configuration: configuration, mood: randomMood)
            entries.append(entry)
        }

        return Timeline(entries: entries, policy: .atEnd)
    }
}

struct OliWidgetEntry: TimelineEntry {
    let date: Date
    let configuration: ConfigurationAppIntent
    let mood: OliMood
}

// MARK: - 1. Schicht & XP Widget

struct KinopolisSchichtWidgetEntryView : View {
    var entry: Provider.Entry
    @Environment(\.widgetFamily) var family

    var body: some View {
        ZStack {
            Color(red: 24/255, green: 24/255, blue: 26/255)
            
            if family == .systemSmall {
                smallWidget
            } else {
                mediumWidget
            }
        }
    }
    
    private var smallWidget: some View {
        VStack(spacing: 8) {
            Image("Oli_Success_bgless")
                .resizable()
                .scaledToFit()
                .frame(height: 50)
            
            Text("Level 2")
                .font(.headline)
                .fontWeight(.bold)
                .foregroundColor(.white)
            
            VStack(alignment: .leading) {
                Text("Nächste Schicht:")
                    .font(.caption2)
                    .foregroundColor(.gray)
                Text("Kasse • 16:00")
                    .font(.caption)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
            }
            .padding(8)
            .background(Color.white.opacity(0.1))
            .cornerRadius(8)
        }
        .padding()
    }
    
    private var mediumWidget: some View {
        HStack(spacing: 16) {
            Image("Oli_Success_bgless")
                .resizable()
                .scaledToFit()
                .frame(width: 80, height: 80)
            
            VStack(alignment: .leading, spacing: 6) {
                Text("Level 2 (120 XP)")
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                
                Text("Nächste Schicht:")
                    .font(.caption)
                    .foregroundColor(.gray)
                
                HStack {
                    Rectangle()
                        .fill(Color.blue)
                        .frame(width: 4)
                        .cornerRadius(2)
                    
                    VStack(alignment: .leading) {
                        Text("Kasse")
                            .font(.subheadline)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                        Text("Heute, 16:00 - 23:30")
                            .font(.caption2)
                            .foregroundColor(.gray)
                    }
                }
            }
        }
        .padding()
    }
}

struct KinopolisSchichtWidget: Widget {
    let kind: String = "KinopolisSchichtWidget"
    var body: some WidgetConfiguration {
        AppIntentConfiguration(kind: kind, intent: ConfigurationAppIntent.self, provider: Provider()) { entry in
            KinopolisSchichtWidgetEntryView(entry: entry)
                .containerBackground(Color.clear, for: .widget)
        }
        .configurationDisplayName("Dienst & XP")
        .description("Behalte deine Schichten und dein Level im Blick.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}


// MARK: - 2. Duolingo Motivation Widget

struct KinopolisMotivationWidgetEntryView : View {
    var entry: Provider.Entry
    @Environment(\.widgetFamily) var family

    var body: some View {
        ZStack {
            Color(red: 24/255, green: 24/255, blue: 26/255)
            
            if family == .systemSmall {
                smallWidget
            } else {
                mediumWidget
            }
        }
    }
    
    private var smallWidget: some View {
        VStack(spacing: 8) {
            // Speech Bubble
            ZStack {
                RoundedRectangle(cornerRadius: 16)
                    .fill(Color.white)
                
                Text(entry.mood.message)
                    .font(.caption2)
                    .fontWeight(.bold)
                    .foregroundColor(.black)
                    .multilineTextAlignment(.center)
                    .padding(6)
                    .minimumScaleFactor(0.8)
                
                Path { path in
                    path.move(to: CGPoint(x: 20, y: 0))
                    path.addLine(to: CGPoint(x: 30, y: -10))
                    path.addLine(to: CGPoint(x: 40, y: 0))
                }
                .fill(Color.white)
                .offset(y: 20)
            }
            .frame(height: 50)
            .padding(.horizontal, 8)
            
            Spacer().frame(height: 2)
            
            Image(entry.mood.imageName)
                .resizable()
                .scaledToFit()
                .frame(width: 70, height: 70)
        }
        .padding(.vertical, 10)
    }
    
    private var mediumWidget: some View {
        HStack(spacing: 16) {
            Image(entry.mood.imageName)
                .resizable()
                .scaledToFit()
                .frame(width: 90, height: 90)
                .padding(.leading, 8)
            
            // Speech Bubble
            ZStack {
                RoundedRectangle(cornerRadius: 16)
                    .fill(Color.white)
                
                Text(entry.mood.message)
                    .font(.subheadline)
                    .fontWeight(.bold)
                    .foregroundColor(.black)
                    .minimumScaleFactor(0.8)
                    .padding(12)
                
                // Speech bubble triangle pointing left
                Path { path in
                    path.move(to: CGPoint(x: 0, y: 20))
                    path.addLine(to: CGPoint(x: -12, y: 30))
                    path.addLine(to: CGPoint(x: 0, y: 40))
                }
                .fill(Color.white)
            }
            .padding(.trailing, 12)
            .padding(.vertical, 12)
        }
    }
}

struct KinopolisMotivationWidget: Widget {
    let kind: String = "KinopolisMotivationWidget"
    var body: some WidgetConfiguration {
        AppIntentConfiguration(kind: kind, intent: ConfigurationAppIntent.self, provider: Provider()) { entry in
            KinopolisMotivationWidgetEntryView(entry: entry)
                .containerBackground(Color.clear, for: .widget)
        }
        .configurationDisplayName("Oli's Motivation")
        .description("Lass dich jeden Tag von Oli motivieren!")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}
