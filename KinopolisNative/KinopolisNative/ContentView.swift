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

// MARK: - Unified App Header Component
struct AppHeaderView<TrailingContent: View>: View {
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
            Image(imageName)
                .resizable()
                .scaledToFit()
                .frame(width: 90, height: 90)
                .clipShape(Circle())
                .shadow(color: Color.black.opacity(0.4), radius: 6, x: 0, y: 3)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(subtitle)
                    .font(.caption)
                    .fontWeight(.medium)
                    .foregroundColor(.gray)
                
                Text(title)
                    .font(.title2)
                    .fontWeight(.heavy)
                    .foregroundColor(.white)
                    .lineLimit(1)
                
                HStack(spacing: 4) {
                    Image(systemName: "mappin.circle.fill")
                        .font(.caption2)
                    Text(LocationData.name(for: selectedLocation))
                        .font(.caption2)
                        .fontWeight(.bold)
                        .lineLimit(1)
                }
                .foregroundColor(.red)
                .padding(.horizontal, 8)
                .padding(.vertical, 3)
                .background(Color.red.opacity(0.15))
                .cornerRadius(6)
            }
            
            Spacer()
            
            trailing
        }
        .padding(.horizontal, 16)
        .padding(.top, 16)
        .padding(.bottom, 4)
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


