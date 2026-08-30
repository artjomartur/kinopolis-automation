import SwiftUI

struct ContentView: View {
    @State private var selectedTab: Tab = .live
    @State private var showShakeReport = false
    
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
        ZStack {
            TabView(selection: $selectedTab) {
            LiveView()
                .tabItem {
                    Label("Live", systemImage: "play.rectangle.fill")
                }
                .tag(Tab.live)
            
            FunkView()
                .tabItem {
                    Label("Funk", systemImage: "dot.radiowaves.left.and.right")
                }
                .tag(Tab.funk)
            
            ScannerView()
                .tabItem {
                    Label("Scanner", systemImage: "qrcode.viewfinder")
                }
                .tag(Tab.scanner)
            
            ActionView()
                .tabItem {
                    Label("Action", systemImage: "bolt.fill")
                }
                .tag(Tab.action)
            
            MehrView()
                .tabItem {
                    Label("Mehr", systemImage: "line.3.horizontal")
                }
                .tag(Tab.mehr)
        }
        .simultaneousGesture(
            DragGesture()
                .onEnded { value in
                    let translationX = value.translation.width
                    let translationY = value.translation.height
                    
                    // Trigger if horizontal swipe > 80px and mostly horizontal
                    if abs(translationX) > 80 && abs(translationX) > abs(translationY) * 1.5 {
                        let allTabs = Tab.allCases
                        guard let currentIndex = allTabs.firstIndex(of: selectedTab) else { return }
                        
                        withAnimation {
                            if translationX < 0 && currentIndex < allTabs.count - 1 {
                                // Swiped left -> Next tab
                                selectedTab = allTabs[currentIndex + 1]
                            } else if translationX > 0 && currentIndex > 0 {
                                // Swiped right -> Previous tab
                                selectedTab = allTabs[currentIndex - 1]
                            }
                        }
                    }
                }
        )
        // Use default Apple appearance
        .onAppear {
            let appearance = UITabBarAppearance()
            appearance.configureWithDefaultBackground()
            UITabBar.appearance().scrollEdgeAppearance = appearance
            UITabBar.appearance().standardAppearance = appearance
        }
        .onShake {
            let generator = UINotificationFeedbackGenerator()
            generator.notificationOccurred(.warning)
            showShakeReport = true
        }
        .sheet(isPresented: $showShakeReport) {
            ShakeReportView()
        }
        }
    }
}

// Dummy View for the Shake Report
struct ShakeReportView: View {
    @Environment(\.presentationMode) var presentationMode
    @State private var reportText = ""
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Was ist passiert?")) {
                    TextEditor(text: $reportText)
                        .frame(height: 150)
                }
            }
            .navigationTitle("Problem melden")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Abbrechen") { presentationMode.wrappedValue.dismiss() }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Senden") { presentationMode.wrappedValue.dismiss() }
                        .fontWeight(.bold)
                }
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

// MARK: - Master App Header Component (Scroll-driven Collapsing & Distinct Mascots)
struct MasterHeaderView<TrailingContent: View>: View {
    let imageName: String
    let subtitle: String
    let title: String
    let shortTitle: String
    var isCollapsed: Bool = false
    let trailing: TrailingContent
    
    @AppStorage("selectedLocation") private var selectedLocation = "su"
    
    init(
        imageName: String = "Oli",
        subtitle: String,
        title: String,
        shortTitle: String,
        isCollapsed: Bool = false,
        @ViewBuilder trailing: () -> TrailingContent = { EmptyView() }
    ) {
        self.imageName = imageName
        self.subtitle = subtitle
        self.title = title
        self.shortTitle = shortTitle
        self.isCollapsed = isCollapsed
        self.trailing = trailing()
    }
    
