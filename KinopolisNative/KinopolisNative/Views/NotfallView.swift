import SwiftUI

struct NotfallView: View {
    @Environment(\.dismiss) var dismiss
    @State private var helpMessage = ""
    @State private var isHelpSent = false
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(red: 24/255, green: 24/255, blue: 26/255).ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: 20) {
                        
                        // Intro Box
                        VStack(alignment: .leading, spacing: 8) {
                            Text("RUHE BEWAHREN!")
                                .font(.title2)
                                .fontWeight(.black)
                                .foregroundColor(.red)
                            Text("Befolge die untenstehenden Leitfäden für den jeweiligen Notfall. Die eigene Sicherheit und die der Gäste hat höchste Priorität.")
                                .font(.subheadline)
                                .foregroundColor(.white)
                        }
                        .padding()
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(Color.red.opacity(0.15))
                        .cornerRadius(16)
                        .overlay(
                            RoundedRectangle(cornerRadius: 16)
                                .stroke(Color.red.opacity(0.3), lineWidth: 1)
                        )
                        .padding(.horizontal)
                        
                        // Fire Emergency
                        EmergencyCard(
                            title: "Feueralarm / Brand",
                            icon: "flame.fill",
                            color: .red,
                            steps: [
                                "1. Ruhe bewahren. Ggf. Handfeuermelder betätigen.",
                                "2. TL/BL über Funk informieren (Kanal 1).",
                                "3. Wenn möglich, Licht in den Sälen einschalten.",
                                "4. Gäste beruhigen und zu den Notausgängen leiten.",
                                "5. Sammelplatz aufsuchen und auf Feuerwehr warten."
                            ]
                        )
                        
                        // Medical Emergency
                        EmergencyCard(
                            title: "Medizinischer Notfall",
                            icon: "cross.case.fill",
                            color: .blue,
                            steps: [
                                "1. Rettungsdienst rufen (112).",
                                "2. TL/BL über Funk informieren.",
                                "3. Erste Hilfe leisten (Defibrillator im Foyer).",
                                "4. Schaulustige auf Abstand halten.",
                                "5. Sanitäter am Eingang einweisen."
                            ],
                            phoneNumber: "112"
                        )
                        
                        // Aggressive Guest
                        EmergencyCard(
                            title: "Aggressiver Gast / Hausrecht",
                            icon: "exclamationmark.triangle.fill",
                            color: .orange,
                            steps: [
                                "1. Nicht provozieren lassen, höflich bleiben.",
                                "2. Sofort TL/BL oder Security per Funk hinzuziehen.",
                                "3. Ggf. Abstand halten und Polizei (110) rufen, falls Situation eskaliert.",
                                "4. Vorfall im Schichtbericht dokumentieren."
                            ],
                            phoneNumber: "110"
                        )
                        
                        // Custom Help Request
                        VStack(alignment: .leading, spacing: 14) {
                            HStack {
                                Image(systemName: "lifepreserver.fill")
                                    .font(.title2)
                                    .foregroundColor(.yellow)
                                Text("Individuelle Hilfe anfordern")
                                    .font(.headline)
                                    .fontWeight(.bold)
                                    .foregroundColor(.white)
                            }
                            
                            if isHelpSent {
                                HStack {
                                    Image(systemName: "checkmark.circle.fill")
                                        .foregroundColor(.green)
                                    Text("Dein Hilferuf wurde gesendet. Die Leitung ist auf dem Weg!")
                                        .font(.subheadline)
                                        .foregroundColor(.green)
                                        .fontWeight(.medium)
                                }
                                .padding()
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .background(Color.green.opacity(0.15))
                                .cornerRadius(8)
                            } else {
                                Text("Beschreibe kurz, wobei du Hilfe brauchst. Die TL/BL wird sofort benachrichtigt.")
                                    .font(.subheadline)
                                    .foregroundColor(.gray)
                                
                                TextEditor(text: $helpMessage)
                                    .frame(height: 80)
                                    .padding(8)
                                    .background(Color.white.opacity(0.1))
                                    .cornerRadius(8)
                                    .foregroundColor(.white)
                                    .scrollContentBackground(.hidden)
                                
                                Button(action: {
                                    isHelpSent = true
                                    DispatchQueue.main.asyncAfter(deadline: .now() + 3.0) {
                                        isHelpSent = false
                                        helpMessage = ""
                                    }
                                }) {
                                    Text("Hilferuf absetzen")
                                        .fontWeight(.bold)
                                        .frame(maxWidth: .infinity)
                                        .padding()
                                        .background(Color.yellow)
                                        .foregroundColor(.black)
                                        .cornerRadius(12)
                                }
                                .disabled(helpMessage.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
                                .opacity(helpMessage.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? 0.5 : 1.0)
                            }
                        }
                        .padding(18)
                        .background(Color.white.opacity(0.04))
                        .cornerRadius(16)
                        .padding(.horizontal)
                        
                    }
                    .padding(.vertical)
                }
            }
            .navigationTitle("Notfall-Protokolle")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Schließen") {
                        dismiss()
                    }
                    .fontWeight(.bold)
                    .foregroundColor(.red)
                }
            }
        }
    }
}

struct EmergencyCard: View {
    let title: String
    let icon: String
    let color: Color
    let steps: [String]
    var phoneNumber: String? = nil
    
    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack {
                Image(systemName: icon)
                    .font(.title2)
                    .foregroundColor(color)
                Text(title)
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                Spacer()
            }
            
            VStack(alignment: .leading, spacing: 10) {
                ForEach(steps, id: \.self) { step in
                    HStack(alignment: .top) {
                        Text("•")
                            .foregroundColor(.gray)
                        Text(step)
                            .font(.subheadline)
                            .foregroundColor(.gray)
                    }
                }
            }
            
            if let phone = phoneNumber {
                Button(action: {
                    if let url = URL(string: "tel://\(phone)") {
                        UIApplication.shared.open(url)
                    }
                }) {
                    HStack {
                        Image(systemName: "phone.circle.fill")
                        Text("\(phone) Anrufen")
                            .fontWeight(.bold)
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(color)
                    .foregroundColor(.white)
                    .cornerRadius(12)
                }
                .padding(.top, 4)
            }
        }
        .padding(18)
        .background(Color.white.opacity(0.04))
        .cornerRadius(16)
        .padding(.horizontal)
    }
}

#Preview {
    NotfallView()
}
