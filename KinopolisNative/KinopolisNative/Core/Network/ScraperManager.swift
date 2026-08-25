import Foundation
import SwiftSoup

class ScraperManager {
    static let shared = ScraperManager()
    
    enum ScraperError: Error {
        case invalidURL
        case networkError
        case parsingError
    }
    
    func fetchSessions(location: String = "su", dateStr: String) async throws -> [HallData] {
        // 1. Try Live Cloudflare Backend (Instant, pre-parsed, accurate FSK & capacity)
        let backendUrlString = "https://kinopolis.artjombecker.com/api/sessions?location=\(location)&date=\(dateStr)"
        if let backendUrl = URL(string: backendUrlString) {
            var request = URLRequest(url: backendUrl)
            request.timeoutInterval = 10
            if let (data, response) = try? await URLSession.shared.data(for: request),
               let http = response as? HTTPURLResponse, http.statusCode == 200 {
                do {
                    let decoded = try JSONDecoder().decode([HallData].self, from: data)
                    if !decoded.isEmpty {
                        return filterHalls(decoded, location: location)
                    }
                } catch {
                    print("Backend JSON decode fallback: \(error)")
                }
            }
        }
        
        // 2. Direct Scraper Fallback
        let urlString = "https://www.kinopolis.de/\(location)/programm?date=\(dateStr)"
        guard let url = URL(string: urlString) else {
            throw ScraperError.invalidURL
        }
        
        var request = URLRequest(url: url)
        request.setValue("Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1", forHTTPHeaderField: "User-Agent")
        
        let (data, _) = try await URLSession.shared.data(for: request)
        guard let html = String(data: data, encoding: .utf8) else {
            throw ScraperError.parsingError
        }
        
        return try parseHTML(html: html, location: location, dateStr: dateStr)
    }
    
