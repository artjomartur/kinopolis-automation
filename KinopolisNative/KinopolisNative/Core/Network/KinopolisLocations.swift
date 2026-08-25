import Foundation

struct KinopolisLocation: Identifiable, Hashable {
    let slug: String
    let name: String
    var id: String { slug }
}

struct LocationData {
    static let all: [KinopolisLocation] = [
        KinopolisLocation(slug: "su", name: "Sulzbach / Main-Taunus (MTZ)"),
        KinopolisLocation(slug: "ab", name: "Aschaffenburg"),
        KinopolisLocation(slug: "bh", name: "Bad Homburg"),
        KinopolisLocation(slug: "bn", name: "Bonn"),
        KinopolisLocation(slug: "kp", name: "Darmstadt: KINOPOLIS"),
        KinopolisLocation(slug: "cd", name: "Darmstadt: Citydome"),
        KinopolisLocation(slug: "rx", name: "Darmstadt: Rex"),
        KinopolisLocation(slug: "fr", name: "Freiberg"),
        KinopolisLocation(slug: "gi", name: "Gießen: Kinocenter"),
        KinopolisLocation(slug: "kg", name: "Gießen: KINOPOLIS"),
        KinopolisLocation(slug: "hh", name: "Hamburg HafenCity"),
        KinopolisLocation(slug: "hu", name: "Hanau: KINOPOLIS"),
        KinopolisLocation(slug: "ka", name: "Karlsruhe: Universum-City"),
        KinopolisLocation(slug: "ko", name: "Koblenz: KINOPOLIS"),
        KinopolisLocation(slug: "lh", name: "Landshut: KINOPOLIS"),
        KinopolisLocation(slug: "mg", name: "Mönchengladbach"),
        KinopolisLocation(slug: "vi", name: "Rhein-Neckar / Viernheim (RNZ)"),
        KinopolisLocation(slug: "ro", name: "Rosenheim: KINOPOLIS")
    ]
    
    static func name(for slug: String) -> String {
        all.first(where: { $0.slug.lowercased() == slug.lowercased() })?.name ?? slug.uppercased()
    }
}
