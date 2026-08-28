import SwiftUI
import EventKit
import Combine

// MARK: - Shift Model
struct ShiftItem: Identifiable, Codable {
    var id = UUID()
    var title: String          // e.g. "Spätschicht Kasse"
    var date: Date             // Day of shift
    var startTime: String      // "16:00"
    var endTime: String        // "23:30"
    var role: String           // "Kasse", "Einlass", "Bar / Popcorn", "Saaldienst", "Teamleiter"
    var hallArea: String?      // "Säle 1-6"
    var notes: String?
    var isCalendarSynced: Bool = false
    
    var roleColor: Color {
        switch role {
        case "Kasse": return .blue
        case "Einlass": return .purple
        case "Bar / Popcorn": return .orange
        case "Saaldienst": return .cyan
        case "Teamleiter": return .red
        default: return .green
        }
    }
}

// MARK: - ViewModel
@MainActor
class DienstplanViewModel: ObservableObject {
    @Published var shifts: [ShiftItem] = []
    @Published var selectedDate = Date()
    @Published var showAddSheet = false
    @Published var syncSuccessMessage: String? = nil
    
    private let eventStore = EKEventStore()
    private let shiftsStorageKey = "saved_dienstplan_shifts"
    
    init() {
        loadShifts()
        if shifts.isEmpty {
            seedSampleShifts()
        }
    }
    
    func shifts(for date: Date) -> [ShiftItem] {
        let cal = Calendar.current
        return shifts.filter { cal.isDate($0.date, inSameDayAs: date) }
    }
    
    var upcomingShifts: [ShiftItem] {
        let now = Calendar.current.startOfDay(for: Date())
        return shifts.filter { $0.date >= now }.sorted { $0.date < $1.date }
    }
    
    var totalHoursThisWeek: Double {
        let cal = Calendar.current
        guard let weekInterval = cal.dateInterval(of: .weekOfYear, for: Date()) else { return 0 }
        
        let weekShifts = shifts.filter { weekInterval.contains($0.date) }
        var totalMinutes: Double = 0
        
        for s in weekShifts {
            let startParts = s.startTime.split(separator: ":").compactMap { Double($0) }
            let endParts = s.endTime.split(separator: ":").compactMap { Double($0) }
            if startParts.count == 2 && endParts.count == 2 {
                let startMins = startParts[0] * 60 + startParts[1]
                var endMins = endParts[0] * 60 + endParts[1]
                if endMins < startMins { endMins += 24 * 60 } // Overnight
                totalMinutes += (endMins - startMins)
            }
        }
        return totalMinutes / 60.0
    }
    
    func addShift(_ shift: ShiftItem) {
        shifts.append(shift)
        saveShifts()
    }
    
    func deleteShift(at offsets: IndexSet) {
        shifts.remove(atOffsets: offsets)
        saveShifts()
    }
    
