// swift-tools-version: 5.8

import PackageDescription
import AppleProductTypes

let package = Package(
    name: "KinopolisNative",
    platforms: [
        .iOS("16.0")
    ],
    products: [
        .iOSApplication(
            name: "KinopolisNative",
            targets: ["App"],
            teamIdentifier: "",
            displayVersion: "1.0",
            bundleVersion: "1",
            appIcon: .placeholder(icon: .video),
            accentColor: .presetColor(.blue),
            supportedDeviceFamilies: [
                .pad,
                .phone
            ],
            supportedInterfaceOrientations: [
                .portrait,
                .landscapeRight,
                .landscapeLeft,
                .portraitUpsideDown(.when(deviceFamilies: [.pad]))
            ],
            appCategory: .utilities
        )
    ],
    targets: [
        .executableTarget(
            name: "App",
            path: "Sources/App"
        )
    ]
)
