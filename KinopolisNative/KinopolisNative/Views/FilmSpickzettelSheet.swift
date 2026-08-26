import SwiftUI
import Combine

// MARK: - Models
struct FilmInfoSpickzettel: Identifiable {
    let id = UUID()
    let title: String
    let fsk: String
    let duration: Int?
    let poster: String?
    let genre: String
    let summary: String
    let hasPostCreditScene: Bool
    let postCreditDescription: String
    let targetAudience: String
    
    var postCreditBadgeColor: Color {
        hasPostCreditScene ? .yellow : .gray
    }
    
    var postCreditBgColor: Color {
        hasPostCreditScene ? Color.yellow.opacity(0.12) : Color.white.opacity(0.03)
    }
    
    var postCreditBorderColor: Color {
        hasPostCreditScene ? Color.yellow.opacity(0.3) : Color.white.opacity(0.06)
    }
    
    var postCreditTitle: String {
        hasPostCreditScene ? "🎬 POST-CREDIT SZENE VORHANDEN" : "KEINE POST-CREDIT SZENE"
    }
    
    var postCreditIcon: String {
        hasPostCreditScene ? "sparkles.tv.fill" : "moon.stars.fill"
    }
}

// MARK: - ViewModel
@MainActor
class FilmSpickzettelViewModel: ObservableObject {
    @Published var movies: [FilmInfoSpickzettel] = []
    @Published var searchQuery = ""
    @Published var isLoading = false
    
    var filteredMovies: [FilmInfoSpickzettel] {
        let q = searchQuery.trimmingCharacters(in: .whitespaces)
        if q.isEmpty {
            return movies
        }
        return movies.filter { item in
            item.title.localizedCaseInsensitiveContains(q) || item.genre.localizedCaseInsensitiveContains(q)
        }
    }
    
    func loadMovieData() async {
        isLoading = true
        let loc = UserDefaults.standard.string(forKey: "selectedLocation") ?? "su"
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        let dateStr = formatter.string(from: Date())
        
        do {
            let halls = try await ScraperManager.shared.fetchSessions(location: loc, dateStr: dateStr)
            var seenTitles = Set<String>()
            var list: [FilmInfoSpickzettel] = []
            
            for hall in halls {
                for session in hall.sessions ?? [] {
                    if !seenTitles.contains(session.title) {
                        seenTitles.insert(session.title)
                        let info = generateSpickzettel(for: session)
                        list.append(info)
                    }
                }
            }
            
            self.movies = list.sorted { $0.title < $1.title }
        } catch {
            print("Spickzettel fetch error: \(error)")
        }
        
        isLoading = false
    }
    
    private func matchesAny(_ text: String, _ keywords: [String]) -> Bool {
        for k in keywords {
            if text.contains(k) { return true }
        }
        return false
    }
    
