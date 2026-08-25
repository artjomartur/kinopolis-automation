import SwiftUI
import Combine

struct LostItem: Codable, Identifiable {
    let id: Int
    let location: String?
    let what: String
    let category: String
    let found_where: String
    let found_by: String
    let image_url: String?
    let created_at: String?
}

@MainActor
class FundbueroViewModel: ObservableObject {
    @Published var items: [LostItem] = []
    @Published var isLoading = false
    @Published var errorMessage: String? = nil
    
    func fetchItems() async {
        isLoading = true
        errorMessage = nil
        let location = UserDefaults.standard.string(forKey: "selectedLocation") ?? "su"
        guard let url = URL(string: "https://kinopolis.artjombecker.com/api/lost-found?location=\(location)") else { return }
        
        do {
            let (data, response) = try await URLSession.shared.data(from: url)
            if let http = response as? HTTPURLResponse, http.statusCode == 200 {
                let decoded = try JSONDecoder().decode([LostItem].self, from: data)
                self.items = decoded
            }
        } catch {
            print("Lost and found fetch error: \(error)")
        }
        isLoading = false
    }
    
    func createItem(what: String, category: String, whereFound: String, byUser: String) async -> Bool {
        let location = UserDefaults.standard.string(forKey: "selectedLocation") ?? "su"
        guard let url = URL(string: "https://kinopolis.artjombecker.com/api/lost-found") else { return false }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body: [String: Any] = [
            "location": location,
            "what": what,
            "category": category,
            "found_where": whereFound,
            "found_by": byUser
        ]
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)
        
        do {
            let (_, response) = try await URLSession.shared.data(for: request)
            if let http = response as? HTTPURLResponse, (http.statusCode == 200 || http.statusCode == 201) {
                await fetchItems()
                return true
            }
        } catch {
            print("Create item error: \(error)")
        }
        return false
    }
    
    func deleteItem(id: Int) async {
        guard let url = URL(string: "https://kinopolis.artjombecker.com/api/lost-found/\(id)") else { return }
        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"
        
        _ = try? await URLSession.shared.data(for: request)
        await fetchItems()
    }
}

struct FundbueroView: View {
    @StateObject private var viewModel = FundbueroViewModel()
    @EnvironmentObject var authManager: AuthManager
    @Environment(\.presentationMode) var presentationMode
    
    @State private var showAddSheet = false
    @State private var newWhat = ""
    @State private var newCategory = "📱 Wertsachen"
    @State private var newWhere = ""
    @State private var selectedFilter = "Alle"
    
    let categories = ["📱 Wertsachen", "🧥 Kleidung", "🔑 Schlüssel", "🎒 Taschen", "📦 Sonstiges"]
    
    var filteredItems: [LostItem] {
        if selectedFilter == "Alle" {
            return viewModel.items
        }
        return viewModel.items.filter { $0.category.contains(selectedFilter) || selectedFilter.contains($0.category) }
    }
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(red: 24/255, green: 24/255, blue: 26/255).ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: 20) {
                        // Header Banner
                        HStack {
                            VStack(alignment: .leading, spacing: 4) {
                                Text("🎒 Digitales Fundbüro")
                                    .font(.title2)
                                    .fontWeight(.bold)
                                    .foregroundColor(.white)
                                Text("Gefundene Gegenstände erfassen & verwalten")
                                    .font(.caption)
                                    .foregroundColor(.gray)
                            }
                            Spacer()
                            
                            Button(action: { showAddSheet = true }) {
                                HStack(spacing: 6) {
                                    Image(systemName: "plus")
                                        .font(.subheadline)
                                    Text("Fundsache")
                                        .font(.subheadline)
                                        .fontWeight(.bold)
                                }
                                .padding(.horizontal, 14)
                                .padding(.vertical, 8)
                                .background(Color.red)
                                .foregroundColor(.white)
                                .cornerRadius(12)
                            }
                        }
                        .padding(.horizontal)
                        .padding(.top, 16)
                        
                        // Category Filter
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(spacing: 10) {
                                FilterChip(title: "Alle", selected: $selectedFilter)
                                ForEach(categories, id: \.self) { cat in
                                    FilterChip(title: cat, selected: $selectedFilter)
                                }
                            }
                            .padding(.horizontal)
                        }
                        
                        // List
                        if viewModel.isLoading && viewModel.items.isEmpty {
                            ProgressView()
                                .progressViewStyle(CircularProgressViewStyle(tint: .white))
                                .padding(.top, 40)
                        } else if filteredItems.isEmpty {
                            VStack(spacing: 12) {
                                Image(systemName: "tray.fill")
                                    .font(.system(size: 40))
                                    .foregroundColor(.gray)
                                Text("Aktuell keine Fundsachen erfasst")
                                    .font(.headline)
                                    .foregroundColor(.gray)
                                Text("Neu gefundene Gegenstände können oben rechts eingetragen werden.")
                                    .font(.caption)
                                    .foregroundColor(.gray.opacity(0.8))
                                    .multilineTextAlignment(.center)
                                    .padding(.horizontal, 30)
                            }
                            .frame(maxWidth: .infinity)
                            .padding(.top, 50)
                        } else {
                            VStack(spacing: 12) {
                                ForEach(filteredItems) { item in
                                    LostItemCard(item: item, onResolve: {
                                        Task {
                                            await viewModel.deleteItem(id: item.id)
                                        }
                                    })
                                }
                            }
                            .padding(.horizontal)
                        }
                    }
                    .padding(.bottom, 60)
                }
            }
            .navigationTitle("Fundbüro")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Schließen") {
                        presentationMode.wrappedValue.dismiss()
                    }
                    .foregroundColor(.white)
                }
            }
            .task {
                await viewModel.fetchItems()
            }
            .sheet(isPresented: $showAddSheet) {
                AddLostItemSheet(
                    what: $newWhat,
                    category: $newCategory,
                    whereFound: $newWhere,
                    categories: categories,
                    onSave: {
                        let finder = authManager.currentUser?.name ?? "Mitarbeiter"
                        Task {
                            let success = await viewModel.createItem(
                                what: newWhat,
                                category: newCategory,
                                whereFound: newWhere,
                                byUser: finder
                            )
                            if success {
                                newWhat = ""
                                newWhere = ""
                                showAddSheet = false
                            }
                        }
                    }
                )
            }
        }
    }
}

