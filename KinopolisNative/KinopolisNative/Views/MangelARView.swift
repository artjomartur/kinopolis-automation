import SwiftUI
import RealityKit
import ARKit

struct MangelARView: View {
    @Environment(\.presentationMode) var presentationMode
    @State private var showingInfo = true
    
    var body: some View {
        ZStack {
            ARViewContainer()
                .edgesIgnoringSafeArea(.all)
            
            VStack {
                HStack {
                    Button(action: {
                        presentationMode.wrappedValue.dismiss()
                    }) {
                        Image(systemName: "xmark.circle.fill")
                            .font(.system(size: 30))
                            .foregroundColor(.primary)
                            .padding()
                    }
                    Spacer()
                }
                Spacer()
                
                if showingInfo {
                    VStack(spacing: 8) {
                        Text("AR Mängel-Scanner")
                            .font(.headline)
                            .foregroundColor(.primary)
                        Text("Bewege die Kamera langsam und tippe auf einen defekten Sitz, um ihn virtuell zu markieren.")
                            .font(.subheadline)
                            .foregroundColor(.gray)
                            .multilineTextAlignment(.center)
                        
                        Button("Verstanden") {
                            withAnimation {
                                showingInfo = false
                            }
                        }
                        .padding(.top, 8)
                        .buttonStyle(.borderedProminent)
                        .tint(.red)
                    }
                    .padding()
                    .background(Color.white)
                    .cornerRadius(16)
                    .padding()
                    .shadow(radius: 10)
                }
            }
        }
        .navigationBarHidden(true)
    }
}

struct ARViewContainer: UIViewRepresentable {
    func makeUIView(context: Context) -> ARView {
        let arView = ARView(frame: .zero)
        
        // Start AR session
        let config = ARWorldTrackingConfiguration()
        config.planeDetection = [.horizontal, .vertical]
        arView.session.run(config)
        
        // Add gesture recognizer for taps
        let tapGesture = UITapGestureRecognizer(target: context.coordinator, action: #selector(Coordinator.handleTap(_:)))
        arView.addGestureRecognizer(tapGesture)
        
        context.coordinator.arView = arView
        
        return arView
    }
    
    func updateUIView(_ uiView: ARView, context: Context) {}
    
    func makeCoordinator() -> Coordinator {
        Coordinator()
    }
    
    class Coordinator: NSObject {
        weak var arView: ARView?
        
        @objc func handleTap(_ recognizer: UITapGestureRecognizer) {
            guard let arView = arView else { return }
            
            let location = recognizer.location(in: arView)
            
            // Perform raycast
            let results = arView.raycast(from: location, allowing: .estimatedPlane, alignment: .any)
            
            if let firstResult = results.first {
                // Create a 3D marker (Red Sphere)
                let sphere = MeshResource.generateSphere(radius: 0.05)
                let material = SimpleMaterial(color: .red, isMetallic: false)
                let modelEntity = ModelEntity(mesh: sphere, materials: [material])
                
                // Add a text label above it
                let textMesh = MeshResource.generateText("DEFEKT", extrusionDepth: 0.01, font: .systemFont(ofSize: 0.05), containerFrame: .zero, alignment: .center, lineBreakMode: .byWordWrapping)
                let textEntity = ModelEntity(mesh: textMesh, materials: [SimpleMaterial(color: .white, isMetallic: false)])
                textEntity.position = [0, 0.08, 0]
                modelEntity.addChild(textEntity)
                
                // Create anchor at hit location
                let anchor = AnchorEntity(world: firstResult.worldTransform)
                anchor.addChild(modelEntity)
                
                arView.scene.addAnchor(anchor)
                
                // Haptic feedback
                let generator = UINotificationFeedbackGenerator()
                generator.notificationOccurred(.success)
            }
        }
    }
}
