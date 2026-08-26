import SwiftUI
import Combine

// MARK: - Models
struct GastroMHDItem: Identifiable, Codable {
    let id: UUID
    let name: String
    let category: String
    let expiryDate: Date
    let batchNumber: String
    
    var daysRemaining: Int {
        Calendar.current.dateComponents([.day], from: Date(), to: expiryDate).day ?? 0
    }
    
    var statusColor: Color {
        if daysRemaining < 0 { return .red }
        if daysRemaining <= 7 { return .orange }
        if daysRemaining <= 30 { return .yellow }
        return .green
    }
}

// MARK: - ViewModel
@MainActor
class GastroRechnerViewModel: ObservableObject {
    @Published var totalSoldTickets: Int = 0
    @Published var familyTicketCount: Int = 0
    @Published var isLoading = false
    @Published var manualGuests: Double = 800
    @Published var isManualMode = false
    
    // Inventory
    @Published var mhdItems: [GastroMHDItem] = []
    
    private let mhdStorageKey = "gastroMHDItemsData"
    
    var effectiveGuests: Int {
        isManualMode ? Int(manualGuests) : max(totalSoldTickets, 150)
    }
    
    // Calculations
    // 1 Kessel Popcorn (Großkessel) yields approx. 25-30 Portionen
    var sweetKettles: Int {
        let baseRate = Double(effectiveGuests) * 0.45 // ~45% buy sweet popcorn
        return max(1, Int(ceil(baseRate / 28.0)))
    }
    
    var saltyKettles: Int {
        let baseRate = Double(effectiveGuests) * 0.18 // ~18% buy salty popcorn
        return max(1, Int(ceil(baseRate / 28.0)))
    }
    
    var nachoPortions: Int {
        Int(Double(effectiveGuests) * 0.22) // ~22% buy nachos
    }
    
    var cheeseDips: Int {
        Int(Double(nachoPortions) * 0.70)
    }
    
    var salsaDips: Int {
        Int(Double(nachoPortions) * 0.30)
    }
    
    var drinkCups05: Int {
        Int(Double(effectiveGuests) * 0.40)
    }
    
    var drinkCups10: Int {
        Int(Double(effectiveGuests) * 0.35)
    }
    
    init() {
        loadMHDItems()
    }
    
    func loadMHDItems() {
        if let str = UserDefaults.standard.string(forKey: mhdStorageKey),
           let data = str.data(using: .utf8),
           let arr = try? JSONDecoder().decode([GastroMHDItem].self, from: data) {
            self.mhdItems = arr
        } else {
            // Default sample items
            self.mhdItems = [
                GastroMHDItem(id: UUID(), name: "Nacho Käsesauce (Kanister 5L)", category: "Saucen", expiryDate: Date().addingTimeInterval(86400 * 5), batchNumber: "CH-8921"),
                GastroMHDItem(id: UUID(), name: "Popcornmais Typ Butterfly (22.7kg)", category: "Mais & Öl", expiryDate: Date().addingTimeInterval(86400 * 45), batchNumber: "MAIS-04"),
                GastroMHDItem(id: UUID(), name: "Coca-Cola Postmix Sirup (20L)", category: "Getränke", expiryDate: Date().addingTimeInterval(86400 * 60), batchNumber: "CC-2026")
            ]
            saveMHDItems()
        }
    }
    
    func saveMHDItems() {
        if let data = try? JSONEncoder().encode(mhdItems),
           let str = String(data: data, encoding: .utf8) {
            UserDefaults.standard.set(str, forKey: mhdStorageKey)
        }
    }
    
    func addMHDItem(name: String, category: String, expiry: Date, batch: String) {
        let item = GastroMHDItem(
            id: UUID(),
            name: name.trimmingCharacters(in: .whitespaces),
            category: category,
            expiryDate: expiry,
            batchNumber: batch.trimmingCharacters(in: .whitespaces)
        )
        mhdItems.insert(item, at: 0)
        saveMHDItems()
        
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.success)
    }
    
    func deleteMHDItem(_ id: UUID) {
        mhdItems.removeAll(where: { $0.id == id })
        saveMHDItems()
    }
    
    func calculateLiveTickets() async {
        isLoading = true
        let loc = UserDefaults.standard.string(forKey: "selectedLocation") ?? "su"
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        let dateStr = formatter.string(from: Date())
        
        do {
            let halls = try await ScraperManager.shared.fetchSessions(location: loc, dateStr: dateStr)
            var total = 0
            var family = 0
            
            for hall in halls {
                for session in hall.sessions ?? [] {
                    let sold = session.sold ?? 0
                    total += sold
                    if let fsk = session.fsk, fsk.contains("0") || fsk.contains("6") {
                        family += sold
                    }
                }
            }
            
            self.totalSoldTickets = total
            self.familyTicketCount = family
            if total > 0 && !isManualMode {
                self.manualGuests = Double(total)
            }
        } catch {
            print("Gastro calculation error: \(error)")
        }
        
        isLoading = false
    }
}

