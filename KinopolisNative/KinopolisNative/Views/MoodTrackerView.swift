import SwiftUI

struct MoodTrackerView: View {
    @Environment(\.dismiss) var dismiss
    @AppStorage("lastMoodRating") private var lastMoodRating: Int = 0
    @AppStorage("moodHistory") private var moodHistoryData: Data = Data()
    
    @State private var selectedRating: Int = 0
    @State private var comment: String = ""
    @State private var showSuccess = false
    
    var body: some View {
        NavigationView {
            VStack(spacing: 24) {
                if showSuccess {
                    VStack(spacing: 16) {
                        Image(systemName: "checkmark.circle.fill")
                            .font(.system(size: 64))
                            .foregroundColor(.green)
                        Text("Danke für dein Feedback!")
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundColor(.primary)
                        Text("Deine Stimmung wurde gespeichert.")
                            .foregroundColor(.gray)
                    }
                    .transition(.scale)
                } else {
                    Text("Wie war deine Schicht heute?")
                        .font(.title2)
                        .fontWeight(.bold)
                        .foregroundColor(.primary)
                        .multilineTextAlignment(.center)
                        .padding(.top)
                    
                    HStack(spacing: 16) {
                        ForEach(1...5, id: \.self) { rating in
                            Button(action: {
                                withAnimation {
                                    selectedRating = rating
                                }
                            }) {
                                VStack {
                                    Text(emoji(for: rating))
                                        .font(.system(size: 44))
                                        .scaleEffect(selectedRating == rating ? 1.2 : 1.0)
                                    
                                    Text(label(for: rating))
                                        .font(.caption)
                                        .foregroundColor(selectedRating == rating ? .white : .gray)
                                }
                                .padding(.vertical, 8)
                            }
                            .buttonStyle(PlainButtonStyle())
                        }
                    }
                    .padding()
                    .background(Color.white.opacity(0.05))
                    .cornerRadius(16)
                    
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Kommentar (optional)")
                            .font(.subheadline)
                            .foregroundColor(.gray)
                        
                        TextEditor(text: $comment)
                            .frame(height: 100)
                            .padding(8)
                            .background(Color.white.opacity(0.1))
                            .cornerRadius(8)
                            .foregroundColor(.primary)
                    }
                    
                    Spacer()
                    
                    Button(action: saveMood) {
                        Text("Speichern")
                            .font(.headline)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(selectedRating > 0 ? Color.blue : Color.gray)
                            .foregroundColor(.primary)
                            .cornerRadius(12)
                    }
                    .disabled(selectedRating == 0)
                }
            }
            .padding()
            .background(Color(UIColor.systemBackground).ignoresSafeArea())
            .navigationTitle("Stimmungs-Tracker")
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
    
    private func emoji(for rating: Int) -> String {
        switch rating {
        case 1: return "🤬"
        case 2: return "😮‍💨"
        case 3: return "😐"
        case 4: return "🙂"
        case 5: return "🤩"
        default: return "😐"
        }
    }
    
    private func label(for rating: Int) -> String {
        switch rating {
        case 1: return "Schrecklich"
        case 2: return "Anstrengend"
        case 3: return "Okay"
        case 4: return "Gut"
        case 5: return "Perfekt"
        default: return ""
        }
    }
    
    private func saveMood() {
        lastMoodRating = selectedRating
        var history = (try? JSONDecoder().decode([Int].self, from: moodHistoryData)) ?? []
        history.append(selectedRating)
        if history.count > 7 { history.removeFirst() } // Keep last 7 days
        moodHistoryData = (try? JSONEncoder().encode(history)) ?? Data()
        
        withAnimation {
            showSuccess = true
        }
        
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.success)
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            dismiss()
        }
    }
}
