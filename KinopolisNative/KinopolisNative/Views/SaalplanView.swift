import SwiftUI

struct SaalplanView: View {
    @Environment(\.dismiss) var dismiss
    
    let rows = 12
    let seatsPerRow = 14
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(UIColor.systemBackground).ignoresSafeArea()
                
                VStack(spacing: 20) {
                    // Screen
                    ZStack {
                        Path { path in
                            path.move(to: CGPoint(x: 20, y: 40))
                            path.addQuadCurve(to: CGPoint(x: UIScreen.main.bounds.width - 60, y: 40), control: CGPoint(x: UIScreen.main.bounds.width / 2 - 20, y: 0))
                        }
                        .stroke(Color.white.opacity(0.8), lineWidth: 4)
                        
                        Text("LEINWAND")
                            .font(.caption)
                            .fontWeight(.bold)
                            .foregroundColor(.gray)
                            .offset(y: -10)
                    }
                    .frame(height: 60)
                    .padding(.top, 20)
                    
                    ScrollView {
                        ScrollView(.horizontal, showsIndicators: true) {
                            VStack(spacing: 8) {
                                ForEach(1...rows, id: \.self) { row in
                                    HStack(spacing: 6) {
                                        Text("\(row)")
                                            .font(.caption)
                                            .foregroundColor(.gray)
                                            .frame(width: 20)
                                        
                                        ForEach(1...seatsPerRow, id: \.self) { seat in
                                            let isPremium = row >= 8 && row <= 10 && seat >= 4 && seat <= 11
                                            let isLoveSeat = row == rows && (seat % 2 != 0)
                                            
                                            RoundedRectangle(cornerRadius: 4)
                                                .fill(seatColor(isPremium: isPremium, isLoveSeat: isLoveSeat))
                                                .frame(width: isLoveSeat ? 46 : 20, height: 20)
                                        }
                                    }
                                }
                            }
                            .padding()
                        }
                    }
                    
                    // Legend
                    HStack(spacing: 16) {
                        LegendItem(color: .blue, text: "Standard")
                        LegendItem(color: .orange, text: "Premium")
                        LegendItem(color: .red, text: "Love Seat")
                    }
                    .padding(.bottom, 20)
                }
            }
            .navigationTitle("Saalplan (Beispiel)")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Fertig") { dismiss() }
                        .foregroundColor(.blue)
                        .fontWeight(.bold)
                }
            }
        }
    }
    
    func seatColor(isPremium: Bool, isLoveSeat: Bool) -> Color {
        if isLoveSeat { return .red }
        if isPremium { return .orange }
        return .blue
    }
}

struct LegendItem: View {
    let color: Color
    let text: String
    
    var body: some View {
        HStack(spacing: 6) {
            RoundedRectangle(cornerRadius: 4)
                .fill(color)
                .frame(width: 16, height: 16)
            Text(text)
                .font(.caption)
                .foregroundColor(.primary)
        }
    }
}

#Preview {
    SaalplanView()
}
