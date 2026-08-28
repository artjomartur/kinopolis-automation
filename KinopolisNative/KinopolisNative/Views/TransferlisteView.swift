import SwiftUI
import Combine


// MARK: - Models
struct TransferItem: Identifiable, Codable {
    let id: UUID
    let name: String
    let category: String
    var amount: Int = 0
    let unit: String
}

// MARK: - ViewModel
@MainActor
class TransferlisteViewModel: ObservableObject {
    @Published var items: [TransferItem] = []
    @Published var isSubmitting = false
    @Published var showSuccessToast = false
    
    init() {
        loadDefaultItems()
    }
    
    func loadDefaultItems() {
        items = [
            TransferItem(id: UUID(), name: "Popcornmais Typ Butterfly", category: "Waren", unit: "Sack (22.7kg)"),
            TransferItem(id: UUID(), name: "Popcornfett / Öl", category: "Waren", unit: "Block (10kg)"),
            TransferItem(id: UUID(), name: "Popcorn-Zucker", category: "Waren", unit: "Sack (25kg)"),
            TransferItem(id: UUID(), name: "Nacho Chips (BBQ)", category: "Waren", unit: "Karton"),
            TransferItem(id: UUID(), name: "Nacho Käsesauce", category: "Saucen", unit: "Kanister (5L)"),
            TransferItem(id: UUID(), name: "Nacho Salsa", category: "Saucen", unit: "Beutel (3L)"),
            TransferItem(id: UUID(), name: "Coca-Cola Postmix Sirup", category: "Getränke", unit: "BIB (20L)"),
            TransferItem(id: UUID(), name: "Sprite Postmix Sirup", category: "Getränke", unit: "BIB (10L)"),
            TransferItem(id: UUID(), name: "Fanta Postmix Sirup", category: "Getränke", unit: "BIB (10L)"),
            TransferItem(id: UUID(), name: "Trinkbecher 0.5l", category: "Verpackung", unit: "Stange"),
            TransferItem(id: UUID(), name: "Trinkbecher 1.0l", category: "Verpackung", unit: "Stange"),
            TransferItem(id: UUID(), name: "Popcorntüten Groß", category: "Verpackung", unit: "Bund")
        ]
    }
    
    func resetAmounts() {
        for i in 0..<items.count {
            items[i].amount = 0
        }
    }
    
    func submitTransfer() {
        // Simulate network request
        isSubmitting = true
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            self.isSubmitting = false
            self.showSuccessToast = true
            self.resetAmounts()
            
            let generator = UINotificationFeedbackGenerator()
            generator.notificationOccurred(.success)
        }
    }
}

