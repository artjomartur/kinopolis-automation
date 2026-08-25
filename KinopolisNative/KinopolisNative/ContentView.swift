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
        // Use default Apple appearance
        .onAppear {
            let appearance = UITabBarAppearance()
            appearance.configureWithDefaultBackground()
            UITabBar.appearance().scrollEdgeAppearance = appearance
            UITabBar.appearance().standardAppearance = appearance
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

// MARK: - Master App Header Component (100% Identical in Geometry Across All Tabs)
struct MasterHeaderView<TrailingContent: View>: View {
    let imageName: String
    let subtitle: String
    let title: String
    let trailing: TrailingContent
    
    @AppStorage("selectedLocation") private var selectedLocation = "su"
    
    init(
        imageName: String = "Oli",
        subtitle: String,
        title: String,
        @ViewBuilder trailing: () -> TrailingContent = { EmptyView() }
    ) {
        self.imageName = imageName
        self.subtitle = subtitle
        self.title = title
        self.trailing = trailing()
    }
    
    var body: some View {
        HStack(spacing: 16) {
            // Fixed Avatar Frame with circular dark badge
            ZStack {
                Circle()
                    .fill(Color.white.opacity(0.06))
                    .frame(width: 82, height: 82)
                
                Image(imageName)
                    .resizable()
                    .scaledToFit()
                    .frame(width: 80, height: 80)
                    .clipShape(Circle())
            }
            .frame(width: 82, height: 82)
            .shadow(color: Color.black.opacity(0.4), radius: 6, x: 0, y: 3)
            
            // Standardized Text Column
            VStack(alignment: .leading, spacing: 4) {
                Text(subtitle)
                    .font(.system(size: 13, weight: .medium))
                    .foregroundColor(.gray)
                    .lineLimit(1)
                
                Text(title)
                    .font(.system(size: 22, weight: .heavy))
                    .foregroundColor(.white)
                    .lineLimit(1)
                
                HStack(spacing: 5) {
                    Image(systemName: "mappin.circle.fill")
                        .font(.system(size: 10))
                    Text(LocationData.name(for: selectedLocation))
                        .font(.system(size: 11, weight: .bold))
                        .lineLimit(1)
                }
                .foregroundColor(.red)
                .padding(.horizontal, 8)
                .padding(.vertical, 3)
                .background(Color.red.opacity(0.15))
                .cornerRadius(6)
            }
            
            Spacer(minLength: 8)
            
            trailing
        }
        .padding(.horizontal, 16)
        .padding(.top, 12)
        .padding(.bottom, 12)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color(red: 24/255, green: 24/255, blue: 26/255))
    }
}

typealias AppHeaderView = MasterHeaderView

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


