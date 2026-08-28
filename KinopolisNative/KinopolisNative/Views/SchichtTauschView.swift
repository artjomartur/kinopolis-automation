import SwiftUI
import Combine

// MARK: - Models
struct SchichtTauschOffer: Identifiable, Codable {
    let id: UUID
    let ownerName: String
    let department: String // "Einlass", "Kasse", "Süßwaren / Popcorn", "Bar", "TL / BL"
    let date: Date
    let timeRange: String // "16:30 - 23:45"
    let note: String // "Suche Tausch gegen Samstag"
    var acceptedBy: String?
    var status: String // "Offen", "Angenommen", "TL-Bestätigt"
    
    var departmentColor: Color {
        switch department {
        case "TL / BL": return .red
        case "Kasse": return .blue
        case "Einlass": return .orange
        case "Bar": return .purple
        default: return .yellow
        }
    }
}

// MARK: - ViewModel
@MainActor
class SchichtTauschViewModel: ObservableObject {
    @Published var offers: [SchichtTauschOffer] = []
    @Published var selectedFilter: String = "Offen"
    
    private let storageKey = "schichtTauschOffersData"
    
    var filteredOffers: [SchichtTauschOffer] {
        if selectedFilter == "Alle" {
            return offers
        }
        return offers.filter { $0.status == selectedFilter }
    }
    
    init() {
        loadOffers()
    }
    
    func loadOffers() {
        if let str = UserDefaults.standard.string(forKey: storageKey),
           let data = str.data(using: .utf8),
           let arr = try? JSONDecoder().decode([SchichtTauschOffer].self, from: data) {
            self.offers = arr
        } else {
            // Default sample shift offers
            self.offers = [
                SchichtTauschOffer(
                    id: UUID(),
                    ownerName: "Sarah M.",
                    department: "Süßwaren / Popcorn",
                    date: Date().addingTimeInterval(86400 * 2),
                    timeRange: "17:00 - 23:30",
                    note: "Kann wegen Uni-Klausur nicht, suche Tausch gegen Sonntag Spätschicht!",
                    acceptedBy: nil,
                    status: "Offen"
                ),
                SchichtTauschOffer(
                    id: UUID(),
                    ownerName: "Tim K.",
                    department: "Einlass",
                    date: Date().addingTimeInterval(86400 * 3),
                    timeRange: "14:00 - 20:00",
                    note: "Frühschicht abzugeben – gerne auch Direktübernahme.",
                    acceptedBy: nil,
                    status: "Offen"
                )
            ]
            saveOffers()
        }
    }
    
    func saveOffers() {
        if let data = try? JSONEncoder().encode(offers),
           let str = String(data: data, encoding: .utf8) {
            UserDefaults.standard.set(str, forKey: storageKey)
        }
    }
    
    func addOffer(owner: String, dept: String, date: Date, time: String, note: String) {
        let offer = SchichtTauschOffer(
            id: UUID(),
            ownerName: owner.trimmingCharacters(in: .whitespaces),
            department: dept,
            date: date,
            timeRange: time.trimmingCharacters(in: .whitespaces),
            note: note.trimmingCharacters(in: .whitespaces),
            acceptedBy: nil,
            status: "Offen"
        )
        offers.insert(offer, at: 0)
        saveOffers()
        
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.success)
    }
    
    func acceptOffer(id: UUID, currentUserName: String) {
        if let idx = offers.firstIndex(where: { $0.id == id }) {
            offers[idx].acceptedBy = currentUserName
            offers[idx].status = "Angenommen"
            saveOffers()
            
            let generator = UINotificationFeedbackGenerator()
            generator.notificationOccurred(.success)
        }
    }
    
    func confirmTL(id: UUID) {
        if let idx = offers.firstIndex(where: { $0.id == id }) {
            offers[idx].status = "TL-Bestätigt"
            saveOffers()
            
            let generator = UIImpactFeedbackGenerator(style: .heavy)
            generator.impactOccurred()
        }
    }
    
    func deleteOffer(_ id: UUID) {
        offers.removeAll(where: { $0.id == id })
        saveOffers()
    }
}

// MARK: - Main View
struct SchichtTauschView: View {
    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject var authManager: AuthManager
    @StateObject private var viewModel = SchichtTauschViewModel()
    @State private var showCreateSheet = false
    
    var currentUserName: String {
        authManager.currentUser?.name ?? "Artjom Becker"
    }
    
