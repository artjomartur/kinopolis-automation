//
//  KinopolisWidgetLiveActivity.swift
//  KinopolisWidget
//
//  Created by Artjom Becker on 26.08.26.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct KinopolisWidgetAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct KinopolisWidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: KinopolisWidgetAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension KinopolisWidgetAttributes {
    fileprivate static var preview: KinopolisWidgetAttributes {
        KinopolisWidgetAttributes(name: "World")
    }
}

extension KinopolisWidgetAttributes.ContentState {
    fileprivate static var smiley: KinopolisWidgetAttributes.ContentState {
        KinopolisWidgetAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: KinopolisWidgetAttributes.ContentState {
         KinopolisWidgetAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: KinopolisWidgetAttributes.preview) {
   KinopolisWidgetLiveActivity()
} contentStates: {
    KinopolisWidgetAttributes.ContentState.smiley
    KinopolisWidgetAttributes.ContentState.starEyes
}
