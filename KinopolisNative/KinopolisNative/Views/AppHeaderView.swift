import SwiftUI

struct AppHeaderView<TrailingContent: View>: View {
    let imageName: String
    let subtitle: String
    let title: String
    let trailing: TrailingContent
    
    @AppStorage("selectedLocation") private var selectedLocation = "su"
    
    init(
        imageName: String = "Oli",
        subtitle: String,
        title: String,
        @ViewBuilder trailing: () -> TrailingContent = { EmptyView() }
    ) {
        self.imageName = imageName
        self.subtitle = subtitle
        self.title = title
        self.trailing = trailing()
    }
    
    var body: some View {
        HStack(spacing: 16) {
            Image(imageName)
                .resizable()
                .scaledToFit()
                .frame(width: 90, height: 90)
                .clipShape(Circle())
                .shadow(color: Color.black.opacity(0.4), radius: 6, x: 0, y: 3)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(subtitle)
                    .font(.caption)
                    .fontWeight(.medium)
                    .foregroundColor(.gray)
                
                Text(title)
                    .font(.title2)
                    .fontWeight(.heavy)
                    .foregroundColor(.white)
                    .lineLimit(1)
                
                HStack(spacing: 4) {
                    Image(systemName: "mappin.circle.fill")
                        .font(.caption2)
                    Text(LocationData.name(for: selectedLocation))
                        .font(.caption2)
                        .fontWeight(.bold)
                        .lineLimit(1)
                }
                .foregroundColor(.red)
                .padding(.horizontal, 8)
                .padding(.vertical, 3)
                .background(Color.red.opacity(0.15))
                .cornerRadius(6)
            }
            
            Spacer()
            
            trailing
        }
        .padding(.horizontal, 16)
        .padding(.top, 16)
        .padding(.bottom, 4)
    }
}
