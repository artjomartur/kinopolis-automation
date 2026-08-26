//
//  KinopolisWidgetBundle.swift
//  KinopolisWidget
//
//  Created by Artjom Becker on 26.08.26.
//

import WidgetKit
import SwiftUI

@main
struct KinopolisWidgetBundle: WidgetBundle {
    var body: some Widget {
        KinopolisSchichtWidget()
        KinopolisMotivationWidget()
        KinopolisWidgetControl()
        KinopolisWidgetLiveActivity()
    }
}
