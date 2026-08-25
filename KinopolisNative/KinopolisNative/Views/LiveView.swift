import SwiftUI

// MARK: - Models
struct HallData: Codable, Identifiable {
    let id = UUID()
    let hall: String
    let sessions: [Session]?
    
    enum CodingKeys: String, CodingKey {
        case hall
        case sessions
    }
}

struct Session: Codable, Identifiable {
    let id = UUID()
    let title: String
    let time: String
    let sold: Int?
    let capacity: Int?
    
    enum CodingKeys: String, CodingKey {
        case title
        case time
        case sold
        case capacity
    }
}

// MARK: - View Model
@MainActor
class LiveViewModel: ObservableObject {
    @Published var halls: [HallData] = []
    @Published var isLoading = false
    @Published var errorMessage: String? = nil
    
    func fetchSessions() async {
        isLoading = true
        errorMessage = nil
        
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        let dateStr = formatter.string(from: Date())
        
        let endpoint = "/sessions?location=su&date=\(dateStr)" // Default location 'su' for now
        
        do {
            let fetchedHalls: [HallData] = try await NetworkManager.shared.fetch(endpoint: endpoint)
            self.halls = fetchedHalls
        } catch {
            self.errorMessage = "Fehler beim Laden der Live-Daten."
            print("Fetch Error: \(error)")
        }
        
        isLoading = false
    }
}

// MARK: - View
struct LiveView: View {
    @StateObject private var viewModel = LiveViewModel()
    @EnvironmentObject var authManager: AuthManager
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(red: 24/255, green: 24/255, blue: 26/255).ignoresSafeArea()
                
                ScrollView {
                    VStack(alignment: .leading, spacing: 20) {
                        
                        // Header
                        HStack {
                            VStack(alignment: .leading) {
                                Text("Willkommen zurück,")
                                    .font(.subheadline)
                                    .foregroundColor(.gray)
                                Text(authManager.currentUser?.name ?? "Gast")
                                    .font(.title)
                                    .fontWeight(.bold)
                                    .foregroundColor(.white)
                            }
                            Spacer()
                            
                            Button(action: {
                                Task { await viewModel.fetchSessions() }
                            }) {
                                Image(systemName: "arrow.triangle.2.circlepath")
                                    .font(.title2)
                                    .foregroundColor(.white)
                                    .padding(10)
                                    .background(Color.white.opacity(0.1))
                                    .clipShape(Circle())
                            }
                        }
                        .padding(.horizontal)
                        .padding(.top, 10)
                        
                        if viewModel.isLoading && viewModel.halls.isEmpty {
                            ProgressView()
                                .progressViewStyle(CircularProgressViewStyle(tint: .white))
                                .frame(maxWidth: .infinity, alignment: .center)
                                .padding(.top, 50)
                        } else if let error = viewModel.errorMessage {
                            Text(error)
                                .foregroundColor(.red)
                                .padding()
                        } else {
                            // Sessions List
                            ForEach(viewModel.halls) { hall in
                                if let sessions = hall.sessions, !sessions.isEmpty {
                                    VStack(alignment: .leading, spacing: 12) {
                                        Text("Saal \(hall.hall)")
                                            .font(.headline)
                                            .foregroundColor(.white)
                                            .padding(.horizontal)
                                        
                                        ScrollView(.horizontal, showsIndicators: false) {
                                            HStack(spacing: 16) {
                                                ForEach(sessions) { session in
                                                    SessionCard(session: session)
                                                }
                                            }
                                            .padding(.horizontal)
                                        }
                                    }
                                    .padding(.bottom, 10)
                                }
                            }
                        }
                    }
                    .padding(.bottom, 100) // Padding for Tab Bar
                }
            }
            .navigationBarHidden(true)
            .task {
                await viewModel.fetchSessions()
            }
        }
    }
}

struct SessionCard: View {
    let session: Session
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(session.time)
                .font(.caption)
                .fontWeight(.bold)
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(Color.blue.opacity(0.2))
                .foregroundColor(.blue)
                .cornerRadius(8)
            
            Text(session.title)
                .font(.headline)
                .foregroundColor(.white)
                .lineLimit(2)
                .frame(height: 45, alignment: .topLeading)
            
            HStack {
                Image(systemName: "person.fill")
                    .foregroundColor(.gray)
                Text("\(session.sold ?? 0) / \(session.capacity ?? 0)")
                    .font(.subheadline)
                    .foregroundColor(.gray)
            }
        }
        .padding()
        .frame(width: 200)
        .background(Color.white.opacity(0.05))
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color.white.opacity(0.1), lineWidth: 1)
        )
    }
}

struct LiveView_Previews: PreviewProvider {
    static var previews: some View {
        LiveView().environmentObject(AuthManager.shared)
    }
}