    var isTL: Bool {
        let role = authManager.currentUser?.role.lowercased() ?? ""
        return role == "admin" || role == "bl" || role == "tl"
    }
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(UIColor.systemBackground).ignoresSafeArea()
                
                VStack(spacing: 0) {
                    
                    // Filter Tabs
                    Picker("Filter", selection: $viewModel.selectedFilter) {
                        Text("🔄 Offen (\(viewModel.offers.filter { $0.status == "Offen" }.count))").tag("Offen")
                        Text("🤝 Angenommen").tag("Angenommen")
                        Text("✅ Bestätigt").tag("TL-Bestätigt")
                        Text("Alle").tag("Alle")
                    }
                    .pickerStyle(SegmentedPickerStyle())
                    .padding(.horizontal, 16)
                    .padding(.top, 12)
                    .padding(.bottom, 12)
                    
                    ScrollView {
                        VStack(spacing: 14) {
                            
                            // Post New Shift Button
                            Button(action: { showCreateSheet = true }) {
                                HStack {
                                    Image(systemName: "arrow.triangle.2.circlepath.circle.fill")
                                        .font(.title3)
                                    Text("Eigene Schicht zum Tausch anbieten")
                                        .fontWeight(.bold)
                                }
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(LinearGradient(colors: [.purple, .blue], startPoint: .leading, endPoint: .trailing))
                                .foregroundColor(.primary)
                                .cornerRadius(16)
                                .shadow(color: Color.purple.opacity(0.3), radius: 8, x: 0, y: 3)
                            }
                            .padding(.horizontal, 16)
                            
                            if viewModel.filteredOffers.isEmpty {
                                VStack(spacing: 12) {
                                    Image(systemName: "calendar.badge.checkmark")
                                        .font(.system(size: 44))
                                        .foregroundColor(.gray.opacity(0.4))
                                    Text("Keine Schichtangebote vorhanden")
                                        .font(.headline)
                                        .foregroundColor(.primary)
                                    Text("Alle Schichten sind aktuell besetzt. Biete deine Schicht an, wenn du Ersatz suchst.")
                                        .font(.caption)
                                        .foregroundColor(.gray)
                                        .multilineTextAlignment(.center)
                                        .padding(.horizontal, 30)
                                }
                                .padding(.top, 40)
                            } else {
                                ForEach(viewModel.filteredOffers) { offer in
                                    SchichtTauschCard(
                                        offer: offer,
                                        isOwnOffer: offer.ownerName == currentUserName,
                                        isTL: isTL,
                                        onAccept: {
                                            viewModel.acceptOffer(id: offer.id, currentUserName: currentUserName)
                                        },
                                        onConfirmTL: {
                                            viewModel.confirmTL(id: offer.id)
                                        },
                                        onDelete: {
                                            viewModel.deleteOffer(offer.id)
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
            .navigationTitle("🔄 Schicht-Tauschbörse")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Schließen") { dismiss() }
                        .foregroundColor(.red)
                        .fontWeight(.bold)
                }
            }
            .sheet(isPresented: $showCreateSheet) {
                AddSchichtTauschSheet(defaultName: currentUserName) { dept, date, time, note in
                    viewModel.addOffer(owner: currentUserName, dept: dept, date: date, time: time, note: note)
                }
            }
        }
    }
}

// MARK: - Shift Card
struct SchichtTauschCard: View {
    let offer: SchichtTauschOffer
    let isOwnOffer: Bool
    let isTL: Bool
    let onAccept: () -> Void
    let onConfirmTL: () -> Void
    let onDelete: () -> Void
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                HStack(spacing: 6) {
                    Text(offer.department)
                        .font(.caption)
                        .fontWeight(.black)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 3.5)
                        .background(offer.departmentColor.opacity(0.25))
                        .foregroundColor(offer.departmentColor)
                        .cornerRadius(6)
                    
                    Text("Von \(offer.ownerName)")
                        .font(.caption)
                        .foregroundColor(.gray)
                }
                
                Spacer()
                
                // Status Badge
                HStack(spacing: 4) {
                    Circle()
                        .fill(offer.status == "TL-Bestätigt" ? Color.green : (offer.status == "Angenommen" ? Color.orange : Color.yellow))
                        .frame(width: 7, height: 7)
                    Text(offer.status)
                        .font(.caption2)
                        .fontWeight(.bold)
                        .foregroundColor(.primary)
                }
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(Color.white.opacity(0.06))
                .cornerRadius(6)
            }
            
            HStack(spacing: 16) {
                VStack(alignment: .leading, spacing: 2) {
                    Text("Datum")
                        .font(.caption2)
                        .foregroundColor(.gray)
                    Text(offer.date.formatted(date: .abbreviated, time: .omitted))
                        .font(.subheadline)
                        .fontWeight(.heavy)
                        .foregroundColor(.primary)
                }
                
                VStack(alignment: .leading, spacing: 2) {
                    Text("Schichtzeit")
                        .font(.caption2)
                        .foregroundColor(.gray)
                    Text(offer.timeRange)
                        .font(.subheadline)
                        .fontWeight(.heavy)
                        .foregroundColor(.primary)
                }
            }
            
            if !offer.note.isEmpty {
                Text("💬 „\(offer.note)“")
                    .font(.caption)
                    .foregroundColor(.gray.opacity(0.9))
                    .padding(8)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color.white.opacity(0.03))
                    .cornerRadius(8)
            }
            