    private func generateSpickzettel(for session: Session) -> FilmInfoSpickzettel {
        let t = session.title.lowercased()
        
        var postCredit = false
        var postCreditText = "Keine Szene nach dem Abspann. Saallicht kann direkt eingeschaltet werden."
        var genre = "Spielfilm / Drama"
        var summary = "Spannendes Kinoerlebnis im aktuellen Kinopolis Programm."
        var audience = "Für Kinofans & Jugendliche"
        
        if matchesAny(t, ["spider", "marvel", "deadpool", "avenger", "wolverine", "captain", "batman", "superman"]) {
            postCredit = true
            postCreditText = "🎬 1x Mid-Credit Szene + 1x After-Credit Szene ganz am Ende! Gäste bis zum Schwarzbild sitzen lassen."
            genre = "Action / Comic / Sci-Fi"
            summary = "Superhelden-Blockbuster mit rasanter Action, Marvel-Humor und Gastauftritten."
            audience = "Action-Fans, Jugendliche & Comic-Liebhaber"
        } else if matchesAny(t, ["mario", "minion", "alles steht kopf", "vaiana", "moana", "kung fu", "disney", "paw patrol", "ich einfach"]) {
            postCredit = true
            postCreditText = "✨ Kleine witzige Animations-Szene direkt während des bunten Abspanns."
            genre = "Familienfilm / Animation"
            summary = "Farbenfroher Animationsspaß für die ganze Familie mit viel Humor und Herz."
            audience = "Familien, Kinder & Animations-Fans"
        } else if matchesAny(t, ["dune", "odyssee", "gladiator", "joker", "avatar", "oppenheimer"]) {
            postCredit = false
            postCreditText = "Keine Post-Credit-Szene. Musikalischer Ausklang bis zum Schluss."
            genre = "Sci-Fi / Epos / Drama"
            summary = "Monumentales Meisterwerk mit atemberaubenden Bildern und gewaltigem Sound."
            audience = "Filmliebhaber & Fans bildgewaltiger Kino-Erlebnisse"
        } else if matchesAny(t, ["horror", "conjuring", "alien", "smile", "terrif", "saw", "nosferatu", "exorcist"]) {
            postCredit = false
            postCreditText = "Keine Abspannszene. Licht kann nach Beginn des Abspanns gedimmt hochgefahren werden."
            genre = "Horror / Schocker"
            summary = "Düsterer Horror-Thriller mit Schockmomenten und intensiver Grusel-Atmosphäre."
            audience = "Erwachsene & Horror-Fans (Ausweispflicht FSK 16/18 beachten!)"
        }
        
        let fskDisplay = session.fsk ?? "FSK 12"
        
        return FilmInfoSpickzettel(
            title: session.title,
            fsk: fskDisplay,
            duration: session.duration,
            poster: session.poster,
            genre: genre,
            summary: summary,
            hasPostCreditScene: postCredit,
            postCreditDescription: postCreditText,
            targetAudience: audience
        )
    }
}

// MARK: - Main Sheet View
struct FilmSpickzettelSheet: View {
    @Environment(\.dismiss) private var dismiss
    @StateObject private var viewModel = FilmSpickzettelViewModel()
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(red: 20/255, green: 20/255, blue: 22/255).ignoresSafeArea()
                
                VStack(spacing: 0) {
                    searchBar
                    
                    ScrollView {
                        VStack(spacing: 14) {
                            headerInfoBox
                            
                            if viewModel.isLoading && viewModel.movies.isEmpty {
                                loadingView
                            } else if viewModel.filteredMovies.isEmpty {
                                emptyView
                            } else {
                                ForEach(viewModel.filteredMovies) { film in
                                    FilmSpickzettelCard(film: film)
                                }
                                .padding(.horizontal, 16)
                            }
                            
                            Spacer().frame(height: 30)
                        }
                        .padding(.top, 6)
                    }
                }
            }
            .navigationTitle("📖 Film-Spickzettel & FAQ")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Fertig") { dismiss() }
                        .foregroundColor(.red)
                        .fontWeight(.bold)
                }
            }
            .task {
                await viewModel.loadMovieData()
            }
        }
    }
    
    private var searchBar: some View {
        HStack {
            Image(systemName: "magnifyingglass")
                .foregroundColor(.gray)
            TextField("Film oder Genre suchen...", text: $viewModel.searchQuery)
                .foregroundColor(.white)
            if !viewModel.searchQuery.isEmpty {
                Button(action: { viewModel.searchQuery = "" }) {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundColor(.gray)
                }
            }
        }
        .padding(12)
        .background(Color.white.opacity(0.06))
        .cornerRadius(12)
        .padding(.horizontal, 16)
        .padding(.top, 12)
        .padding(.bottom, 8)
    }
    
    private var headerInfoBox: some View {
        HStack(spacing: 12) {
            Image(systemName: "lightbulb.fill")
                .foregroundColor(.yellow)
                .font(.title3)
            VStack(alignment: .leading, spacing: 2) {
                Text("Gästefragen-Spickzettel")
                    .font(.subheadline)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                Text("Kurzinhalte, Zielgruppen & Post-Credit-Check für Kasse, Einlass & Bar.")
                    .font(.caption)
                    .foregroundColor(.gray)
            }
        }
        .padding(12)
        .background(Color.yellow.opacity(0.1))
        .cornerRadius(14)
        .overlay(RoundedRectangle(cornerRadius: 14).stroke(Color.yellow.opacity(0.25), lineWidth: 1))
        .padding(.horizontal, 16)
    }
    
    private var loadingView: some View {
        VStack(spacing: 12) {
            ProgressView()
                .progressViewStyle(CircularProgressViewStyle(tint: .white))
            Text("Lade Filmdaten...")
                .font(.caption)
                .foregroundColor(.gray)
        }
        .padding(.top, 40)
    }
    
    private var emptyView: some View {
        Text("Keine passenden Filme gefunden.")
            .font(.subheadline)
            .foregroundColor(.gray)
            .padding(.top, 40)
    }
}

