import SwiftUI

struct ActionView: View {
    @EnvironmentObject var authManager: AuthManager
    
    // Shift state
    @AppStorage("isShiftActive") private var isShiftActive = false
    @AppStorage("shiftStartTime") private var shiftStartTime: Double = 0
    @AppStorage("userXP") private var userXP: Int = 120
    @AppStorage("selectedDept") private var selectedDept = "alles"
    
    // Checklist State
    @State private var checklistItems: [ChecklistItem] = [
        ChecklistItem(title: "Saal 1-4 Rundgang & Becherkontrolle", isCompleted: false),
        ChecklistItem(title: "Popcorn-Warmhalter auffüllen", isCompleted: true),
        ChecklistItem(title: "Nachos-Käsespender Temperatur prüfen", isCompleted: false),
        ChecklistItem(title: "Einlass-Scanner Akkus geladen", isCompleted: true),
        ChecklistItem(title: "MHD-Prüfung Kühlhaus erledigt", isCompleted: false)
    ]
    
    // Announcement state
    @State private var announcementText = ""
    @State private var showAnnouncementToast = false
    
    var body: some View {
        ZStack {
            Color(red: 24/255, green: 24/255, blue: 26/255).ignoresSafeArea()
            
            ScrollView {
                VStack(spacing: 20) {
                    // Header
                    HStack(spacing: 14) {
                        Image("Oli_2_bgless")
                            .resizable()
                            .scaledToFit()
                            .frame(height: 55)
                        
                        VStack(alignment: .leading, spacing: 2) {
                            Text("Team & Aktionen")
                                .font(.title2)
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                            Text("Tools & Schicht-Management")
                                .font(.subheadline)
                                .foregroundColor(.gray)
                        }
                        
                        Spacer()
                    }
                    .padding(.horizontal)
                    .padding(.top, 16)
                    
                    // 1. SCHICHT-CONTROL CARD
                    VStack(spacing: 14) {
                        HStack {
                            VStack(alignment: .leading, spacing: 4) {
                                HStack(spacing: 8) {
                                    Circle()
                                        .fill(isShiftActive ? Color.green : Color.gray)
                                        .frame(width: 10, height: 10)
                                    Text(isShiftActive ? "SCHICHT LÄUFT" : "KEINE SCHICHT AKTIV")
                                        .font(.caption)
                                        .fontWeight(.heavy)
                                        .foregroundColor(isShiftActive ? .green : .gray)
                                        .tracking(1)
                                }
                                
                                Text(isShiftActive ? "Seit \(formattedStartTime()) eingestempelt" : "Tippe zum Einstempeln")
                                    .font(.subheadline)
                                    .foregroundColor(.white)
                            }
                            
                            Spacer()
                            
                            HStack(spacing: 4) {
                                Text("⭐️ \(userXP) XP")
                                    .font(.subheadline)
                                    .fontWeight(.bold)
                                    .foregroundColor(.yellow)
                            }
                            .padding(.horizontal, 10)
                            .padding(.vertical, 6)
                            .background(Color.yellow.opacity(0.15))
                            .cornerRadius(10)
                        }
                        
                        // Shift Button
                        Button(action: toggleShift) {
                            HStack(spacing: 10) {
                                Image(systemName: isShiftActive ? "stop.circle.fill" : "play.circle.fill")
                                    .font(.title3)
                                Text(isShiftActive ? "Schicht beenden (+50 XP)" : "Schicht starten")
                                    .fontWeight(.bold)
                            }
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 14)
                            .background(
                                isShiftActive ?
                                LinearGradient(colors: [Color.red, Color(red: 180/255, green: 20/255, blue: 30/255)], startPoint: .leading, endPoint: .trailing) :
                                LinearGradient(colors: [Color.green, Color(red: 34/255, green: 160/255, blue: 85/255)], startPoint: .leading, endPoint: .trailing)
                            )
                            .foregroundColor(.white)
                            .cornerRadius(14)
                            .shadow(color: (isShiftActive ? Color.red : Color.green).opacity(0.3), radius: 8, y: 3)
                        }
                    }
                    .padding(18)
                    .background(Color.white.opacity(0.04))
                    .cornerRadius(20)
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(isShiftActive ? Color.green.opacity(0.3) : Color.white.opacity(0.08), lineWidth: 1)
                    )
                    .padding(.horizontal)
                    
                    // 2. BEREICH / DEPT PICKER
                    VStack(alignment: .leading, spacing: 10) {
                        Text("AKTIVER BEREICH")
                            .font(.system(size: 11, weight: .bold))
                            .foregroundColor(.gray)
                            .padding(.horizontal)
                        
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(spacing: 10) {
                                DeptChip(title: "🎟️ Einlass", id: "einlass", selectedId: $selectedDept)
                                DeptChip(title: "🍿 Theke", id: "theke", selectedId: $selectedDept)
                                DeptChip(title: "💰 Kasse", id: "kasse", selectedId: $selectedDept)
                                DeptChip(title: "👔 TL / BL", id: "tl", selectedId: $selectedDept)
                                DeptChip(title: "🌐 Alles", id: "alles", selectedId: $selectedDept)
                            }
                            .padding(.horizontal)
                        }
                    }
                    
                    // 3. TEAM-CHECKLISTE
                    VStack(alignment: .leading, spacing: 14) {
                        HStack {
                            Image(systemName: "checklist")
                                .foregroundColor(.blue)
                            Text("Schicht-Aufgaben")
                                .font(.headline)
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                            
                            Spacer()
                            
                            let completed = checklistItems.filter { $0.isCompleted }.count
                            Text("\(completed)/\(checklistItems.count)")
                                .font(.caption)
                                .fontWeight(.bold)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 3)
                                .background(Color.blue.opacity(0.2))
                                .foregroundColor(.blue)
                                .cornerRadius(6)
                        }
                        
                        VStack(spacing: 8) {
                            ForEach(checklistItems.indices, id: \.self) { index in
                                Button(action: {
                                    checklistItems[index].isCompleted.toggle()
                                    let generator = UIImpactFeedbackGenerator(style: .light)
                                    generator.impactOccurred()
                                }) {
                                    HStack(spacing: 12) {
                                        Image(systemName: checklistItems[index].isCompleted ? "checkmark.circle.fill" : "circle")
                                            .font(.title3)
                                            .foregroundColor(checklistItems[index].isCompleted ? .green : .gray)
                                        
                                        Text(checklistItems[index].title)
                                            .font(.subheadline)
                                            .foregroundColor(checklistItems[index].isCompleted ? .gray : .white)
                                            .strikethrough(checklistItems[index].isCompleted)
                                        
                                        Spacer()
                                    }
                                    .padding(.vertical, 8)
                                }
                            }
                        }
                    }
                    .padding(18)
                    .background(Color.white.opacity(0.04))
                    .cornerRadius(20)
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(Color.white.opacity(0.08), lineWidth: 1)
                    )
                    .padding(.horizontal)
                    
                    // 4. DURCHSAGE / NOTIZ SCHREIBEN
                    VStack(alignment: .leading, spacing: 14) {
                        HStack {
                            Image(systemName: "megaphone.fill")
                                .foregroundColor(.orange)
                            Text("Team-Mitteilung senden")
                                .font(.headline)
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                            Spacer()
                        }
                        
                        HStack {
                            TextField("Kurze Info für die nächste Schicht...", text: $announcementText)
                                .padding(12)
                                .background(Color.white.opacity(0.06))
                                .cornerRadius(10)
                                .foregroundColor(.white)
                            
                            Button(action: sendAnnouncement) {
                                Image(systemName: "paperplane.fill")
                                    .foregroundColor(.white)
                                    .padding(12)
                                    .background(announcementText.isEmpty ? Color.gray.opacity(0.3) : Color.orange)
                                    .cornerRadius(10)
                            }
                            .disabled(announcementText.isEmpty)
                        }
                    }
                    .padding(18)
                    .background(Color.white.opacity(0.04))
                    .cornerRadius(20)
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(Color.white.opacity(0.08), lineWidth: 1)
                    )
                    .padding(.horizontal)
                    
                    Spacer().frame(height: 100)
                }
            }
            
            // Toast
            if showAnnouncementToast {
                VStack {
                    Spacer()
                    HStack(spacing: 8) {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundColor(.green)
                        Text("Mitteilung ans Team übertragen!")
                            .font(.subheadline)
                            .foregroundColor(.white)
                    }
                    .padding()
                    .background(Color(red: 30/255, green: 30/255, blue: 34/255))
                    .cornerRadius(14)
                    .shadow(radius: 10)
                    .padding(.bottom, 110)
                }
                .transition(.move(edge: .bottom).combined(with: .opacity))
            }
        }
    }
    
    private func toggleShift() {
        let generator = UINotificationFeedbackGenerator()
        if isShiftActive {
            userXP += 50
            isShiftActive = false
            generator.notificationOccurred(.success)
        } else {
            shiftStartTime = Date().timeIntervalSince1970
            isShiftActive = true
            generator.notificationOccurred(.success)
        }
    }
    
    private func formattedStartTime() -> String {
        let date = Date(timeIntervalSince1970: shiftStartTime)
        let formatter = DateFormatter()
        formatter.dateFormat = "HH:mm"
        return formatter.string(from: date)
    }
    
    private func sendAnnouncement() {
        guard !announcementText.isEmpty else { return }
        let textToSend = announcementText
        let author = authManager.currentUser?.name ?? "Mitarbeiter"
        let location = UserDefaults.standard.string(forKey: "selectedLocation") ?? "su"
        announcementText = ""
        
        // Post to live backend
        guard let url = URL(string: "https://kinopolis.artjombecker.com/api/messages") else { return }
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body: [String: Any] = [
            "title": "Mitteilung von \(author)",
            "content": textToSend,
            "author": author,
            "location": location
        ]
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)
        
        URLSession.shared.dataTask(with: request) { _, _, _ in
            DispatchQueue.main.async {
                withAnimation {
                    self.showAnnouncementToast = true
                }
                let generator = UINotificationFeedbackGenerator()
                generator.notificationOccurred(.success)
                
                DispatchQueue.main.asyncAfter(deadline: .now() + 2.5) {
                    withAnimation {
                        self.showAnnouncementToast = false
                    }
                }
            }
        }.resume()
    }
}

// Models & Components
struct ChecklistItem: Identifiable {
    let id = UUID()
    let title: String
    var isCompleted: Bool
}

struct DeptChip: View {
    let title: String
    let id: String
    @Binding var selectedId: String
    
    var isSelected: Bool { selectedId == id }
    
    var body: some View {
        Button(action: {
            selectedId = id
            let generator = UIImpactFeedbackGenerator(style: .light)
            generator.impactOccurred()
        }) {
            Text(title)
                .font(.subheadline)
                .fontWeight(isSelected ? .bold : .medium)
                .foregroundColor(isSelected ? .white : .gray)
                .padding(.horizontal, 14)
                .padding(.vertical, 8)
                .background(isSelected ? Color.red : Color.white.opacity(0.06))
                .cornerRadius(12)
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(isSelected ? Color.red.opacity(0.8) : Color.white.opacity(0.08), lineWidth: 1)
                )
        }
    }
}