            if let accepted = offer.acceptedBy {
                HStack(spacing: 6) {
                    Image(systemName: "hand.raised.fill")
                        .foregroundColor(.green)
                        .font(.caption2)
                    Text("Übernahme angefragt von: **\(accepted)**")
                        .font(.caption2)
                        .foregroundColor(.green)
                }
            }
            
            Divider().background(Color.white.opacity(0.06))
            
            // Actions
            HStack {
                if isOwnOffer {
                    Button(role: .destructive, action: onDelete) {
                        HStack(spacing: 4) {
                            Image(systemName: "trash")
                            Text("Angebot zurückziehen")
                        }
                        .font(.caption)
                        .foregroundColor(.red.opacity(0.8))
                    }
                } else if offer.status == "Offen" {
                    Button(action: onAccept) {
                        HStack(spacing: 4) {
                            Image(systemName: "checkmark.circle.fill")
                            Text("Schicht übernehmen")
                        }
                        .font(.subheadline)
                        .fontWeight(.bold)
                        .padding(.horizontal, 14)
                        .padding(.vertical, 8)
                        .background(Color.green)
                        .foregroundColor(.primary)
                        .cornerRadius(10)
                    }
                }
                
                Spacer()
                
                if isTL && offer.status == "Angenommen" {
                    Button(action: onConfirmTL) {
                        HStack(spacing: 4) {
                            Image(systemName: "signature")
                            Text("TL-Freigabe")
                        }
                        .font(.caption)
                        .fontWeight(.bold)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 6)
                        .background(Color.red.opacity(0.8))
                        .foregroundColor(.primary)
                        .cornerRadius(8)
                    }
                }
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

// MARK: - Add Shift Sheet
struct AddSchichtTauschSheet: View {
    @Environment(\.dismiss) private var dismiss
    let defaultName: String
    let onAdd: (String, Date, String, String) -> Void
    
    @State private var department = "Süßwaren / Popcorn"
    @State private var date = Date().addingTimeInterval(86400)
    @State private var startTime = "17:00"
    @State private var endTime = "23:45"
    @State private var note = ""
    
    let departments = ["Süßwaren / Popcorn", "Einlass", "Kasse", "Bar", "TL / BL", "Küche"]
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Bereich & Datum")) {
                    Picker("Arbeitsbereich", selection: $department) {
                        ForEach(departments, id: \.self) { d in
                            Text(d).tag(d)
                        }
                    }
                    
                    DatePicker("Schichttag", selection: $date, displayedComponents: .date)
                }
                
                Section(header: Text("Arbeitszeit")) {
                    HStack {
                        TextField("Beginn (z.B. 17:00)", text: $startTime)
                        Text("bis")
                            .foregroundColor(.gray)
                        TextField("Ende (z.B. 23:45)", text: $endTime)
                    }
                }
                
                Section(header: Text("Tausch-Wunsch / Notiz")) {
                    TextField("z.B. Suche Tausch gegen Wochenende oder Frei", text: $note)
                }
            }
            .navigationTitle("Schicht anbieten")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Abbrechen") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Einstellen") {
                        let timeRange = "\(startTime.trimmingCharacters(in: .whitespaces)) - \(endTime.trimmingCharacters(in: .whitespaces)) Uhr"
                        onAdd(department, date, timeRange, note)
                        dismiss()
                    }
                }
            }
        }
    }
}