// MARK: - Film Spickzettel Card
struct FilmSpickzettelCard: View {
    let film: FilmInfoSpickzettel
    
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(alignment: .top, spacing: 12) {
                posterThumbnail
                
                VStack(alignment: .leading, spacing: 4) {
                    Text(film.title)
                        .font(.headline)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .lineLimit(2)
                    
                    HStack(spacing: 6) {
                        Text(film.fsk)
                            .font(.caption2)
                            .fontWeight(.black)
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(Color.red)
                            .foregroundColor(.white)
                            .cornerRadius(4)
                        
                        if let dur = film.duration {
                            Text("\(dur) Min.")
                                .font(.caption2)
                                .foregroundColor(.gray)
                        }
                        
                        Text("• \(film.genre)")
                            .font(.caption2)
                            .foregroundColor(.gray)
                            .lineLimit(1)
                    }
                    
                    Text(film.summary)
                        .font(.caption)
                        .foregroundColor(.white.opacity(0.9))
                        .lineLimit(3)
                        .padding(.top, 2)
                }
            }
            
            Divider().background(Color.white.opacity(0.06))
            
            // Post-Credit Scene Indicator Box
            HStack(spacing: 8) {
                Image(systemName: film.postCreditIcon)
                    .foregroundColor(film.postCreditBadgeColor)
                    .font(.body)
                
                VStack(alignment: .leading, spacing: 1) {
                    Text(film.postCreditTitle)
                        .font(.caption2)
                        .fontWeight(.black)
                        .foregroundColor(film.postCreditBadgeColor)
                    
                    Text(film.postCreditDescription)
                        .font(.system(size: 11))
                        .foregroundColor(.white.opacity(0.85))
                }
            }
            .padding(10)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(film.postCreditBgColor)
            .cornerRadius(10)
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .stroke(film.postCreditBorderColor, lineWidth: 1)
            )
            
            // Target Audience
            HStack(spacing: 4) {
                Text("🎯 Empfohlen für:")
                    .font(.caption2)
                    .foregroundColor(.gray)
                Text(film.targetAudience)
                    .font(.caption2)
                    .fontWeight(.medium)
                    .foregroundColor(.orange)
            }
        }
        .padding(14)
        .background(Color.white.opacity(0.04))
        .cornerRadius(16)
        .overlay(RoundedRectangle(cornerRadius: 16).stroke(Color.white.opacity(0.08), lineWidth: 1))
    }
    
    @ViewBuilder
    private var posterThumbnail: some View {
        if let p = film.poster, let url = URL(string: p) {
            AsyncImage(url: url) { image in
                image.resizable().scaledToFill()
            } placeholder: {
                Color.white.opacity(0.08)
            }
            .frame(width: 55, height: 80)
            .cornerRadius(8)
            .clipped()
        } else {
            RoundedRectangle(cornerRadius: 8)
                .fill(Color.white.opacity(0.08))
                .frame(width: 55, height: 80)
                .overlay(Image(systemName: "film").foregroundColor(.gray))
        }
    }
}