    private func parseHTML(html: String, location: String, dateStr: String) throws -> [HallData] {
        let document = try SwiftSoup.parse(html)
        var allSessions: [Session] = []
        
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"
        let targetDate = dateFormatter.date(from: dateStr) ?? Date()
        let isToday = Calendar.current.isDateInToday(targetDate)
        let isTomorrow = Calendar.current.isDateInTomorrow(targetDate)
        
        let dayNum = Calendar.current.component(.day, from: targetDate)
        let monthNum = Calendar.current.component(.month, from: targetDate)
        let shortDateStr = String(format: "%02d.%02d", dayNum, monthNum)
        
        var allowedPerformanceIds = Set<String>()
        
        // Find allowed performance IDs
        let navItems = try document.select(".prog-nav__item")
        for navEl in navItems {
            let navText = try navEl.text().lowercased()
            var matchesDate = false
            
            if isToday && navText.contains("heute") { matchesDate = true }
            else if isTomorrow && navText.contains("morgen") { matchesDate = true }
            else if navText.contains(shortDateStr) { matchesDate = true }
            
            if matchesDate {
                let idsAttr = try navEl.attr("data-performance-ids")
                let cleaned = idsAttr.replacingOccurrences(of: "[", with: "").replacingOccurrences(of: "]", with: "")
                let ids = cleaned.split(separator: ",").map { String($0).trimmingCharacters(in: .whitespaces) }
                for id in ids where !id.isEmpty {
                    allowedPerformanceIds.insert(id)
                }
            }
        }
        
        // Parse Movies
        let movieElements = try document.select("section.movie, .prog2__movie")
        for movieEl in movieElements {
            guard let title = try movieEl.select(".hl-link, .prog2__movie-title").first()?.text().trimmingCharacters(in: .whitespacesAndNewlines), !title.isEmpty else {
                continue
            }
            
            let durationText = try movieEl.select(".movie__specs-el, .prog2__movie-info-item, .prog2__infos").text().trimmingCharacters(in: .whitespacesAndNewlines)
            
            var duration: Int? = nil
            if let range = durationText.range(of: #"(\d+)\s*Min"#, options: .regularExpression) {
                let minutesStr = durationText[range].replacingOccurrences(of: "Min", with: "").trimmingCharacters(in: .whitespaces)
                duration = Int(minutesStr)
            }
            
            // Extract FSK (0, 6, 12, 16, 18)
            var fskStr = "FSK 12"
            let fullInfoText = try movieEl.text()
            if let fskMatch = fullInfoText.range(of: #"(?:FSK|ab)\s*(\d+)"#, options: .regularExpression) {
                let rawMatch = String(fullInfoText[fskMatch])
                let digits = rawMatch.components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
                if let age = Int(digits), [0, 6, 12, 16, 18].contains(age) {
                    fskStr = "FSK \(age)"
                }
            } else if fullInfoText.contains("ohne Altersbeschränkung") || fullInfoText.contains("FSK 0") {
                fskStr = "FSK 0"
            }
            
            var seenSessions = Set<String>()
            
            let sessionElements = try movieEl.select(".prog2__cont, .prog2__movie-session")
            for sessionEl in sessionElements {
                let perfId = try sessionEl.attr("data-performance-id")
                
                if !allowedPerformanceIds.isEmpty && !perfId.isEmpty && !allowedPerformanceIds.contains(perfId) {
                    continue
                }
                
                let time = try sessionEl.select(".prog2__time").first()?.text().trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
                if time.isEmpty { continue }
                
                var hall = try sessionEl.select(".prog2__hall-num > div:first-child").text().trimmingCharacters(in: .whitespacesAndNewlines)
                if hall.isEmpty {
                    hall = try sessionEl.select(".prog2__hall-num").text().trimmingCharacters(in: .whitespacesAndNewlines)
                    if hall.hasSuffix("i") {
                        hall = String(hall.dropLast()).trimmingCharacters(in: .whitespaces)
                    }
                }
                
                let sessionKey = "\(time)-\(hall)"
                if seenSessions.contains(sessionKey) { continue }
                seenSessions.insert(sessionKey)
                
                // Parse capacity and sold
                var capacity = 0
                var freePercent = 95
                
                let seatsEl = try sessionEl.select(".prog2__seats")
                if !seatsEl.isEmpty() {
                    let seatsText = try seatsEl.text().components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
                    capacity = Int(seatsText) ?? 0
                }
                
                let scaleEl = try sessionEl.select(".prog2__scale")
                if !scaleEl.isEmpty() {
                    let scaleText = try scaleEl.text()
                    if let range = scaleText.range(of: #"\d+"#, options: .regularExpression) {
                        freePercent = Int(scaleText[range]) ?? 95
                    }
                }
                
                let sold = Int(Double(capacity) * (1.0 - Double(freePercent) / 100.0))
                
                let session = Session(title: title, time: time, sold: sold, capacity: capacity, hall: hall, duration: duration, fsk: fskStr)
                allSessions.append(session)
            }
        }
        
        // Filter out Darmstadt extra events (strict separation KP vs CD vs RX)
        let cdHallKeywords = ["helia", "pali", "rex", "classic", "broadway", "bambi", "festival"]
        if location.lowercased() == "kp" {
            allSessions = allSessions.filter { s in
                guard let h = s.hall?.lowercased() else { return true }
                return !cdHallKeywords.contains { h.contains($0) }
            }
        } else if location.lowercased() == "cd" {
            allSessions = allSessions.filter { s in
                guard let h = s.hall?.lowercased() else { return false }
                return cdHallKeywords.contains { h.contains($0) }
            }
        } else if location.lowercased() == "rx" {
            allSessions = allSessions.filter { s in
                guard let h = s.hall?.lowercased() else { return false }
                return h.contains("rex")
            }
        }
        
        // Group by Hall
        var grouped: [String: [Session]] = [:]
        for s in allSessions {
            guard let hallName = s.hall else { continue }
            grouped[hallName, default: []].append(s)
        }
        
        var hallDataList: [HallData] = []
        for (hallName, sessions) in grouped {
            // Sort sessions by time
            let sortedSessions = sessions.sorted { $0.time < $1.time }
            hallDataList.append(HallData(name: hallName, sessions: sortedSessions))
        }
        
        // Sort halls by name naturally (Kino 1, Kino 2, Kino 10)
        hallDataList.sort { a, b in
            a.name.localizedStandardCompare(b.name) == .orderedAscending
        }
        
        return hallDataList
    }
    
    private func filterHalls(_ halls: [HallData], location: String) -> [HallData] {
        let cdHallKeywords = ["helia", "pali", "rex", "classic", "broadway", "bambi", "festival"]
        if location.lowercased() == "kp" {
            return halls.filter { hall in
                let name = hall.name.lowercased()
                return !cdHallKeywords.contains { name.contains($0) }
            }
        } else if location.lowercased() == "cd" {
            return halls.filter { hall in
                let name = hall.name.lowercased()
                return cdHallKeywords.contains { name.contains($0) }
            }
        } else if location.lowercased() == "rx" {
            return halls.filter { hall in
                hall.name.lowercased().contains("rex")
            }
        }
        return halls
    }
}
