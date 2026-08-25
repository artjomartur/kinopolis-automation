import SwiftUI

struct ContentView: View {
    @State private var selectedTab: Tab = .live
    
    // Tab Enum matching the web app
    enum Tab {
        case live, funk, scanner, action, mehr
    }
    
    var body: some View {
        ZStack {
            // Main Content Area
            Color(red: 24/255, green: 24/255, blue: 26/255)
                .ignoresSafeArea() // Background matching the dark theme
            
            VStack {
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
            VStack {
                Spacer()
                CustomTabBar(selectedTab: $selectedTab)
            }
            .ignoresSafeArea(.keyboard, edges: .bottom)
        }
    }
}

// Custom Glassmorphism Tab Bar Component
struct CustomTabBar: View {
    @Binding var selectedTab: ContentView.Tab
    
    var body: some View {
        HStack {
            TabBarButton(icon: "play.rectangle.fill", title: "Live", tab: .live, selectedTab: $selectedTab)
            TabBarButton(icon: "dot.radiowaves.left.and.right", title: "Funk", tab: .funk, selectedTab: $selectedTab)
            TabBarButton(icon: "qrcode.viewfinder", title: "Scanner", tab: .scanner, selectedTab: $selectedTab)
            TabBarButton(icon: "bolt.fill", title: "Action", tab: .action, selectedTab: $selectedTab)
            TabBarButton(icon: "line.3.horizontal", title: "Mehr", tab: .mehr, selectedTab: $selectedTab)
        }
        .padding(.horizontal, 12)
        .frame(height: 68)
        .background(
            RoundedRectangle(cornerRadius: 34, style: .continuous)
                .fill(Color(white: 0.16).opacity(0.7))
                .background(
                    RoundedRectangle(cornerRadius: 34, style: .continuous)
                        .stroke(Color.white.opacity(0.08), lineWidth: 1)
                )
        )
        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 34, style: .continuous))
        .shadow(color: Color.black.opacity(0.4), radius: 24, x: 0, y: 24)
        .padding(.horizontal, 32)
        .padding(.bottom, 16)
    }
}

struct TabBarButton: View {
    let icon: String
    let title: String
    let tab: ContentView.Tab
    @Binding var selectedTab: ContentView.Tab
    
    var body: some View {
        Button(action: {
            withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                selectedTab = tab
            }
        }) {
            VStack(spacing: 4) {
                Image(systemName: icon)
                    .font(.system(size: 20, weight: selectedTab == tab ? .bold : .medium))
                    .scaleEffect(selectedTab == tab ? 1.1 : 1.0)
                
                Text(title)
                    .font(.system(size: 10, weight: selectedTab == tab ? .semibold : .medium))
            }
            .foregroundColor(selectedTab == tab ? .white : .white.opacity(0.4))
            .frame(maxWidth: .infinity)
        }
    }
}

// Placeholder Views
struct LiveView: View {
    var body: some View {
        Text("Live Ansicht").foregroundColor(.white)
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
