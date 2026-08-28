import SwiftUI
import Combine
import AudioToolbox
import AVFoundation

// MARK: - Models
struct AchievementBadge: Identifiable {
    let id = UUID()
    let title: String
    let description: String
    let icon: String
    let xpReward: Int
    let isUnlocked: Bool
    let progress: Double // 0.0 to 1.0
    let progressText: String
}

// MARK: - Sound Helper
class OliSoundHelper {
    static let shared = OliSoundHelper()
    private let synthesizer = AVSpeechSynthesizer()
    
    func playSystemSound(_ id: SystemSoundID) {
        AudioServicesPlaySystemSound(id)
        let generator = UIImpactFeedbackGenerator(style: .medium)
        generator.impactOccurred()
    }
    
    func speakOli(_ text: String) {
        if synthesizer.isSpeaking {
            synthesizer.stopSpeaking(at: .immediate)
        }
        
        let utterance = AVSpeechUtterance(string: text)
        utterance.voice = AVSpeechSynthesisVoice(language: "de-DE")
        utterance.rate = 0.52
        utterance.pitchMultiplier = 1.15
        synthesizer.speak(utterance)
        
        let generator = UIImpactFeedbackGenerator(style: .heavy)
        generator.impactOccurred()
    }
}

// MARK: - Main View
struct OliSoundboardView: View {
    @Environment(\.dismiss) private var dismiss
    @AppStorage("userXP") private var userXP: Int = 120
    @State private var selectedTab = 0 // 0: Soundboard, 1: Erfolge & Badges
    
    var badges: [AchievementBadge] {
        [
            AchievementBadge(
                title: "🎟️ Ticket-Master",
                description: "Über 100 Tickets am Einlass gescannt.",
                icon: "qrcode.viewfinder",
                xpReward: 50,
                isUnlocked: true,
                progress: 1.0,
                progressText: "142 / 100 Scans ✓"
            ),
            AchievementBadge(
                title: "🧹 Sauberkeits-König",
                description: "25 Säle nach der Vorstellung gereinigt.",
                icon: "sparkles",
                xpReward: 75,
                isUnlocked: true,
                progress: 1.0,
                progressText: "28 / 25 Auslässe ✓"
            ),
            AchievementBadge(
                title: "🌙 Nachtschicht-Hero",
                description: "5 Schichten nach Mitternacht absolviert.",
                icon: "moon.stars.fill",
                xpReward: 100,
                isUnlocked: userXP >= 150,
                progress: min(1.0, Double(userXP) / 150.0),
                progressText: "\(min(5, userXP / 30)) / 5 Nachtschichten"
            ),
            AchievementBadge(
                title: "🍿 Popcorn-Großmeister",
                description: "50 Kessel Popcorn perfekt zubereitet.",
                icon: "popcorn.fill",
                xpReward: 80,
                isUnlocked: false,
                progress: 0.65,
                progressText: "32 / 50 Kessel"
            ),
            AchievementBadge(
                title: "🎒 Fundbüro-Detektiv",
                description: "10 verlorene Gegenstände an Gäste ausgehändigt.",
                icon: "bag.fill",
                xpReward: 60,
                isUnlocked: false,
                progress: 0.40,
                progressText: "4 / 10 Fundsachen"
            )
        ]
    }
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(UIColor.systemBackground).ignoresSafeArea()
                
