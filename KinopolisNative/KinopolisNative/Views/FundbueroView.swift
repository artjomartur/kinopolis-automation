import SwiftUI
import Combine
import PhotosUI

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
        guard let url = URL(string: "https://kinopolis.artjombecker.com/api/lostfound?location=\(location)") else { return }
        
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
    
    func createItem(what: String, category: String, whereFound: String, byUser: String, image: UIImage?) async -> Bool {
        let location = UserDefaults.standard.string(forKey: "selectedLocation") ?? "su"
        guard let url = URL(string: "https://kinopolis.artjombecker.com/api/lostfound") else { return false }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        var base64Image: String? = nil
        if let img = image {
            let resized = resizeImage(image: img, targetSize: CGSize(width: 800, height: 800))
            if let jpegData = resized.jpegData(compressionQuality: 0.6) {
                base64Image = "data:image/jpeg;base64,\(jpegData.base64EncodedString())"
            }
        }
        
        var body: [String: Any] = [
            "location": location,
            "what": what,
            "category": category,
            "found_where": whereFound,
            "found_by": byUser
        ]
        if let b64 = base64Image {
            body["image_url"] = b64
        }
        
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
        guard let url = URL(string: "https://kinopolis.artjombecker.com/api/lostfound/\(id)") else { return }
        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"
        
        _ = try? await URLSession.shared.data(for: request)
        await fetchItems()
    }
    
    private func resizeImage(image: UIImage, targetSize: CGSize) -> UIImage {
        let size = image.size
        let widthRatio  = targetSize.width  / size.width
        let heightRatio = targetSize.height / size.height
        let factor = min(widthRatio, heightRatio)
        if factor >= 1.0 { return image }
        
        let newSize = CGSize(width: size.width * factor, height: size.height * factor)
        let rect = CGRect(origin: .zero, size: newSize)
        
        UIGraphicsBeginImageContextWithOptions(newSize, false, 1.0)
        image.draw(in: rect)
        let newImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        return newImage ?? image
    }
}

struct FundbueroView: View {
    @StateObject private var viewModel = FundbueroViewModel()
    @EnvironmentObject var authManager: AuthManager
    @Environment(\.presentationMode) var presentationMode
    