    func syncAllToAppleCalendar() {
        Task {
            if #available(iOS 17.0, *) {
                let granted = try? await eventStore.requestFullAccessToEvents()
                if granted == true {
                    self.performSync()
                } else {
                    print("Calendar access denied.")
                }
            } else {
                let granted = try? await eventStore.requestAccess(to: .event)
                if granted == true {
                    self.performSync()
                } else {
                    print("Calendar access denied.")
                }
            }
        }
    }
    
    private func performSync() {
        Task { @MainActor [weak self] in
            guard let self = self else { return }
            var addedCount = 0
            
            for index in self.shifts.indices {
                let s = self.shifts[index]
                if !s.isCalendarSynced {
                    if self.addEventToCalendar(shift: s) {
                        self.shifts[index].isCalendarSynced = true
                        addedCount += 1
                    }
                }
            }
            self.saveShifts()
            self.syncSuccessMessage = "\(addedCount) Schichten erfolgreich in deinen Apple Kalender eingetragen!"
            
            let generator = UINotificationFeedbackGenerator()
            generator.notificationOccurred(.success)
        }
    }
    
    private func addEventToCalendar(shift: ShiftItem) -> Bool {
        let cal = Calendar.current
        let startParts = shift.startTime.split(separator: ":").compactMap { Int($0) }
        let endParts = shift.endTime.split(separator: ":").compactMap { Int($0) }
        guard startParts.count == 2, endParts.count == 2 else { return false }
        
        var startComps = cal.dateComponents([.year, .month, .day], from: shift.date)
        startComps.hour = startParts[0]
        startComps.minute = startParts[1]
        
        var endComps = cal.dateComponents([.year, .month, .day], from: shift.date)
        endComps.hour = endParts[0]
        endComps.minute = endParts[1]
        
        guard let startDate = cal.date(from: startComps),
              var endDate = cal.date(from: endComps) else { return false }
        
        if endDate < startDate {
            endDate = cal.date(byAdding: .day, value: 1, to: endDate) ?? endDate
        }
        
        let event = EKEvent(eventStore: eventStore)
        event.title = "🍿 Kinopolis: \(shift.title) (\(shift.role))"
        event.startDate = startDate
        event.endDate = endDate
        event.notes = "Rolle: \(shift.role)\nBereich: \(shift.hallArea ?? "Zentral")\nNotizen: \(shift.notes ?? "-")"
        event.calendar = eventStore.defaultCalendarForNewEvents
        
        // Add alarm 60 minutes before
        let alarm = EKAlarm(relativeOffset: -3600)
        event.addAlarm(alarm)
        
        do {
            try eventStore.save(event, span: .thisEvent)
            return true
        } catch {
            print("Failed to save event to calendar: \(error)")
            return false
        }
    }
    
    private func saveShifts() {
        if let encoded = try? JSONEncoder().encode(shifts) {
            UserDefaults.standard.set(encoded, forKey: shiftsStorageKey)
        }
    }
    
    private func loadShifts() {
        if let data = UserDefaults.standard.data(forKey: shiftsStorageKey),
           let decoded = try? JSONDecoder().decode([ShiftItem].self, from: data) {
            self.shifts = decoded
        }
    }
    
    private func seedSampleShifts() {
        let cal = Calendar.current
        let today = Date()
        let tomorrow = cal.date(byAdding: .day, value: 1, to: today) ?? today
        let in3Days = cal.date(byAdding: .day, value: 3, to: today) ?? today
        let in5Days = cal.date(byAdding: .day, value: 5, to: today) ?? today
        
        shifts = [
            ShiftItem(title: "Spätdienst Bar & Popcorn", date: today, startTime: "17:00", endTime: "23:30", role: "Bar / Popcorn", hallArea: "Foyer EG", notes: "Hauptstoßzeit 19:30 beachten"),
            ShiftItem(title: "Einlass & Saaldienst", date: tomorrow, startTime: "14:30", endTime: "21:00", role: "Einlass", hallArea: "Säle 1-4", notes: "Familiennachmittag"),
            ShiftItem(title: "Kassenleitung Samstag", date: in3Days, startTime: "13:00", endTime: "20:30", role: "Kasse", hallArea: "Kasse 1-3", notes: "Sneak Preview Abend"),
            ShiftItem(title: "Nachtschicht Auslass & Check", date: in5Days, startTime: "19:00", endTime: "01:30", role: "Saaldienst", hallArea: "Alle Säle", notes: "Saalschlussrundgang")
        ]
        saveShifts()
    }
}

