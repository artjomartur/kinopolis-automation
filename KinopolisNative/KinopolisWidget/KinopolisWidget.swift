//
//  KinopolisWidget.swift
//  KinopolisWidget
//
//  Created by Artjom Becker on 26.08.26.
//

import WidgetKit
import SwiftUI

struct Provider: AppIntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), configuration: ConfigurationAppIntent())
    }

    func snapshot(for configuration: ConfigurationAppIntent, in context: Context) async -> SimpleEntry {
        SimpleEntry(date: Date(), configuration: configuration)
    }
    
    func timeline(for configuration: ConfigurationAppIntent, in context: Context) async -> Timeline<SimpleEntry> {
        var entries: [SimpleEntry] = []

        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate, configuration: configuration)
            entries.append(entry)
        }

        return Timeline(entries: entries, policy: .atEnd)
    }

//    func relevances() async -> WidgetRelevances<ConfigurationAppIntent> {
//        // Generate a list containing the contexts this widget is relevant in.
//    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let configuration: ConfigurationAppIntent
}

struct KinopolisWidgetEntryView : View {
    var entry: Provider.Entry

    // NOTE: To show real data from the app, you need to enable "App Groups"
    // in both targets' Signing & Capabilities, and use UserDefaults(suiteName:).
    // For this prototype, we show a mock "Next Shift" / "XP Level" UI.

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Image(systemName: "star.circle.fill")
                    .foregroundColor(.yellow)
                    .font(.title2)
                
                Text("Level 2")
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
            }
            
            Text("Nächste Schicht:")
                .font(.caption)
                .foregroundColor(.gray)
                .padding(.top, 4)
            
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
                    Text("16:00 - 23:30")
                        .font(.caption2)
                        .foregroundColor(.gray)
                }
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
    }
}

struct KinopolisWidget: Widget {
    let kind: String = "KinopolisWidget"

    var body: some WidgetConfiguration {
        AppIntentConfiguration(kind: kind, intent: ConfigurationAppIntent.self, provider: Provider()) { entry in
            KinopolisWidgetEntryView(entry: entry)
                .containerBackground(Color(red: 24/255, green: 24/255, blue: 26/255), for: .widget)
        }
        .configurationDisplayName("Kinopolis Info")
        .description("Zeigt dein Level und die nächste Schicht.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

extension ConfigurationAppIntent {
    fileprivate static var smiley: ConfigurationAppIntent {
        let intent = ConfigurationAppIntent()
        intent.favoriteEmoji = "😀"
        return intent
    }
    
    fileprivate static var starEyes: ConfigurationAppIntent {
        let intent = ConfigurationAppIntent()
        intent.favoriteEmoji = "🤩"
        return intent
    }
}

#Preview(as: .systemSmall) {
    KinopolisWidget()
} timeline: {
    SimpleEntry(date: .now, configuration: .smiley)
    SimpleEntry(date: .now, configuration: .starEyes)
}