// MARK: - Main View
struct GastroRechnerView: View {
    @Environment(\.dismiss) private var dismiss
    @StateObject private var viewModel = GastroRechnerViewModel()
    @State private var selectedTab = 0 // 0: Bedarfsrechner, 1: MHD / FIFO Lager
    @State private var showAddMHDSheet = false
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(red: 20/255, green: 20/255, blue: 22/255).ignoresSafeArea()
                
                VStack(spacing: 0) {
                    
                    Picker("Modus", selection: $selectedTab) {
                        Text("🍿 Popcorn & Gastro").tag(0)
                        Text("📦 MHD & FIFO Lager").tag(1)
                    }
                    .pickerStyle(SegmentedPickerStyle())
                    .padding(.horizontal, 16)
                    .padding(.top, 12)
                    .padding(.bottom, 12)
                    
                    if selectedTab == 0 {
                        ScrollView {
                            VStack(spacing: 16) {
                                
                                // Source Switcher: Live Tickets vs Manual Slider
                                VStack(alignment: .leading, spacing: 12) {
                                    HStack {
                                        VStack(alignment: .leading, spacing: 2) {
                                            Text(viewModel.isManualMode ? "Manuelle Gästezahl" : "Live Vorverkaufs-Prognose")
                                                .font(.headline)
                                                .fontWeight(.bold)
                                                .foregroundColor(.white)
                                            Text(viewModel.isManualMode ? "Regler für Event/Stoßzeit-Berechnung" : "\(viewModel.totalSoldTickets) verkaufte Tickets heute")
                                                .font(.caption)
                                                .foregroundColor(.gray)
                                        }
                                        
                                        Spacer()
                                        
                                        Toggle("", isOn: $viewModel.isManualMode)
                                            .labelsHidden()
                                            .tint(.orange)
                                    }
                                    
                                    if viewModel.isManualMode {
                                        VStack(spacing: 6) {
                                            HStack {
                                                Text("Erwartete Besucher:")
                                                    .font(.caption)
                                                    .foregroundColor(.gray)
                                                Spacer()
                                                Text("\(Int(viewModel.manualGuests)) Gäste")
                                                    .font(.subheadline)
                                                    .fontWeight(.heavy)
                                                    .foregroundColor(.yellow)
                                            }
                                            
                                            Slider(value: $viewModel.manualGuests, in: 100...3500, step: 50)
                                                .tint(.yellow)
                                        }
                                    } else {
                                        HStack(spacing: 12) {
                                            HStack(spacing: 6) {
                                                Image(systemName: "ticket.fill")
                                                    .foregroundColor(.orange)
                                                Text("\(viewModel.totalSoldTickets) Tickets")
                                                    .font(.subheadline)
                                                    .fontWeight(.bold)
                                                    .foregroundColor(.white)
                                            }
                                            
                                            Spacer()
                                            
                                            HStack(spacing: 6) {
                                                Image(systemName: "figure.2.and.child.holdinghands")
                                                    .foregroundColor(.cyan)
                                                Text("\(viewModel.familyTicketCount) Familien")
                                                    .font(.subheadline)
                                                    .fontWeight(.bold)
                                                    .foregroundColor(.white)
                                            }
                                        }
                                        .padding(10)
                                        .background(Color.white.opacity(0.04))
                                        .cornerRadius(10)
                                    }
                                }
                                .padding(16)
                                .background(Color.white.opacity(0.05))
                                .cornerRadius(18)
                                .padding(.horizontal, 16)
                                
                                // 1. POPCORN KESSEL EMPFEHLUNG
                                VStack(alignment: .leading, spacing: 14) {
                                    HStack {
                                        Image(systemName: "popcorn.fill")
                                            .foregroundColor(.yellow)
                                            .font(.title3)
                                        Text("🍿 Popcorn-Vorbereitung")
                                            .font(.headline)
                                            .fontWeight(.bold)
                                            .foregroundColor(.white)
                                    }
                                    
                                    HStack(spacing: 12) {
                                        GastroStatBox(
                                            title: "Kessel SÜSS",
                                            value: "\(viewModel.sweetKettles) Kessel",
                                            subtitle: "ca. \(viewModel.sweetKettles * 28) Port.",
                                            color: .yellow
                                        )
                                        
                                        GastroStatBox(
                                            title: "Kessel SALZIG",
                                            value: "\(viewModel.saltyKettles) Kessel",
                                            subtitle: "ca. \(viewModel.saltyKettles * 28) Port.",
                                            color: .orange
                                        )
                                    }
                                }
                                .padding(16)
                                .background(Color.yellow.opacity(0.08))
                                .cornerRadius(18)
                                .overlay(RoundedRectangle(cornerRadius: 18).stroke(Color.yellow.opacity(0.2), lineWidth: 1))
                                .padding(.horizontal, 16)
                                
                                // 2. NACHOS & WARMHALTEGERÄTE
                                VStack(alignment: .leading, spacing: 14) {
                                    HStack {
                                        Image(systemName: "flame.fill")
                                            .foregroundColor(.red)
                                            .font(.title3)
                                        Text("🌶️ Nachos & Saucen")
                                            .font(.headline)
                                            .fontWeight(.bold)
                                            .foregroundColor(.white)
                                    }
                                    
                                    HStack(spacing: 10) {
                                        GastroStatBox(
                                            title: "Nacho-Portionen",
                                            value: "\(viewModel.nachoPortions)",
                                            subtitle: "Wärmer füllen",
                                            color: .red
                                        )
                                        GastroStatBox(
                                            title: "Käse-Dips",
                                            value: "\(viewModel.cheeseDips)",
                                            subtitle: "Warmhalten",
                                            color: .orange
                                        )
                                        GastroStatBox(
                                            title: "Salsa-Dips",
                                            value: "\(viewModel.salsaDips)",
                                            subtitle: "Bereitstellen",
                                            color: .pink
                                        )
                                    }
                                }
                                .padding(16)
                                .background(Color.white.opacity(0.04))
                                .cornerRadius(18)
                                .padding(.horizontal, 16)
                                
                                // 3. BECHER & SOFTDRINKS
                                VStack(alignment: .leading, spacing: 14) {
                                    HStack {
                                        Image(systemName: "cup.and.saucer.fill")
                                            .foregroundColor(.blue)
                                            .font(.title3)
                                        Text("🥤 Becher-Vorratsbedarf")
                                            .font(.headline)
                                            .fontWeight(.bold)
                                            .foregroundColor(.white)
                                    }
                                    
                                    HStack(spacing: 12) {
                                        GastroStatBox(
                                            title: "0.5l Becher",
                                            value: "~\(viewModel.drinkCups05) Stk.",
                                            subtitle: "Standard Menüs",
                                            color: .cyan
                                        )
                                        
                                        GastroStatBox(
                                            title: "1.0l Becher",
                                            value: "~\(viewModel.drinkCups10) Stk.",
                                            subtitle: "Große Menüs",
                                            color: .blue
                                        )
                                    }
                                }
                                .padding(16)
                                .background(Color.white.opacity(0.04))
                                .cornerRadius(18)
                                .padding(.horizontal, 16)
                                
                                Spacer().frame(height: 30)
                            }
                            .padding(.top, 6)
                        }
                    } else {
                        // TAB 1: MHD & FIFO LAGER TRACKER
                        ScrollView {
                            VStack(spacing: 14) {
                                Button(action: { showAddMHDSheet = true }) {
                                    HStack {
                                        Image(systemName: "plus.circle.fill")
                                        Text("Ware mit Ablaufdatum erfassen")
                                            .fontWeight(.bold)
                                    }
                                    .frame(maxWidth: .infinity)
                                    .padding()
                                    .background(Color.orange)
                                    .foregroundColor(.white)
                                    .cornerRadius(16)
                                }
                                .padding(.horizontal, 16)
                                
                                ForEach(viewModel.mhdItems) { item in
                                    MHDItemRow(item: item, onDelete: {
                                        viewModel.deleteMHDItem(item.id)
                                    })
                                }
                                .padding(.horizontal, 16)
                                
                                Spacer().frame(height: 30)
                            }
                            .padding(.top, 6)
                        }
                    }
                }
            }
            .navigationTitle("🍿 Gastro & Popcorn AI")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button(action: {
                        Task { await viewModel.calculateLiveTickets() }
                    }) {
                        Image(systemName: "arrow.triangle.2.circlepath")
                            .foregroundColor(.white)
                    }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Schließen") { dismiss() }
                        .foregroundColor(.red)
                        .fontWeight(.bold)
                }
            }
            .sheet(isPresented: $showAddMHDSheet) {
                AddMHDItemSheet { name, cat, exp, batch in
                    viewModel.addMHDItem(name: name, category: cat, expiry: exp, batch: batch)
                }
            }
            .task {
                await viewModel.calculateLiveTickets()
            }
        }
    }
}