// MARK: - Main View
struct DienstplanView: View {
    @Environment(\.dismiss) private var dismiss
    @StateObject private var viewModel = DienstplanViewModel()
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(UIColor.systemBackground).ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: 18) {
                        
                        // Summary Banner
                        weekHoursCard
                        
                        // Action: Calendar Sync
                        calendarSyncButton
                        
                        // Today's Shifts
                        VStack(alignment: .leading, spacing: 12) {
                            HStack {
                                Text("📅 Anstehende Schichten")
                                    .font(.headline)
                                    .fontWeight(.bold)
                                    .foregroundColor(.primary)
                                Spacer()
                                Text("\(viewModel.upcomingShifts.count) Schichten")
                                    .font(.caption)
                                    .foregroundColor(.gray)
                            }
                            .padding(.horizontal, 16)
                            
                            if viewModel.upcomingShifts.isEmpty {
                                Text("Keine anstehenden Schichten eingetragen.")
                                    .font(.subheadline)
                                    .foregroundColor(.gray)
                                    .padding(20)
                            } else {
                                ForEach(viewModel.upcomingShifts) { shift in
                                    ShiftCard(shift: shift)
                                        .padding(.horizontal, 16)
                                }
                            }
                        }
                        
                        Spacer().frame(height: 40)
                    }
                    .padding(.top, 16)
                }
            }
            .navigationTitle("📅 Mein Dienstplan")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button(action: { viewModel.showAddSheet = true }) {
                        Image(systemName: "plus.circle.fill")
                            .font(.title3)
                            .foregroundColor(.yellow)
                    }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Fertig") { dismiss() }
                        .foregroundColor(.red)
                        .fontWeight(.bold)
                }
            }
            .sheet(isPresented: $viewModel.showAddSheet) {
                AddShiftSheet(onAdd: { newShift in
                    viewModel.addShift(newShift)
                })
            }
            .alert(item: Binding(
                get: { viewModel.syncSuccessMessage.map { AlertItem(message: $0) } },
                set: { _ in viewModel.syncSuccessMessage = nil }
            )) { alert in
                Alert(title: Text("Kalender-Sync"), message: Text(alert.message), dismissButton: .default(Text("Super!")))
            }
        }
    }
    
    private var weekHoursCard: some View {
        HStack(spacing: 16) {
            VStack(alignment: .leading, spacing: 4) {
                Text("Arbeitszeit diese Woche")
                    .font(.caption)
                    .foregroundColor(.gray)
                HStack(alignment: .firstTextBaseline, spacing: 4) {
                    Text(String(format: "%.1f", viewModel.totalHoursThisWeek))
                        .font(.system(size: 28, weight: .black))
                        .foregroundColor(.yellow)
                    Text("Stunden")
                        .font(.subheadline)
                        .foregroundColor(.white.opacity(0.8))
                }
            }
            Spacer()
            Image(systemName: "calendar.badge.clock")
                .font(.system(size: 36))
                .foregroundColor(.yellow.opacity(0.8))
        }
        .padding(18)
        .background(Color.white.opacity(0.04))
        .cornerRadius(18)
        .overlay(RoundedRectangle(cornerRadius: 18).stroke(Color.white.opacity(0.08), lineWidth: 1))
        .padding(.horizontal, 16)
    }
    
    private var calendarSyncButton: some View {
        Button(action: {
            viewModel.syncAllToAppleCalendar()
        }) {
            HStack(spacing: 10) {
                Image(systemName: "arrow.triangle.2.circlepath.circle.fill")
                    .font(.title3)
                Text("In Apple Kalender synchronisieren")
                    .font(.subheadline)
                    .fontWeight(.bold)
                Spacer()
                Image(systemName: "chevron.right")
                    .font(.caption)
            }
            .padding(14)
            .background(Color.blue.opacity(0.2))
            .foregroundColor(.blue)
            .cornerRadius(14)
            .overlay(RoundedRectangle(cornerRadius: 14).stroke(Color.blue.opacity(0.4), lineWidth: 1))
        }
        .padding(.horizontal, 16)
    }
}

// MARK: - Shift Card
struct ShiftCard: View {
    let shift: ShiftItem
    
