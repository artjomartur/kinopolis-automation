import SwiftUI
import UserNotifications

struct PausenTimerView: View {
    @Environment(\.dismiss) var dismiss
    
    @State private var timeRemaining: TimeInterval = 0
    @State private var isTimerRunning = false
    @State private var timer: Timer? = nil
    
    let timerOptions: [TimeInterval] = [15 * 60, 30 * 60, 45 * 60]
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(UIColor.systemBackground).ignoresSafeArea()
                
                VStack(spacing: 40) {
                    // Timer Circle
                    ZStack {
                        Circle()
                            .stroke(Color.white.opacity(0.1), lineWidth: 15)
                            .frame(width: 250, height: 250)
                        
                        Circle()
                            .trim(from: 0, to: isTimerRunning ? 1.0 : 0.0)
                            .stroke(isTimerRunning ? Color.green : Color.blue, style: StrokeStyle(lineWidth: 15, lineCap: .round))
                            .frame(width: 250, height: 250)
                            .rotationEffect(.degrees(-90))
                            .animation(.linear(duration: 1.0), value: timeRemaining)
                        
                        Text(timeString(from: timeRemaining))
                            .font(.system(size: 60, weight: .bold, design: .monospaced))
                            .foregroundColor(.primary)
                    }
                    .padding(.top, 40)
                    
                    if !isTimerRunning {
                        HStack(spacing: 20) {
                            ForEach(timerOptions, id: \.self) { duration in
                                Button(action: {
                                    startTimer(duration: duration)
                                }) {
                                    Text("\(Int(duration / 60)) Min")
                                        .font(.headline)
                                        .padding()
                                        .frame(width: 100)
                                        .background(Color.blue)
                                        .foregroundColor(.primary)
                                        .cornerRadius(12)
                                }
                            }
                        }
                    } else {
                        Button(action: {
                            stopTimer()
                        }) {
                            Text("Pause Beenden")
                                .font(.title3)
                                .fontWeight(.bold)
                                .padding()
                                .frame(maxWidth: .infinity)
                                .background(Color.red)
                                .foregroundColor(.primary)
                                .cornerRadius(16)
                                .padding(.horizontal, 40)
                        }
                    }
                    
                    Spacer()
                }
            }
            .navigationTitle("Pausen-Timer")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Schließen") {
                        dismiss()
                    }
                    .foregroundColor(.gray)
                }
            }
            .onDisappear {
                // We keep it running in background by relying on local notifications
                // Ideally this would be a Live Activity, but this is a V1.
            }
        }
    }
    
    private func startTimer(duration: TimeInterval) {
        timeRemaining = duration
        isTimerRunning = true
        
        timer?.invalidate()
        timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { _ in
            if timeRemaining > 0 {
                timeRemaining -= 1
            } else {
                stopTimer()
                playAlarm()
            }
        }
        
        scheduleNotification(duration: duration)
    }
    
    private func stopTimer() {
        isTimerRunning = false
        timer?.invalidate()
        timeRemaining = 0
        UNUserNotificationCenter.current().removePendingNotificationRequests(withIdentifiers: ["PauseTimerEnd"])
    }
    
    private func timeString(from interval: TimeInterval) -> String {
        let minutes = Int(interval) / 60
        let seconds = Int(interval) % 60
        return String(format: "%02d:%02d", minutes, seconds)
    }
    
    private func playAlarm() {
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.error) // Strong haptic
    }
    
    private func scheduleNotification(duration: TimeInterval) {
        let content = UNMutableNotificationContent()
        content.title = "Pause Beendet!"
        content.body = "Deine Pause ist vorbei. Bitte kehre an deinen Platz zurück."
        content.sound = .default
        
        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: duration, repeats: false)
        let request = UNNotificationRequest(identifier: "PauseTimerEnd", content: content, trigger: trigger)
        
        UNUserNotificationCenter.current().add(request) { error in
            if let error = error {
                print("Error scheduling notification: \(error)")
            }
        }
    }
}

#Preview {
    PausenTimerView()
}
