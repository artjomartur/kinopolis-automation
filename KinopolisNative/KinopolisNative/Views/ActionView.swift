import SwiftUI

struct ActionView: View {
    var body: some View {
        ZStack {
            Color(red: 24/255, green: 24/255, blue: 26/255).ignoresSafeArea()
            
            VStack(spacing: 24) {
                Spacer()
                
                Image("Oli_3_bgless")
                    .resizable()
                    .scaledToFit()
                    .frame(height: 140)
                    .opacity(0.4)
                
                Text("Action-Center")
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                
                Text("Hier werden bald Schnellzugriffe für\nSchichtwechsel, Durchsagen und mehr stehen.")
                    .font(.subheadline)
                    .foregroundColor(.gray)
                    .multilineTextAlignment(.center)
                    .lineSpacing(4)
                    .padding(.horizontal, 40)
                
                Text("Kommt bald! 🚀")
                    .font(.caption)
                    .fontWeight(.bold)
                    .foregroundColor(.red)
                    .padding(.horizontal, 20)
                    .padding(.vertical, 8)
                    .background(Color.red.opacity(0.15))
                    .cornerRadius(20)
                
                Spacer()
                Spacer()
            }
        }
    }
}
