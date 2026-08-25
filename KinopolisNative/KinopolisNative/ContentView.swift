import SwiftUI

struct ContentView: View {
    @State private var selectedTab: Tab = .live
    
    enum Tab: String, CaseIterable, Identifiable {
        case live = "Live"
        case funk = "Funk"
        case scanner = "Scanner"
        case action = "Action"
        case mehr = "Mehr"
        
        var id: String { self.rawValue }
        
        var systemImage: String {
            switch self {
            case .live: return "play.rectangle.fill"
            case .funk: return "dot.radiowaves.left.and.right"
            case .scanner: return "qrcode.viewfinder"
            case .action: return "bolt.fill"
            case .mehr: return "line.3.horizontal"
            }
        }
    }
    
    var body: some View {
        // Original Apple UI TabBar
        TabView(selection: $selectedTab) {
            NavigationStack {
                LiveView()
                    .navigationTitle("Live")
            }
            .tabItem {
                Label("Live", systemImage: "play.rectangle.fill")
            }
            .tag(Tab.live)
            
            NavigationStack {
                FunkView()
                    .navigationTitle("Funk")
            }
            .tabItem {
                Label("Funk", systemImage: "dot.radiowaves.left.and.right")
            }
            .tag(Tab.funk)
            
            NavigationStack {
                ScannerView()
                    .navigationTitle("Scanner")
            }
            .tabItem {
                Label("Scanner", systemImage: "qrcode.viewfinder")
            }
            .tag(Tab.scanner)
            
            NavigationStack {
                ActionView()
                    .navigationTitle("Action")
            }
            .tabItem {
                Label("Action", systemImage: "bolt.fill")
            }
            .tag(Tab.action)
            
            NavigationStack {
                MehrView()
                    .navigationTitle("Mehr")
            }
            .tabItem {
                Label("Mehr", systemImage: "line.3.horizontal")
            }
            .tag(Tab.mehr)
        }
        // Use default Apple appearance
        .onAppear {
            let appearance = UITabBarAppearance()
            appearance.configureWithDefaultBackground()
            UITabBar.appearance().scrollEdgeAppearance = appearance
            UITabBar.appearance().standardAppearance = appearance
        }
    }
}

// Minimal placeholders for views not in separate files yet
}

}

}

}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
