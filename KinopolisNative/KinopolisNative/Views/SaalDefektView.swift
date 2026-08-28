import SwiftUI
import Combine
import PhotosUI

// MARK: - Models
struct SaalDefekt: Identifiable, Codable {
    let id: UUID
    let hall: String
    let locationDetail: String // e.g. "Reihe 6, Sitz 12"
    let category: String
    let description: String
    let priority: String // "Niedrig", "Mittel", "Dringend"
    let reportedBy: String
    let dateReported: Date
    var status: String // "Offen", "In Bearbeitung", "Behoben"
    var imageBase64: String?
    
    var priorityColor: Color {
        switch priority {
        case "Dringend": return .red
        case "Mittel": return .orange
        default: return .blue
        }
    }
    
    var statusColor: Color {
        switch status {
        case "Behoben": return .green
        case "In Bearbeitung": return .yellow
        default: return .red
        }
    }
}

// MARK: - ViewModel
@MainActor
class SaalDefektViewModel: ObservableObject {
    @Published var reports: [SaalDefekt] = []
    @Published var selectedFilter: String = "Alle"
    
    private let storageKey = "saalDefektReportsData"
    
    var filteredReports: [SaalDefekt] {
        if selectedFilter == "Alle" {
            return reports
        }
        return reports.filter { $0.status == selectedFilter }
    }
    
    init() {
        loadReports()
    }
    
    func loadReports() {
        if let str = UserDefaults.standard.string(forKey: storageKey),
           let data = str.data(using: .utf8),
           let arr = try? JSONDecoder().decode([SaalDefekt].self, from: data) {
            self.reports = arr
        } else {
            // Default sample defect reports
            self.reports = [
                SaalDefekt(
                    id: UUID(),
                    hall: "Kino 4",
                    locationDetail: "Reihe 8, Sitz 15",
                    category: "Sitz / Armlehne",
                    description: "Getränkehalter abgebrochen, Schraube locker",
                    priority: "Mittel",
                    reportedBy: "Artjom Becker",
                    dateReported: Date().addingTimeInterval(-3600 * 4),
                    status: "Offen",
                    imageBase64: nil
                ),
                SaalDefekt(
                    id: UUID(),
                    hall: "Kino 2",
                    locationDetail: "Reihe 12, Notausgang rechts",
                    category: "Saal-Beleuchtung",
                    description: "Stufenbeleuchtung flackert leicht bei Dunkelheit",
                    priority: "Niedrig",
                    reportedBy: "Team Einlass",
                    dateReported: Date().addingTimeInterval(-86400),
                    status: "In Bearbeitung",
                    imageBase64: nil
                )
            ]
            saveReports()
        }
    }
    
    func saveReports() {
        if let data = try? JSONEncoder().encode(reports),
           let str = String(data: data, encoding: .utf8) {
            UserDefaults.standard.set(str, forKey: storageKey)
        }
    }
    
    func addReport(hall: String, location: String, category: String, desc: String, priority: String, user: String, image: UIImage?) {
        var base64: String? = nil
        if let img = image, let jpeg = img.jpegData(compressionQuality: 0.5) {
            base64 = jpeg.base64EncodedString()
        }
        
        let report = SaalDefekt(
            id: UUID(),
            hall: hall,
            locationDetail: location.trimmingCharacters(in: .whitespaces),
            category: category,
            description: desc.trimmingCharacters(in: .whitespaces),
            priority: priority,
            reportedBy: user.trimmingCharacters(in: .whitespaces),
            dateReported: Date(),
            status: "Offen",
            imageBase64: base64
        )
        
        reports.insert(report, at: 0)
        saveReports()
        
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.success)
    }
    
    func updateStatus(for id: UUID, newStatus: String) {
        if let idx = reports.firstIndex(where: { $0.id == id }) {
            reports[idx].status = newStatus
            saveReports()
            let generator = UIImpactFeedbackGenerator(style: .medium)
            generator.impactOccurred()
        }
    }
    
    func deleteReport(_ id: UUID) {
        reports.removeAll(where: { $0.id == id })
        saveReports()
    }
}

// MARK: - Main View
struct SaalDefektView: View {
    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject var authManager: AuthManager
    @StateObject private var viewModel = SaalDefektViewModel()
    @State private var showAddSheet = false
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(UIColor.systemBackground).ignoresSafeArea()
                