    private var formattedDate: String {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "de_DE")
        formatter.dateFormat = "EEEE, dd. MMMM"
        return formatter.string(from: shift.date)
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text(formattedDate)
                        .font(.caption)
                        .foregroundColor(.gray)
                    Text(shift.title)
                        .font(.headline)
                        .fontWeight(.bold)
                        .foregroundColor(.primary)
                }
                Spacer()
                Text(shift.role)
                    .font(.caption2)
                    .fontWeight(.bold)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(shift.roleColor.opacity(0.2))
                    .foregroundColor(shift.roleColor)
                    .cornerRadius(6)
            }
            
            Divider().background(Color.white.opacity(0.06))
            
            HStack(spacing: 16) {
                HStack(spacing: 6) {
                    Image(systemName: "clock.fill")
                        .foregroundColor(.yellow)
                        .font(.caption)
                    Text("\(shift.startTime) - \(shift.endTime) Uhr")
                        .font(.caption)
                        .fontWeight(.semibold)
                        .foregroundColor(.primary)
                }
                
                if let area = shift.hallArea {
                    HStack(spacing: 6) {
                        Image(systemName: "mappin.and.ellipse")
                            .foregroundColor(.orange)
                            .font(.caption)
                        Text(area)
                            .font(.caption)
                            .foregroundColor(.gray)
                    }
                }
                
                Spacer()
                
                if shift.isCalendarSynced {
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundColor(.green)
                        .font(.caption)
                }
            }
            
            if let notes = shift.notes, !notes.isEmpty {
                Text("📝 \(notes)")
                    .font(.caption2)
                    .foregroundColor(.gray.opacity(0.8))
            }
        }
        .padding(14)
        .background(Color.white.opacity(0.04))
        .cornerRadius(16)
        .overlay(RoundedRectangle(cornerRadius: 16).stroke(Color.white.opacity(0.08), lineWidth: 1))
    }
}

// MARK: - Add Shift Sheet
struct AddShiftSheet: View {
    @Environment(\.dismiss) private var dismiss
    let onAdd: (ShiftItem) -> Void
    
    @State private var title = "Spätschicht"
    @State private var date = Date()
    @State private var startTime = "16:00"
    @State private var endTime = "23:00"
    @State private var role = "Kasse"
    @State private var hallArea = "Foyer"
    @State private var notes = ""
    
    let roles = ["Kasse", "Einlass", "Bar / Popcorn", "Saaldienst", "Teamleiter"]
    
    var body: some View {
        NavigationView {
            Form {
                Section("Schicht-Details") {
                    TextField("Titel (z.B. Spätschicht Kasse)", text: $title)
                    DatePicker("Datum", selection: $date, displayedComponents: .date)
                    
                    Picker("Bereich / Rolle", selection: $role) {
                        ForEach(roles, id: \.self) { r in
                            Text(r).tag(r)
                        }
                    }
                    
                    TextField("Bereich (z.B. Säle 1-4 oder Foyer)", text: $hallArea)
                }
                
                Section("Arbeitszeiten") {
                    HStack {
                        Text("Beginn:")
                        TextField("16:00", text: $startTime)
                            .keyboardType(.numbersAndPunctuation)
                    }
                    HStack {
                        Text("Ende:")
                        TextField("23:00", text: $endTime)
                            .keyboardType(.numbersAndPunctuation)
                    }
                }
                
                Section("Notizen") {
                    TextField("Optionale Bemerkungen...", text: $notes)
                }
            }
            .navigationTitle("Schicht hinzufügen")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Abbrechen") { dismiss() }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Speichern") {
                        let newShift = ShiftItem(
                            title: title,
                            date: date,
                            startTime: startTime,
                            endTime: endTime,
                            role: role,
                            hallArea: hallArea.isEmpty ? nil : hallArea,
                            notes: notes.isEmpty ? nil : notes
                        )
                        onAdd(newShift)
                        dismiss()
                    }
                    .fontWeight(.bold)
                }
            }
        }
    }
}

// Supporting Alert Model
struct AlertItem: Identifiable {
    let id = UUID()
    let message: String
}