    var body: some View {
        HStack(spacing: isCollapsed ? 12 : 16) {
            // Standardized Avatar with fixed geometry & smooth size transition
            ZStack {
                Circle()
                    .fill(Color.primary.opacity(0.08))
                    .frame(width: isCollapsed ? 38 : 78, height: isCollapsed ? 38 : 78)
                
                Image(imageName)
                    .resizable()
                    .scaledToFill()
                    .frame(width: isCollapsed ? 36 : 74, height: isCollapsed ? 36 : 74)
                    .clipShape(Circle())
            }
            .frame(width: isCollapsed ? 38 : 78, height: isCollapsed ? 38 : 78)
            .shadow(color: Color.black.opacity(0.35), radius: isCollapsed ? 3 : 6, x: 0, y: 2)
            
            // Text Column (Smoothly collapses on scroll)
            VStack(alignment: .leading, spacing: isCollapsed ? 2 : 4) {
                if !isCollapsed {
                    Text(subtitle)
                        .font(.system(size: 13, weight: .medium))
                        .foregroundColor(.gray)
                        .lineLimit(1)
                        .transition(.opacity.combined(with: .move(edge: .top)))
                }
                
                Text(isCollapsed ? shortTitle : title)
                    .font(.system(size: isCollapsed ? 18 : 22, weight: .heavy))
                    .foregroundColor(.primary)
                    .lineLimit(1)
                
                HStack(spacing: 4) {
                    Image(systemName: "mappin.circle.fill")
                        .font(.system(size: 9))
                    Text(LocationData.name(for: selectedLocation))
                        .font(.system(size: 10, weight: .bold))
                        .lineLimit(1)
                }
                .foregroundColor(.red)
                .padding(.horizontal, 7)
                .padding(.vertical, 2.5)
                .background(Color.red.opacity(0.15))
                .cornerRadius(6)
            }
            
            Spacer(minLength: 8)
            
            trailing
        }
        .padding(.horizontal, 16)
        .padding(.top, isCollapsed ? 6 : 12)
        .padding(.bottom, isCollapsed ? 6 : 10)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            Color(UIColor.systemBackground)
                .shadow(color: Color.black.opacity(isCollapsed ? 0.35 : 0), radius: 6, x: 0, y: 3)
        )
        .animation(.easeInOut(duration: 0.22), value: isCollapsed)
    }
}

typealias AppHeaderView = MasterHeaderView

struct ScrollOffsetPreferenceKey: PreferenceKey {
    static var defaultValue: CGFloat = 0
    static func reduce(value: inout CGFloat, nextValue: () -> CGFloat) {
        value = nextValue()
    }
}

// MARK: - Location Models & Helpers
struct KinopolisLocation: Identifiable, Hashable {
    let slug: String
    let name: String
    var id: String { slug }
}

struct LocationData {
    static let all: [KinopolisLocation] = [
        KinopolisLocation(slug: "su", name: "Sulzbach / Main-Taunus (MTZ)"),
        KinopolisLocation(slug: "ab", name: "Aschaffenburg"),
        KinopolisLocation(slug: "bh", name: "Bad Homburg"),
        KinopolisLocation(slug: "bn", name: "Bonn"),
        KinopolisLocation(slug: "kp", name: "KINOPOLIS Darmstadt"),
        KinopolisLocation(slug: "cd", name: "Citydome Darmstadt"),
        KinopolisLocation(slug: "rx", name: "Rex Kinos Darmstadt"),
        KinopolisLocation(slug: "fr", name: "Freiberg"),
        KinopolisLocation(slug: "gi", name: "Gießen: Kinocenter"),
        KinopolisLocation(slug: "kg", name: "Gießen: KINOPOLIS"),
        KinopolisLocation(slug: "hh", name: "Hamburg HafenCity"),
        KinopolisLocation(slug: "hu", name: "Hanau: KINOPOLIS"),
        KinopolisLocation(slug: "ka", name: "Karlsruhe: Universum-City"),
        KinopolisLocation(slug: "ko", name: "Koblenz: KINOPOLIS"),
        KinopolisLocation(slug: "lh", name: "Landshut: KINOPOLIS"),
        KinopolisLocation(slug: "mg", name: "Mönchengladbach"),
        KinopolisLocation(slug: "vi", name: "Rhein-Neckar / Viernheim (RNZ)"),
        KinopolisLocation(slug: "ro", name: "Rosenheim: KINOPOLIS")
    ]
    
    static func name(for slug: String) -> String {
        all.first(where: { $0.slug.lowercased() == slug.lowercased() })?.name ?? slug.uppercased()
    }
}


