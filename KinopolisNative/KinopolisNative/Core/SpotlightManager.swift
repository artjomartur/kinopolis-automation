import CoreSpotlight
import MobileCoreServices
import Combine
import UniformTypeIdentifiers

class SpotlightManager {
    static let shared = SpotlightManager()
    
    private init() {}
    
    func indexSchicht(title: String, description: String, id: String) {
        let attributeSet = CSSearchableItemAttributeSet(itemContentType: UTType.item.identifier)
        attributeSet.title = title
        attributeSet.contentDescription = description
        attributeSet.keywords = ["Kinopolis", "Schicht", "Kino", "Arbeit", "Dienstplan"]
        
        // Use an internal image if possible, but for now we skip the thumbnail
        
        let item = CSSearchableItem(uniqueIdentifier: id, domainIdentifier: "com.kinopolis.schichten", attributeSet: attributeSet)
        
        CSSearchableIndex.default().indexSearchableItems([item]) { error in
            if let error = error {
                print("Spotlight indexing error: \(error.localizedDescription)")
            } else {
                print("Successfully indexed shift: \(title)")
            }
        }
    }
    
    func setupFakeSpotlightItems() {
        indexSchicht(
            title: "🍿 Nächste Schicht: Kasse",
            description: "Heute von 16:00 bis 23:30 Uhr im Main-Taunus Zentrum.",
            id: "schicht_1"
        )
        indexSchicht(
            title: "🎬 Kinopolis Film-Spickzettel",
            description: "Infos über Deadpool & Wolverine, Laufzeiten und FSK.",
            id: "spickzettel_deadpool"
        )
    }
}
