import SwiftUI

struct FunkView: View {
    @StateObject private var viewModel = FunkViewModel()
    
    var body: some View {
        ZStack {
            // Background
            Color(red: 24/255, green: 24/255, blue: 26/255).ignoresSafeArea()
            
            ScrollView {
                VStack(spacing: 20) {
                    Text("Nachschub-Ruf")
                        .font(.title2)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.horizontal)
                        .padding(.top, 20)
                    
                    Text("Digitaler Funk")
                        .font(.subheadline)
                        .foregroundColor(.gray)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.horizontal)
                        .padding(.bottom, 10)
                    
                    // Popcorn
                    FunkCategoryCard(
                        title: "Popcorn",
                        icon: "🍿",
                        color: Color(red: 241/255, green: 196/255, blue: 15/255),
                        isActive: viewModel.activeCategory == "popcorn",
                        options: ["🍿 Süß", "🧂 Salz"]
                    ) { item in
                        viewModel.requestRestock(item: item)
                    } onToggle: {
                        withAnimation(.spring()) { viewModel.toggleCategory("popcorn") }
                    }
                    
                    // Nachos
                    FunkCategoryCard(
                        title: "Nachos",
                        icon: "🧀",
                        color: Color(red: 230/255, green: 126/255, blue: 34/255),
                        isActive: viewModel.activeCategory == "nachos",
                        options: ["1️⃣ 1er Nachos", "2️⃣ 2er Nachos", "3️⃣ 3er Nachos"]
                    ) { item in
                        viewModel.requestRestock(item: item)
                    } onToggle: {
                        withAnimation(.spring()) { viewModel.toggleCategory("nachos") }
                    }
                    
                    // Drinks
                    FunkCategoryCard(
                        title: "Getränke",
                        icon: "🥤",
                        color: Color.red,
                        isActive: viewModel.activeCategory == "drinks",
                        options: ["Cola", "Fanta", "Sprite", "Wasser"]
                    ) { item in
                        viewModel.requestRestock(item: item)
                    } onToggle: {
                        withAnimation(.spring()) { viewModel.toggleCategory("drinks") }
                    }
                    
                    // Becher
                    FunkCategoryCard(
                        title: "Becher",
                        icon: "🥤",
                        color: Color.blue,
                        isActive: viewModel.activeCategory == "becher",
                        options: ["0.3l Becher", "0.4l Becher", "0.5l Becher", "1.0l Becher"]
                    ) { item in
                        viewModel.requestRestock(item: item)
                    } onToggle: {
                        withAnimation(.spring()) { viewModel.toggleCategory("becher") }
                    }
                    
                    Spacer().frame(height: 100)
                }
            }
            
            // Toast Notification
            if viewModel.showToast, let msg = viewModel.toastMessage {
                VStack {
                    Spacer()
                    Text(msg)
                        .font(.subheadline)
                        .foregroundColor(.white)
                        .padding()
                        .background(Color.black.opacity(0.8))
                        .cornerRadius(12)
                        .padding(.bottom, 120)
                }
                .transition(.move(edge: .bottom).combined(with: .opacity))
                .zIndex(1)
            }
        }
    }
}

struct FunkCategoryCard: View {
    let title: String
    let icon: String
    let color: Color
    let isActive: Bool
    let options: [String]
    let onSelect: (String) -> Void
    let onToggle: () -> Void
    
    var body: some View {
        VStack(spacing: 0) {
            Button(action: onToggle) {
                VStack(spacing: 8) {
                    Text(icon).font(.system(size: 40))
                    Text(title)
                        .font(.headline)
                        .foregroundColor(.white)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 24)
                .background(color.opacity(0.15))
                .overlay(
                    RoundedRectangle(cornerRadius: 16)
                        .stroke(color.opacity(0.4), lineWidth: 1)
                )
            }
            .buttonStyle(.plain)
            
            if isActive {
                VStack(spacing: 12) {
                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                        ForEach(options, id: \.self) { option in
                            Button(action: { onSelect(option) }) {
                                Text(option)
                                    .font(.subheadline)
                                    .fontWeight(.semibold)
                                    .foregroundColor(color)
                                    .frame(maxWidth: .infinity)
                                    .padding(.vertical, 12)
                                    .background(Color.black.opacity(0.3))
                                    .overlay(
                                        RoundedRectangle(cornerRadius: 12)
                                            .stroke(color.opacity(0.3), lineWidth: 1)
                                    )
                            }
                        }
                    }
                    
                    Button(action: onToggle) {
                        Text("Abbrechen")
                            .font(.caption)
                            .foregroundColor(.gray)
                            .padding(.vertical, 8)
                            .frame(maxWidth: .infinity)
                            .overlay(
                                RoundedRectangle(cornerRadius: 8)
                                    .stroke(Color.gray.opacity(0.5), style: StrokeStyle(lineWidth: 1, dash: [5]))
                            )
                    }
                    .padding(.top, 8)
                }
                .padding()
                .background(Color.black.opacity(0.4))
            }
        }
        .cornerRadius(16)
        .padding(.horizontal)
    }
}