    @State private var showAddSheet = false
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
                                Text("Gefundene Gegenstände mit Foto erfassen")
                                    .font(.caption)
                                    .foregroundColor(.gray)
                            }
                            Spacer()
                            
                            Button(action: { showAddSheet = true }) {
                                HStack(spacing: 6) {
                                    Image(systemName: "camera.fill")
                                        .font(.subheadline)
                                    Text("Fundsache + Foto")
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
                            VStack(spacing: 14) {
                                Image(systemName: "camera.viewfinder")
                                    .font(.system(size: 45))
                                    .foregroundColor(.gray)
                                Text("Aktuell keine Fundsachen erfasst")
                                    .font(.headline)
                                    .foregroundColor(.gray)
                                Text("Neue Fundsachen können inklusive Foto oben rechts eingetragen werden.")
                                    .font(.caption)
                                    .foregroundColor(.gray.opacity(0.8))
                                    .multilineTextAlignment(.center)
                                    .padding(.horizontal, 30)
                            }
                            .frame(maxWidth: .infinity)
                            .padding(.top, 50)
                        } else {
                            VStack(spacing: 14) {
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
                    categories: categories,
                    onSave: { what, category, whereFound, image in
                        let finder = authManager.currentUser?.name ?? "Mitarbeiter"
                        Task {
                            let success = await viewModel.createItem(
                                what: what,
                                category: category,
                                whereFound: whereFound,
                                byUser: finder,
                                image: image
                            )
                            if success {
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
    
    var fullImageUrl: URL? {
        guard let urlStr = item.image_url, !urlStr.isEmpty else { return nil }
        if urlStr.startsWithHttp {
            return URL(string: urlStr)
        } else if urlStr.hasPrefix("/") {
            return URL(string: "https://kinopolis.artjombecker.com\(urlStr)")
        }
        return nil
    }
    
    var isBase64Image: Bool {
        guard let urlStr = item.image_url else { return false }
        return urlStr.hasPrefix("data:image")
    }
    
    var decodedBase64Image: UIImage? {
        guard let urlStr = item.image_url,
              let commaIndex = urlStr.firstIndex(of: ",") else { return nil }
        let base64 = String(urlStr[urlStr.index(after: commaIndex)...])
        if let data = Data(base64Encoded: base64) {
            return UIImage(data: data)
        }
        return nil
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Category & Date
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
            
            // Photo Preview (if present)
            if isBase64Image, let uiImage = decodedBase64Image {
                Image(uiImage: uiImage)
                    .resizable()
                    .scaledToFill()
                    .frame(height: 180)
                    .frame(maxWidth: .infinity)
                    .clipped()
                    .cornerRadius(12)
            } else if let imgUrl = fullImageUrl {
                AsyncImage(url: imgUrl) { phase in
                    switch phase {
                    case .success(let image):
                        image
                            .resizable()
                            .scaledToFill()
                            .frame(height: 180)
                            .frame(maxWidth: .infinity)
                            .clipped()
                            .cornerRadius(12)
                    case .failure:
                        EmptyView()
                    case .empty:
                        ProgressView()
                            .frame(height: 120)
                            .frame(maxWidth: .infinity)
                    @unknown default:
                        EmptyView()
                    }
                }
            }
            
            // Description
            Text(item.what)
                .font(.headline)
                .fontWeight(.bold)
                .foregroundColor(.white)
            
            // Where & Who
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
            
            // Action Button
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
                .padding(.vertical, 10)
                .background(Color.green.opacity(0.12))
                .cornerRadius(10)
            }
        }
        .padding(14)
        .background(Color.white.opacity(0.04))
        .cornerRadius(18)
        .overlay(
            RoundedRectangle(cornerRadius: 18)
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

// MARK: - Add Sheet with Camera / Gallery Support
struct AddLostItemSheet: View {
    let categories: [String]
    let onSave: (String, String, String, UIImage?) -> Void
    @Environment(\.presentationMode) var presentationMode
    
    @State private var what = ""
    @State private var category = "📱 Wertsachen"
    @State private var whereFound = ""
    @State private var selectedImage: UIImage? = nil
    
    @State private var showPhotoPicker = false
    @State private var showCamera = false
    @State private var photoPickerItem: PhotosPickerItem? = nil
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(red: 24/255, green: 24/255, blue: 26/255).ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: 20) {
                        // 1. Photo Section
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Foto der Fundsache")
                                .font(.caption)
                                .foregroundColor(.gray)
                            
                            if let img = selectedImage {
                                ZStack(alignment: .topTrailing) {
                                    Image(uiImage: img)
                                        .resizable()
                                        .scaledToFill()
                                        .frame(height: 180)
                                        .frame(maxWidth: .infinity)
                                        .clipped()
                                        .cornerRadius(14)
                                    
                                    Button(action: { selectedImage = nil }) {
                                        Image(systemName: "xmark.circle.fill")
                                            .font(.title2)
                                            .foregroundColor(.white)
                                            .background(Circle().fill(Color.black.opacity(0.6)))
                                    }
                                    .padding(8)
                                }
                            } else {
                                HStack(spacing: 12) {
                                    // Camera Button
                                    Button(action: { showCamera = true }) {
                                        HStack {
                                            Image(systemName: "camera.fill")
                                            Text("Kamera")
                                        }
                                        .font(.subheadline)
                                        .fontWeight(.bold)
                                        .foregroundColor(.white)
                                        .frame(maxWidth: .infinity)
                                        .padding(.vertical, 14)
                                        .background(Color.red.opacity(0.2))
                                        .cornerRadius(12)
                                        .overlay(
                                            RoundedRectangle(cornerRadius: 12)
                                                .stroke(Color.red.opacity(0.4), lineWidth: 1)
                                        )
                                    }
                                    
                                    // Gallery Button (PhotosPicker)
                                    PhotosPicker(selection: $photoPickerItem, matching: .images) {
                                        HStack {
                                            Image(systemName: "photo.on.rectangle.angled")
                                            Text("Galerie")
                                        }
                                        .font(.subheadline)
                                        .fontWeight(.bold)
                                        .foregroundColor(.white)
                                        .frame(maxWidth: .infinity)
                                        .padding(.vertical, 14)
                                        .background(Color.white.opacity(0.06))
                                        .cornerRadius(12)
                                        .overlay(
                                            RoundedRectangle(cornerRadius: 12)
                                                .stroke(Color.white.opacity(0.1), lineWidth: 1)
                                        )
                                    }
                                    .onChange(of: photoPickerItem) { newItem in
                                        Task {
                                            if let data = try? await newItem?.loadTransferable(type: Data.self),
                                               let image = UIImage(data: data) {
                                                selectedImage = image
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        
                        // 2. What was found
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
                        
                        // 3. Category
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
                        
                        // 4. Location
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
                        
                        Spacer().frame(height: 20)
                        
                        Button(action: {
                            onSave(what, category, whereFound, selectedImage)
                        }) {
                            HStack {
                                Image(systemName: "checkmark")
                                Text("Fundsache speichern")
                            }
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
            .sheet(isPresented: $showCamera) {
                CameraPicker(image: $selectedImage)
            }
        }
    }
}

// MARK: - UIKit Camera Picker
struct CameraPicker: UIViewControllerRepresentable {
    @Binding var image: UIImage?
    @Environment(\.presentationMode) var presentationMode
    
    func makeUIViewController(context: Context) -> UIImagePickerController {
        let picker = UIImagePickerController()
        if UIImagePickerController.isSourceTypeAvailable(.camera) {
            picker.sourceType = .camera
        } else {
            picker.sourceType = .photoLibrary
        }
        picker.delegate = context.coordinator
        return picker
    }
    
    func updateUIViewController(_ uiViewController: UIImagePickerController, context: Context) {}
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    class Coordinator: NSObject, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
        let parent: CameraPicker
        init(_ parent: CameraPicker) {
            self.parent = parent
        }
        
        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
            if let uiImage = info[.originalImage] as? UIImage {
                parent.image = uiImage
            }
            parent.presentationMode.wrappedValue.dismiss()
        }
        
        func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
            parent.presentationMode.wrappedValue.dismiss()
        }
    }
}

private extension String {
    var startsWithHttp: Bool {
        hasPrefix("http://") || hasPrefix("https://")
    }
}