struct LostItemCard: View {
    let item: LostItem
    let onResolve: () -> Void
    
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack {
                Text(item.category)
                    .font(.caption)
                    .fontWeight(.bold)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.white.opacity(0.1))
                    .foregroundColor(.white)
                    .cornerRadius(6)
                
                Spacer()
                
                if let created = item.created_at {
                    Text(created.prefix(10))
                        .font(.caption2)
                        .foregroundColor(.gray)
                }
            }
            
            Text(item.what)
                .font(.headline)
                .fontWeight(.bold)
                .foregroundColor(.white)
            
            HStack(spacing: 14) {
                HStack(spacing: 4) {
                    Image(systemName: "mappin.and.ellipse")
                        .foregroundColor(.red)
                        .font(.caption)
                    Text(item.found_where)
                        .font(.caption)
                        .foregroundColor(.gray)
                }
                
                HStack(spacing: 4) {
                    Image(systemName: "person.fill")
                        .foregroundColor(.blue)
                        .font(.caption)
                    Text("Gefunden von \(item.found_by)")
                        .font(.caption)
                        .foregroundColor(.gray)
                }
            }
            
            Divider().background(Color.white.opacity(0.06))
            
            Button(action: onResolve) {
                HStack {
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundColor(.green)
                    Text("An Gast übergeben / Abgeholt")
                        .font(.caption)
                        .fontWeight(.bold)
                        .foregroundColor(.green)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 8)
                .background(Color.green.opacity(0.1))
                .cornerRadius(8)
            }
        }
        .padding(14)
        .background(Color.white.opacity(0.04))
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color.white.opacity(0.08), lineWidth: 1)
        )
    }
}

struct FilterChip: View {
    let title: String
    @Binding var selected: String
    
    var isSelected: Bool { selected == title }
    
    var body: some View {
        Button(action: { selected = title }) {
            Text(title)
                .font(.caption)
                .fontWeight(isSelected ? .bold : .medium)
                .foregroundColor(isSelected ? .white : .gray)
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(isSelected ? Color.red : Color.white.opacity(0.06))
                .cornerRadius(10)
        }
    }
}

struct AddLostItemSheet: View {
    @Binding var what: String
    @Binding var category: String
    @Binding var whereFound: String
    let categories: [String]
    let onSave: () -> Void
    @Environment(\.presentationMode) var presentationMode
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(red: 24/255, green: 24/255, blue: 26/255).ignoresSafeArea()
                
                VStack(spacing: 20) {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Was wurde gefunden?")
                            .font(.caption)
                            .foregroundColor(.gray)
                        TextField("z.B. Schwarze Lederjacke, iPhone 14, Autoschlüssel...", text: $what)
                            .padding(12)
                            .background(Color.white.opacity(0.06))
                            .cornerRadius(10)
                            .foregroundColor(.white)
                    }
                    
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Kategorie")
                            .font(.caption)
                            .foregroundColor(.gray)
                        Picker("Kategorie", selection: $category) {
                            ForEach(categories, id: \.self) { cat in
                                Text(cat).tag(cat)
                            }
                        }
                        .pickerStyle(SegmentedPickerStyle())
                    }
                    
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Fundort")
                            .font(.caption)
                            .foregroundColor(.gray)
                        TextField("z.B. Saal 3 Reihe 14, Theke 2, Foyer...", text: $whereFound)
                            .padding(12)
                            .background(Color.white.opacity(0.06))
                            .cornerRadius(10)
                            .foregroundColor(.white)
                    }
                    
                    Spacer()
                    
                    Button(action: onSave) {
                        Text("Fundsache eintragen")
                            .fontWeight(.bold)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 14)
                            .background(what.isEmpty || whereFound.isEmpty ? Color.gray.opacity(0.3) : Color.red)
                            .foregroundColor(.white)
                            .cornerRadius(12)
                    }
                    .disabled(what.isEmpty || whereFound.isEmpty)
                }
                .padding()
            }
            .navigationTitle("Neue Fundsache")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Abbrechen") {
                        presentationMode.wrappedValue.dismiss()
                    }
                    .foregroundColor(.gray)
                }
            }
        }
    }
}
