import SwiftUI

struct ContentView: View {
    @State private var selectedTab: Tab = .live
    
    // Tab Enum matching the web app
    enum Tab {
        case live, funk, scanner, action, mehr
    }
    
    var body: some View {
        ZStack(alignment: .bottom) {
            // Main Content Area
            Color(red: 24/255, green: 24/255, blue: 26/255)
                .ignoresSafeArea() // Background matching the dark theme
            
            VStack(spacing: 0) {
                // Switching Views
                switch selectedTab {
                case .live:
                    LiveView()
                case .funk:
                    FunkView()
                case .scanner:
                    ScannerView()
                case .action:
                    ActionView()
                case .mehr:
                    MehrView()
                }
                
                Spacer(minLength: 0)
            }
            .padding(.bottom, 80) // Make room for custom tab bar
            
            // Custom Glassmorphism Tab Bar
            CustomTabBar(selectedTab: $selectedTab)
        }
    }
}

// Custom Glassmorphism Tab Bar Component
struct CustomTabBar: View {
    @Binding var selectedTab: ContentView.Tab
    @Namespace private var glassNamespace
    
    var body: some View {
        HStack(spacing: 0) {
            TabBarButton(icon: "play.rectangle.fill", title: "Live", tab: .live, selectedTab: $selectedTab, namespace: glassNamespace)
            TabBarButton(icon: "dot.radiowaves.left.and.right", title: "Funk", tab: .funk, selectedTab: $selectedTab, namespace: glassNamespace)
            TabBarButton(icon: "qrcode.viewfinder", title: "Scanner", tab: .scanner, selectedTab: $selectedTab, namespace: glassNamespace)
            TabBarButton(icon: "bolt.fill", title: "Action", tab: .action, selectedTab: $selectedTab, namespace: glassNamespace)
            TabBarButton(icon: "line.3.horizontal", title: "Mehr", tab: .mehr, selectedTab: $selectedTab, namespace: glassNamespace)
        }
        .padding(.horizontal, 8)
        .frame(height: 60)
        .glassEffect(cornerRadius: 24)
        .padding(.horizontal, 20)
        .padding(.bottom, 16)
    }
}

struct TabBarButton: View {
    let icon: String
    let title: String
    let tab: ContentView.Tab
    @Binding var selectedTab: ContentView.Tab
    let namespace: Namespace.ID
    
    var body: some View {
        Button(action: {
            withAnimation(.spring(response: 0.4, dampingFraction: 0.82)) {
                selectedTab = tab
            }
        }) {
            VStack(spacing: 4) {
                Image(systemName: icon)
                    .font(.system(size: 18))
                Text(title)
                    .font(.system(size: 10, weight: .bold))
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 8)
            .foregroundStyle(selectedTab == tab ? Color.cyan : Color.white.opacity(0.4))
        }
        .buttonStyle(.plain)
        .background {
            if selectedTab == tab {
                Capsule()
                    .fill(Color.white.opacity(0.1))
                    .matchedGeometryEffect(id: "activeTabFallback", in: namespace)
            }
        }
    }
}

struct FunkView: View {
    var body: some View {
        Text("Funk Ansicht").foregroundColor(.white)
    }
}

struct ScannerView: View {
    var body: some View {
        Text("Scanner Ansicht").foregroundColor(.white)
    }
}

struct ActionView: View {
    var body: some View {
        Text("Action Ansicht").foregroundColor(.white)
    }
}

struct MehrView: View {
    var body: some View {
        Text("Mehr Ansicht").foregroundColor(.white)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
