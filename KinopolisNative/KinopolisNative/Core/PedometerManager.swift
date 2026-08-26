import CoreMotion
import Combine

class PedometerManager: ObservableObject {
    private let pedometer = CMPedometer()
    @Published var steps: Int = 0
    @Published var isTracking = false
    
    func startTracking() {
        guard CMPedometer.isStepCountingAvailable() else {
            print("Step counting is not available on this device.")
            return
        }
        
        isTracking = true
        pedometer.startUpdates(from: Date()) { [weak self] pedometerData, error in
            guard let data = pedometerData, error == nil else { return }
            
            DispatchQueue.main.async {
                self?.steps = data.numberOfSteps.intValue
            }
        }
    }
    
    func stopTracking() {
        pedometer.stopUpdates()
        isTracking = false
    }
}