// MARK: - View
struct TransferlisteView: View {
    @StateObject private var viewModel = TransferlisteViewModel()
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        ZStack {
            Color(UIColor.systemBackground).ignoresSafeArea()
            
            VStack(spacing: 0) {
                // Header
                HStack {
                    Button(action: {
                        dismiss()
                    }) {
                        Image(systemName: "xmark.circle.fill")
                            .font(.title2)
                            .foregroundColor(.gray)
                    }
                    
                    Spacer()
                    
                    Text("Theke Transferliste")
                        .font(.headline)
                        .foregroundColor(.primary)
                    
                    Spacer()
                    
                    // Empty view to balance the header
                    Image(systemName: "xmark.circle.fill")
                        .font(.title2)
                        .foregroundColor(.clear)
                }
                .padding()
                .background(Color(UIColor.tertiarySystemBackground))
                
                // Form List
                ScrollView {
                    VStack(spacing: 24) {
                        
                        // Intro Box
                        VStack(alignment: .leading, spacing: 8) {
                            HStack {
                                Image(systemName: "box.truck.fill")
                                    .foregroundColor(.orange)
                                Text("Waren-Transfer dokumentieren")
                                    .font(.headline)
                                    .fontWeight(.bold)
                                    .foregroundColor(.primary)
                            }
                            Text("Bitte wähle aus, welche und wie viele Artikel du aus dem Hauptlager an die Theke transferierst.")
                                .font(.subheadline)
                                .foregroundColor(.gray)
                        }
                        .padding()
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(Color.primary.opacity(0.04))
                        .cornerRadius(16)
                        .padding(.horizontal)
                        .padding(.top, 16)
                        
                        // Group by Category
                        let categories = Array(Set(viewModel.items.map { $0.category })).sorted()
                        
                        ForEach(categories, id: \.self) { category in
                            VStack(alignment: .leading, spacing: 12) {
                                Text(category.uppercased())
                                    .font(.caption)
                                    .fontWeight(.bold)
                                    .foregroundColor(.gray)
                                    .padding(.horizontal, 24)
                                
                                VStack(spacing: 0) {
                                    let categoryItems = viewModel.items.filter { $0.category == category }
                                    
                                    ForEach(categoryItems) { item in
                                        if let index = viewModel.items.firstIndex(where: { $0.id == item.id }) {
                                            TransferItemRow(item: $viewModel.items[index])
                                            
                                            if item.id != categoryItems.last?.id {
                                                Divider().background(Color.primary.opacity(0.1))
                                                    .padding(.leading, 16)
                                            }
                                        }
                                    }
                                }
                                .background(Color.primary.opacity(0.04))
                                .cornerRadius(16)
                                .padding(.horizontal)
                            }
                        }
                        
                        Spacer().frame(height: 100) // Bottom padding for button
                    }
                }
            }
            
            // Submit Button Overlay
            VStack {
                Spacer()
                
                let hasItems = viewModel.items.contains(where: { $0.amount > 0 })
                
                Button(action: {
                    if hasItems && !viewModel.isSubmitting {
                        viewModel.submitTransfer()
                    }
                }) {
                    HStack {
                        if viewModel.isSubmitting {
                            ProgressView()
                                .tint(.white)
                        } else {
                            Image(systemName: "paperplane.fill")
                            Text("Transfer verbuchen")
                                .fontWeight(.bold)
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(hasItems ? Color.orange : Color.gray.opacity(0.3))
                    .foregroundColor(hasItems ? .white : .gray)
                    .cornerRadius(16)
                    .shadow(color: hasItems ? Color.orange.opacity(0.3) : .clear, radius: 10, y: 5)
                }
                .disabled(!hasItems || viewModel.isSubmitting)
                .padding(.horizontal)
                .padding(.bottom, 30)
                .animation(.easeInOut, value: hasItems)
                .animation(.easeInOut, value: viewModel.isSubmitting)
            }
            
            // Success Toast
            if viewModel.showSuccessToast {
                VStack {
                    HStack(spacing: 12) {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundColor(.green)
                            .font(.title2)
                        Text("Transfer erfolgreich verbucht!")
                            .fontWeight(.semibold)
                            .foregroundColor(.primary)
                    }
                    .padding()
                    .background(Color.black.opacity(0.85))
                    .cornerRadius(30)
                    .shadow(radius: 10)
                    .padding(.top, 50)
                    
                    Spacer()
                }
                .transition(.move(edge: .top).combined(with: .opacity))
                .zIndex(1)
                .onAppear {
                    DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
                        withAnimation {
                            viewModel.showSuccessToast = false
                        }
                    }
                }
            }
        }
    }
}

struct TransferItemRow: View {
    @Binding var item: TransferItem
    
    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text(item.name)
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .foregroundColor(.primary)
                Text(item.unit)
                    .font(.caption2)
                    .foregroundColor(.gray)
            }
            
            Spacer()
            
            HStack(spacing: 16) {
                Button(action: {
                    if item.amount > 0 {
                        item.amount -= 1
                        playHaptic()
                    }
                }) {
                    Image(systemName: "minus.circle.fill")
                        .font(.title3)
                        .foregroundColor(item.amount > 0 ? .red : .gray.opacity(0.3))
                }
                .buttonStyle(PlainButtonStyle())
                
                Text("\(item.amount)")
                    .font(.headline)
                    .foregroundColor(.primary)
                    .frame(width: 26, alignment: .center)
                    .contentTransition(.numericText())
                    .animation(.snappy, value: item.amount)
                
                Button(action: {
                    item.amount += 1
                    playHaptic()
                }) {
                    Image(systemName: "plus.circle.fill")
                        .font(.title3)
                        .foregroundColor(.green)
                }
                .buttonStyle(PlainButtonStyle())
            }
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
        .background(item.amount > 0 ? Color.orange.opacity(0.05) : Color.clear)
        .animation(.easeInOut, value: item.amount)
    }
    
    private func playHaptic() {
        let generator = UIImpactFeedbackGenerator(style: .light)
        generator.impactOccurred()
    }
}

#Preview {
    TransferlisteView()
}