                VStack(spacing: 0) {
                    
                    Picker("Bereich", selection: $selectedTab) {
                        Text("🔊 Soundboard").tag(0)
                        Text("🏆 Erfolge (\(badges.filter { $0.isUnlocked }.count))").tag(1)
                    }
                    .pickerStyle(SegmentedPickerStyle())
                    .padding(.horizontal, 16)
                    .padding(.top, 12)
                    .padding(.bottom, 12)
                    
                    if selectedTab == 0 {
                        // TAB 0: SOUNDBOARD
                        ScrollView {
                            VStack(spacing: 16) {
                                
                                // Oli Mascot Header
                                HStack(spacing: 14) {
                                    Image("Oli_Success_bgless")
                                        .resizable()
                                        .scaledToFit()
                                        .frame(width: 60, height: 60)
                                        .clipShape(Circle())
                                    
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text("Olis Kino-Soundboard")
                                            .font(.headline)
                                            .fontWeight(.bold)
                                            .foregroundColor(.primary)
                                        Text("Kino-Gongs, Funk-Cues & lustige Team-Durchsagen.")
                                            .font(.caption)
                                            .foregroundColor(.gray)
                                    }
                                }
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .padding(14)
                                .background(Color.white.opacity(0.04))
                                .cornerRadius(16)
                                .padding(.horizontal, 16)
                                
                                // 1. KLASSISCHE KINO-SOUNDS
                                VStack(alignment: .leading, spacing: 10) {
                                    Text("🎬 Kino-Klassiker & Cues")
                                        .font(.subheadline)
                                        .fontWeight(.bold)
                                        .foregroundColor(.gray)
                                        .padding(.horizontal, 16)
                                    
                                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                                        SoundButton(title: "3-Klang Gong", icon: "bell.fill", color: .yellow) {
                                            OliSoundHelper.shared.playSystemSound(1025)
                                        }
                                        
                                        SoundButton(title: "Kassen-Chime", icon: "creditcard.fill", color: .green) {
                                            OliSoundHelper.shared.playSystemSound(1054)
                                        }
                                        
                                        SoundButton(title: "Funk-Piepton", icon: "dot.radiowaves.left.and.right", color: .blue) {
                                            OliSoundHelper.shared.playSystemSound(1052)
                                        }
                                        
                                        SoundButton(title: "Einlass-Alarm", icon: "exclamationmark.triangle.fill", color: .red) {
                                            OliSoundHelper.shared.playSystemSound(1053)
                                        }
                                    }
                                    .padding(.horizontal, 16)
                                }
                                
                                // 2. OLI DURCHSAGEN (SPRACHE)
                                VStack(alignment: .leading, spacing: 10) {
                                    Text("🐻 Olis Team-Durchsagen")
                                        .font(.subheadline)
                                        .fontWeight(.bold)
                                        .foregroundColor(.gray)
                                        .padding(.horizontal, 16)
                                    
                                    VStack(spacing: 10) {
                                        OliVoiceButton(
                                            title: "„Saal 4 bitte zur Reinigung!“",
                                            subtitle: "Auslass-Ruf für das Einlass-Team",
                                            textToSpeak: "Achtung Team! Saal 4 ist ausgelaufen. Bitte zügig zur Reinigung bereitmachen!"
                                        )
                                        
                                        OliVoiceButton(
                                            title: "„Popcorn-Nachschub an Kasse!“",
                                            subtitle: "Theken-Ruf an die Küche",
                                            textToSpeak: "Popcorn wird knapp an der Theke! Bitte frischen Kessel süß starten!"
                                        )
                                        
                                        OliVoiceButton(
                                            title: "„Schicht erfolgreich beendet! 🍿“",
                                            subtitle: "Feierabend-Jingle",
                                            textToSpeak: "Super Arbeit heute Team! Die Schicht ist offiziell geschafft. Guten Feierabend!"
                                        )
                                        
                                        OliVoiceButton(
                                            title: "„Einlass gestartet – Film beginnt gleich!“",
                                            subtitle: "Gäste-Durchsage",
                                            textToSpeak: "Sehr geehrte Kinogäste, der Einlass für die nächste Vorstellung hat begonnen. Bitte halten Sie Ihre Tickets bereit."
                                        )
                                    }
                                    .padding(.horizontal, 16)
                                }
                                
                                Spacer().frame(height: 30)
                            }
                            .padding(.top, 6)
                        }
                    } else {
                        // TAB 1: ERFOLGE & BADGES
                        ScrollView {
                            VStack(spacing: 14) {
                                
                                // XP Level Header
                                HStack {
                                    VStack(alignment: .leading, spacing: 4) {
                                        Text("Dein Mitarbeiter-Rang")
                                            .font(.caption)
                                            .foregroundColor(.gray)
                                        Text("Level \((userXP / 150) + 1) • Kino-Experte")
                                            .font(.title3)
                                            .fontWeight(.heavy)
                                            .foregroundColor(.yellow)
                                    }
                                    Spacer()
                                    Text("\(userXP) XP")
                                        .font(.headline)
                                        .fontWeight(.bold)
                                        .foregroundColor(.primary)
                                        .padding(.horizontal, 12)
                                        .padding(.vertical, 6)
                                        .background(Color.yellow.opacity(0.2))
                                        .cornerRadius(10)
                                }
                                .padding(16)
                                .background(Color.white.opacity(0.04))
                                .cornerRadius(18)
                                .padding(.horizontal, 16)
                                
                                ForEach(badges) { badge in
                                    AchievementRow(badge: badge)
                                }
                                .padding(.horizontal, 16)
                                
                                Spacer().frame(height: 30)
                            }
                            .padding(.top, 6)
                        }
                    }
                }
            }
            .navigationTitle("🎮 Oli Soundboard & Fun")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Schließen") { dismiss() }
                        .foregroundColor(.red)
                        .fontWeight(.bold)
                }
            }
        }
    }
}

