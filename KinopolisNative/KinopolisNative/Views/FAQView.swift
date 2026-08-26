import SwiftUI

struct FAQView: View {
    @Environment(\.dismiss) var dismiss
    
    let faqs: [(String, String)] = [
        ("FSK Regeln", "Kinder unter 12 Jahren dürfen in FSK 12 Filme, wenn sie von einer personensorgeberechtigten Person (Eltern) begleitet werden. Andere Erziehungsbeauftragte reichen nicht."),
        ("Parkrabatt", "Gäste bekommen an der Kasse oder am Entwerter 2 Stunden Parken geschenkt. Ticket muss ins Lesegerät gesteckt werden."),
        ("Snack Preise", "Popcorn Groß: 7.90€\nNachos Groß: 8.50€\nCola 1L: 5.90€\nKombi-Menü (Popcorn + Cola): 12.50€"),
        ("Rollstuhlplätze", "Saal 1, 2 und 3 haben Rollstuhlplätze in der letzten Reihe. Saal 4 und 5 haben diese in der ersten Reihe."),
        ("Altersnachweis", "Bei FSK 16 und 18 Filmen herrscht strikte Ausweispflicht, falls das Alter nicht eindeutig ersichtlich ist. Schülerausweis mit Bild reicht aus.")
    ]
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(red: 24/255, green: 24/255, blue: 26/255).ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: 20) {
                        
                        Text("Gäste-FAQ Bot")
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                            .padding(.top)
                        
                        Text("Häufige Gästefragen schnell beantwortet.")
                            .font(.subheadline)
                            .foregroundColor(.gray)
                        
                        ForEach(faqs, id: \.0) { faq in
                            DisclosureGroup {
                                Text(faq.1)
                                    .font(.subheadline)
                                    .foregroundColor(.gray)
                                    .padding(.top, 8)
                                    .multilineTextAlignment(.leading)
                                    .frame(maxWidth: .infinity, alignment: .leading)
                            } label: {
                                Text(faq.0)
                                    .font(.headline)
                                    .foregroundColor(.white)
                            }
                            .padding()
                            .background(Color.white.opacity(0.05))
                            .cornerRadius(12)
                            .tint(.blue)
                        }
                    }
                    .padding()
                }
            }
            .navigationTitle("Gäste-FAQ")
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
}