                VStack(spacing: 0) {
                    
                    // Filter Bar
                    Picker("Status", selection: $viewModel.selectedFilter) {
                        Text("Alle (\(viewModel.reports.count))").tag("Alle")
                        Text("🚨 Offen (\(viewModel.reports.filter { $0.status == "Offen" }.count))").tag("Offen")
                        Text("🔨 In Arbeit (\(viewModel.reports.filter { $0.status == "In Bearbeitung" }.count))").tag("In Bearbeitung")
                        Text("✅ Behoben").tag("Behoben")
                    }
                    .pickerStyle(SegmentedPickerStyle())
                    .padding(.horizontal, 16)
                    .padding(.top, 12)
                    .padding(.bottom, 12)
                    
                    ScrollView {
                        VStack(spacing: 14) {
                            
                            // Add Defect Button
                            Button(action: { showAddSheet = true }) {
                                HStack {
                                    Image(systemName: "wrench.and.screwdriver.fill")
                                        .font(.title3)
                                    Text("Neuen Saal-Mangel melden")
                                        .fontWeight(.bold)
                                }
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(LinearGradient(colors: [.red, .orange], startPoint: .leading, endPoint: .trailing))
                                .foregroundColor(.primary)
                                .cornerRadius(16)
                                .shadow(color: Color.red.opacity(0.3), radius: 8, x: 0, y: 3)
                            }
                            .padding(.horizontal, 16)
                            
                            if viewModel.filteredReports.isEmpty {
                                VStack(spacing: 12) {
                                    Image(systemName: "checkmark.shield.fill")
                                        .font(.system(size: 44))
                                        .foregroundColor(.green.opacity(0.5))
                                    Text("Keine Mängel in dieser Kategorie")
                                        .font(.headline)
                                        .foregroundColor(.primary)
                                    Text("Alle Säle sind einsatzbereit und geprüft.")
                                        .font(.caption)
                                        .foregroundColor(.gray)
                                }
                                .padding(.top, 40)
                            } else {
                                ForEach(viewModel.filteredReports) { report in
                                    SaalDefektCard(
                                        report: report,
                                        onStatusChange: { newStatus in
                                            viewModel.updateStatus(for: report.id, newStatus: newStatus)
                                        },
                                        onDelete: {
                                            viewModel.deleteReport(report.id)
                                        }
                                    )
                                }
                                .padding(.horizontal, 16)
                            }
                            
                            Spacer().frame(height: 30)
                        }
                        .padding(.top, 6)
                    }
                }
            }
            .navigationTitle("🔧 Saal- & Mängelmelder")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Schließen") { dismiss() }
                        .foregroundColor(.red)
                        .fontWeight(.bold)
                }
            }
            .sheet(isPresented: $showAddSheet) {
                AddSaalDefektSheet(
                    defaultUser: authManager.currentUser?.name ?? "Artjom Becker"
                ) { hall, loc, cat, desc, prio, user, img in
                    viewModel.addReport(hall: hall, location: loc, category: cat, desc: desc, priority: prio, user: user, image: img)
                }
            }
        }
    }
}

// MARK: - Defect Card
struct SaalDefektCard: View {
    let report: SaalDefekt
    let onStatusChange: (String) -> Void
    let onDelete: () -> Void
    
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack {
                HStack(spacing: 6) {
                    Text(report.hall)
                        .font(.caption)
                        .fontWeight(.black)
                        .padding(.horizontal, 7)
                        .padding(.vertical, 3)
                        .background(Color.red)
                        .foregroundColor(.primary)
                        .cornerRadius(5)
                    
                    Text(report.category)
                        .font(.caption)
                        .fontWeight(.bold)
                        .foregroundColor(.primary)
                }
                
                Spacer()
                
                // Priority Tag
                Text(report.priority)
                    .font(.caption2)
                    .fontWeight(.black)
                    .padding(.horizontal, 6)
                    .padding(.vertical, 2.5)
                    .background(report.priorityColor.opacity(0.2))
                    .foregroundColor(report.priorityColor)
                    .cornerRadius(5)
            }
            
            Text("📍 Ort: \(report.locationDetail)")
                .font(.subheadline)
                .fontWeight(.bold)
                .foregroundColor(.primary)
            
            Text(report.description)
                .font(.caption)
                .foregroundColor(.gray.opacity(0.9))
            
            // Image Preview if available
            if let base64 = report.imageBase64,
               let data = Data(base64Encoded: base64),
               let uiImage = UIImage(data: data) {
                Image(uiImage: uiImage)
                    .resizable()
                    .scaledToFill()
                    .frame(height: 120)
                    .cornerRadius(10)
                    .clipped()
            }
            
            Divider().background(Color.white.opacity(0.06))
            