// MARK: - Sound Buttons
struct SoundButton: View {
    let title: String
    let icon: String
    let color: Color
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 10) {
                Image(systemName: icon)
                    .font(.system(size: 26))
                    .foregroundColor(color)
                
                Text(title)
                    .font(.subheadline)
                    .fontWeight(.bold)
                    .foregroundColor(.primary)
                    .lineLimit(1)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 18)
            .background(Color.white.opacity(0.05))
            .cornerRadius(16)
            .overlay(RoundedRectangle(cornerRadius: 16).stroke(color.opacity(0.3), lineWidth: 1))
        }
    }
}

struct OliVoiceButton: View {
    let title: String
    let subtitle: String
    let textToSpeak: String
    
    var body: some View {
        Button(action: {
            OliSoundHelper.shared.speakOli(textToSpeak)
        }) {
            HStack(spacing: 14) {
                Image(systemName: "speaker.wave.3.fill")
                    .font(.title3)
                    .foregroundColor(.orange)
                    .frame(width: 30)
                
                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(.subheadline)
                        .fontWeight(.bold)
                        .foregroundColor(.primary)
                    Text(subtitle)
                        .font(.caption)
                        .foregroundColor(.gray)
                }
                
                Spacer()
                
                Image(systemName: "play.circle.fill")
                    .font(.title3)
                    .foregroundColor(.orange)
            }
            .padding(14)
            .background(Color.white.opacity(0.04))
            .cornerRadius(14)
        }
    }
}

struct AchievementRow: View {
    let badge: AchievementBadge
    
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(spacing: 12) {
                Image(systemName: badge.icon)
                    .font(.title2)
                    .foregroundColor(badge.isUnlocked ? .yellow : .gray)
                    .frame(width: 32)
                
                VStack(alignment: .leading, spacing: 2) {
                    HStack {
                        Text(badge.title)
                            .font(.subheadline)
                            .fontWeight(.bold)
                            .foregroundColor(badge.isUnlocked ? .white : .gray)
                        Spacer()
                        Text("+\(badge.xpReward) XP")
                            .font(.caption2)
                            .fontWeight(.bold)
                            .foregroundColor(badge.isUnlocked ? .yellow : .gray)
                    }
                    
                    Text(badge.description)
                        .font(.caption)
                        .foregroundColor(.gray)
                }
            }
            
            // Progress bar
            VStack(alignment: .leading, spacing: 4) {
                GeometryReader { geo in
                    ZStack(alignment: .leading) {
                        Capsule().fill(Color.white.opacity(0.08)).frame(height: 6)
                        Capsule()
                            .fill(badge.isUnlocked ? Color.green : Color.orange)
                            .frame(width: geo.size.width * CGFloat(badge.progress), height: 6)
                    }
                }
                .frame(height: 6)
                
                Text(badge.progressText)
                    .font(.system(size: 10, weight: .bold))
                    .foregroundColor(badge.isUnlocked ? .green : .gray)
            }
        }
        .padding(14)
        .background(Color.white.opacity(0.04))
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(badge.isUnlocked ? Color.yellow.opacity(0.3) : Color.white.opacity(0.06), lineWidth: 1)
        )
    }
}
