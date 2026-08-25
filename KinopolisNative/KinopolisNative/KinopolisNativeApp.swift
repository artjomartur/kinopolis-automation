//
//  KinopolisNativeApp.swift
//  KinopolisNative
//
//  Created by Artjom Becker on 25.08.26.
//

import SwiftUI

@main
struct KinopolisNativeApp: App {
    @StateObject private var authManager = AuthManager.shared
    
    var body: some Scene {
        WindowGroup {
            if authManager.isAuthenticated {
                ContentView()
                    .environmentObject(authManager)
            } else {
                LoginView()
                    .environmentObject(authManager)
            }
        }
    }
}