            // Action & Status Row
            HStack {
                Text("Gemeldet von \(report.reportedBy)")
                    .font(.caption2)
                    .foregroundColor(.gray)
                
                Spacer()
                
                // Status Menu
                Menu {
                    Button("🚨 Als Offen markieren") { onStatusChange("Offen") }
                    Button("🔨 In Bearbeitung (Haustechnik)") { onStatusChange("In Bearbeitung") }
                    Button("✅ Als Behoben markieren") { onStatusChange("Behoben") }
                    Divider()
                    Button(role: .destructive, action: onDelete) {
                        Label("Eintrag löschen", systemImage: "trash")
                    }
                } label: {
                    HStack(spacing: 4) {
                        Circle()
                            .fill(report.statusColor)
                            .frame(width: 8, height: 8)
                        Text(report.status)
                            .font(.caption)
                            .fontWeight(.bold)
                            .foregroundColor(report.statusColor)
                        Image(systemName: "chevron.up.chevron.down")
                            .font(.system(size: 9))
                            .foregroundColor(.gray)
                    }
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.white.opacity(0.06))
                    .cornerRadius(8)
                }
            }
        }
        .padding(14)
        .background(Color.white.opacity(0.04))
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(report.priority == "Dringend" && report.status != "Behoben" ? Color.red.opacity(0.5) : Color.white.opacity(0.08), lineWidth: 1)
        )
    }
}

// MARK: - Add Defect Sheet
struct AddSaalDefektSheet: View {
    @Environment(\.dismiss) private var dismiss
    let defaultUser: String
    let onAdd: (String, String, String, String, String, String, UIImage?) -> Void
    
    @State private var hall = "Kino 1"
    @State private var location = ""
    @State private var category = "Sitz / Armlehne"
    @State private var description = ""
    @State private var priority = "Mittel"
    @State private var reportedBy = ""
    @State private var photoItem: PhotosPickerItem? = nil
    @State private var selectedImage: UIImage? = nil
    
    let halls = (1...12).map { "Kino \($0)" } + ["OnyxLED"]
    let categories = ["Sitz / Armlehne", "Bild & Projektion", "Ton & Lautsprecher", "Klimaanlage & Temperatur", "Saal-Beleuchtung", "Sauberkeit / Müll"]
    let priorities = ["Niedrig", "Mittel", "Dringend"]
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Ort & Saal")) {
                    Picker("Kinosaal", selection: $hall) {
                        ForEach(halls, id: \.self) { h in
                            Text(h).tag(h)
                        }
                    }
                    
                    TextField("Genauer Platz (z.B. Reihe 7, Sitz 12)", text: $location)
                }
                
                Section(header: Text("Mangel-Details")) {
                    Picker("Kategorie", selection: $category) {
                        ForEach(categories, id: \.self) { c in
                            Text(c).tag(c)
                        }
                    }
                    
                    Picker("Dringlichkeit", selection: $priority) {
                        ForEach(priorities, id: \.self) { p in
                            Text(p).tag(p)
                        }
                    }
                    
                    TextField("Beschreibung des Defekts...", text: $description)
                }
                
                Section(header: Text("Foto (optional)")) {
                    PhotosPicker(selection: $photoItem, matching: .images) {
                        HStack {
                            Image(systemName: "camera.fill")
                                .foregroundColor(.orange)
                            Text(selectedImage == nil ? "Foto vom Mangel hinzufügen" : "Foto ausgewählt ✓")
                                .foregroundColor(.primary)
                        }
                    }
                    .onChange(of: photoItem) { _, newItem in
                        Task {
                            if let data = try? await newItem?.loadTransferable(type: Data.self),
                               let img = UIImage(data: data) {
                                selectedImage = img
                            }
                        }
                    }
                    
                    if let img = selectedImage {
                        Image(uiImage: img)
                            .resizable()
                            .scaledToFill()
                            .frame(height: 100)
                            .cornerRadius(8)
                            .clipped()
                    }
                }
                
                Section(header: Text("Gemeldet von")) {
                    TextField("Dein Name", text: $reportedBy)
                }
            }
            .navigationTitle("Mangel melden")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Abbrechen") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Melden") {
                        onAdd(hall, location.isEmpty ? "Allgemein" : location, category, description, priority, reportedBy, selectedImage)
                        dismiss()
                    }
                    .disabled(description.trimmingCharacters(in: .whitespaces).isEmpty)
                }
            }
            .onAppear {
                self.reportedBy = defaultUser
            }
        }
    }
}
