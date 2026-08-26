//
//  KinopolisNativeApp.swift
//  KinopolisNative
//
//  Created by Artjom Becker on 25.08.26.
//

import SwiftUI
import CoreSpotlight

@main
struct KinopolisNativeApp: App {
    @StateObject private var authManager = AuthManager.shared
    
    var body: some Scene {
        WindowGroup {
            if authManager.isAuthenticated {
                ContentView()
                    .environmentObject(authManager)
                    .onAppear {
                        SpotlightManager.shared.setupFakeSpotlightItems()
                    }
                    .onContinueUserActivity(CSSearchableItemActionType) { userActivity in
                        if let identifier = userActivity.userInfo?[CSSearchableItemActivityIdentifier] as? String {
                            print("Spotlight search tapped: \(identifier)")
                            // Hier könnten wir je nach identifier direkt in den Dienstplan springen
                        }
                    }
            } else {
                LoginView()
                    .environmentObject(authManager)
            }
        }
    }
}