// MARK: - Supporting Views
struct GastroStatBox: View {
    let title: String
    let value: String
    let subtitle: String
    let color: Color
    
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title)
                .font(.caption2)
                .fontWeight(.bold)
                .foregroundColor(.gray)
                .lineLimit(1)
            
            Text(value)
                .font(.title3)
                .fontWeight(.black)
                .foregroundColor(color)
                .lineLimit(1)
            
            Text(subtitle)
                .font(.system(size: 11))
                .foregroundColor(.gray.opacity(0.8))
                .lineLimit(1)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(12)
        .background(Color.white.opacity(0.04))
        .cornerRadius(14)
    }
}

struct MHDItemRow: View {
    let item: GastroMHDItem
    let onDelete: () -> Void
    
    var body: some View {
        HStack(spacing: 12) {
            Circle()
                .fill(item.statusColor)
                .frame(width: 10, height: 10)
            
            VStack(alignment: .leading, spacing: 3) {
                Text(item.name)
                    .font(.subheadline)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                
                HStack(spacing: 8) {
                    Text(item.category)
                        .font(.caption2)
                        .foregroundColor(.gray)
                    Text("Charge: \(item.batchNumber)")
                        .font(.caption2)
                        .foregroundColor(.gray.opacity(0.7))
                }
            }
            
            Spacer()
            
            VStack(alignment: .trailing, spacing: 2) {
                Text(item.daysRemaining < 0 ? "ABGELAUFEN" : "\(item.daysRemaining) Tage")
                    .font(.caption)
                    .fontWeight(.black)
                    .foregroundColor(item.statusColor)
                
                Text(item.expiryDate.formatted(date: .numeric, time: .omitted))
                    .font(.caption2)
                    .foregroundColor(.gray)
            }
            
            Button(action: onDelete) {
                Image(systemName: "trash")
                    .font(.caption)
                    .foregroundColor(.red.opacity(0.6))
            }
        }
        .padding(14)
        .background(Color.white.opacity(0.04))
        .cornerRadius(16)
    }
}

