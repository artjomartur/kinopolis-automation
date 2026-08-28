//
//  KinopolisWidgetLiveActivity.swift
//  KinopolisWidget
//
//  Created by Artjom Becker on 26.08.26.
//

import ActivityKit
import WidgetKit
import SwiftUI

// NOTE: To compile this, AuslassActivityAttributes must be available to the Widget Extension.
// The user needs to add AuslassActivityManager.swift to the Widget target's membership in Xcode.

struct KinopolisWidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: AuslassActivityAttributes.self) { context in
            // Lock screen/banner UI
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Image(systemName: "film.fill")
                        .foregroundColor(.blue)
                    Text("Auslass: Saal \(context.attributes.hallName)")
                        .font(.headline)
                        .fontWeight(.bold)
                    Spacer()
                    Text(context.state.remainingMinutes > 0 ? "in \(context.state.remainingMinutes) Min" : "Jetzt!")
                        .font(.subheadline)
                        .fontWeight(.bold)
                        .foregroundColor(context.state.remainingMinutes <= 5 ? .red : .primary)
                        .contentTransition(.numericText())
                }
                
                HStack {
                    Text(context.attributes.movieTitle)
                        .font(.subheadline)
                        .foregroundColor(.gray)
                    Spacer()
                    Image(systemName: "person.3.fill")
                        .foregroundColor(.gray)
                        .font(.caption)
                    Text("\(context.attributes.guestCount)")
                        .font(.caption)
                        .foregroundColor(.gray)
                }
                
                ProgressView(value: context.state.progress)
                    .tint(context.state.remainingMinutes <= 5 ? .red : .blue)
            }
            .padding()
            .activityBackgroundTint(Color.black.opacity(0.8))
            .activitySystemActionForegroundColor(Color.white)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.
                DynamicIslandExpandedRegion(.leading) {
                    VStack(alignment: .leading) {
                        Text("Saal \(context.attributes.hallName)")
                            .font(.headline)
                            .foregroundColor(.white)
                        Text(context.attributes.movieTitle)
                            .font(.caption)
                            .foregroundColor(.gray)
                            .lineLimit(1)
                    }
                }
                DynamicIslandExpandedRegion(.trailing) {
                    VStack(alignment: .trailing) {
                        Text(context.state.remainingMinutes > 0 ? "\(context.state.remainingMinutes) Min" : "Jetzt")
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundColor(context.state.remainingMinutes <= 5 ? .red : .blue)
                            .contentTransition(.numericText())
                    }
                }
                DynamicIslandExpandedRegion(.bottom) {
                    ProgressView(value: context.state.progress)
                        .tint(context.state.remainingMinutes <= 5 ? .red : .blue)
                        .padding(.top, 8)
                }
            } compactLeading: {
                HStack(spacing: 4) {
                    Image(systemName: "film.fill")
                        .foregroundColor(.blue)
                    Text(context.attributes.hallName)
                        .fontWeight(.bold)
                }
            } compactTrailing: {
                Text(context.state.remainingMinutes > 0 ? "\(context.state.remainingMinutes)m" : "0m")
                    .foregroundColor(context.state.remainingMinutes <= 5 ? .red : .white)
                    .contentTransition(.numericText())
            } minimal: {
                Image(systemName: "film.fill")
                    .foregroundColor(.blue)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.blue)
        }
    }
}

extension AuslassActivityAttributes {
    fileprivate static var preview: AuslassActivityAttributes {
        AuslassActivityAttributes(hallName: "7", movieTitle: "Deadpool & Wolverine", guestCount: 154, endTimeString: "22:15")
    }
}

extension AuslassActivityAttributes.ContentState {
    fileprivate static var active: AuslassActivityAttributes.ContentState {
        AuslassActivityAttributes.ContentState(remainingMinutes: 12, isAuslassActive: true, progress: 0.8)
     }
     
     fileprivate static var ending: AuslassActivityAttributes.ContentState {
         AuslassActivityAttributes.ContentState(remainingMinutes: 3, isAuslassActive: true, progress: 0.95)
     }
}

#Preview("Notification", as: .content, using: AuslassActivityAttributes.preview) {
   KinopolisWidgetLiveActivity()
} contentStates: {
    AuslassActivityAttributes.ContentState.active
    AuslassActivityAttributes.ContentState.ending
}
