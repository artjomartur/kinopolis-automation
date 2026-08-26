import SwiftUI
import Charts

struct StatistikenView: View {
    @Environment(\.dismiss) var dismiss
    @AppStorage("moodHistory") private var moodHistoryData: Data = Data()
    
    var moodHistory: [Int] {
        (try? JSONDecoder().decode([Int].self, from: moodHistoryData)) ?? []
    }
    
    // Mock Data for Heatmap
    let heatmapData: [(hall: Int, hour: Int, capacity: Int)] = [
        (1, 16, 20), (1, 18, 80), (1, 20, 100), (1, 22, 60),
        (2, 16, 10), (2, 17, 30), (2, 19, 90), (2, 21, 50),
        (3, 15, 40), (3, 17, 60), (3, 20, 100), (3, 23, 20),
        (4, 16, 50), (4, 19, 85), (4, 21, 40), (4, 22, 15),
        (5, 14, 20), (5, 16, 40), (5, 18, 70), (5, 20, 90)
    ]
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(red: 24/255, green: 24/255, blue: 26/255).ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: 24) {
                        heatmapSection
                        moodTrendsSection
                    }
                    .padding()
                }
            }
            .navigationTitle("Statistiken")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Schließen") {
                        dismiss()
                    }
                    .foregroundColor(.blue)
                }
            }
        }
    }
    
    private var heatmapSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Saal-Auslastung (Heute)")
                .font(.headline)
                .foregroundColor(.white)
            
            Text("Heatmap der geschätzten Auslastung pro Saal.")
                .font(.caption)
                .foregroundColor(.gray)
            
            Chart {
                ForEach(heatmapData, id: \.hall) { data in
                    RectangleMark(
                        x: .value("Uhrzeit", "\(data.hour):00"),
                        y: .value("Saal", "Saal \(data.hall)")
                    )
                    .foregroundStyle(by: .value("Auslastung", data.capacity))
                }
            }
            .chartForegroundStyleScale(range: [
                Color.green.opacity(0.3),
                Color.yellow.opacity(0.6),
                Color.red.opacity(0.9)
            ])
            .frame(height: 250)
            .padding()
            .background(Color.white.opacity(0.05))
            .cornerRadius(12)
        }
    }
    
    @ViewBuilder
    private var moodTrendsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Deine Stimmung (Letzte 7 Tage)")
                .font(.headline)
                .foregroundColor(.white)
            
            if moodHistory.isEmpty {
                Text("Noch keine Stimmungsdaten vorhanden. Tracke deine erste Schicht!")
                    .font(.subheadline)
                    .foregroundColor(.gray)
                    .padding()
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color.white.opacity(0.05))
                    .cornerRadius(12)
            } else {
                Chart {
                    ForEach(Array(moodHistory.enumerated()), id: \.offset) { index, mood in
                        LineMark(
                            x: .value("Tag", "Tag \(index + 1)"),
                            y: .value("Stimmung", mood)
                        )
                        .symbol(Circle())
                        .interpolationMethod(.monotone)
                    }
                }
                .chartYScale(domain: 1...5)
                .chartYAxis {
                    AxisMarks(values: [1, 2, 3, 4, 5]) {
                        AxisValueLabel(format: Decimal.FormatStyle())
                    }
                }
                .frame(height: 200)
                .padding()
                .background(Color.white.opacity(0.05))
                .cornerRadius(12)
            }
        }
    }
}