struct AddMHDItemSheet: View {
    @Environment(\.dismiss) private var dismiss
    let onAdd: (String, String, Date, String) -> Void
    
    @State private var name = ""
    @State private var category = "Popcorn & Mais"
    @State private var expiryDate = Date().addingTimeInterval(86400 * 30)
    @State private var batchNumber = ""
    
    let categories = ["Popcorn & Mais", "Saucen & Nachos", "Getränke & Sirup", "Süßwaren & Eis", "Verpackung"]
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Artikel-Info")) {
                    TextField("Artikelname (z.B. Nacho Käse Kanister)", text: $name)
                    
                    Picker("Kategorie", selection: $category) {
                        ForEach(categories, id: \.self) { cat in
                            Text(cat).tag(cat)
                        }
                    }
                }
                
                Section(header: Text("Haltbarkeit & Charge")) {
                    DatePicker("Mindesthaltbarkeitsdatum (MHD)", selection: $expiryDate, displayedComponents: .date)
                    TextField("Chargennummer / Lot (optional)", text: $batchNumber)
                }
            }
            .navigationTitle("MHD erfassen")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Abbrechen") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Speichern") {
                        onAdd(name, category, expiryDate, batchNumber.isEmpty ? "Standard" : batchNumber)
                        dismiss()
                    }
                    .disabled(name.trimmingCharacters(in: .whitespaces).isEmpty)
                }
            }
        }
    }
}
