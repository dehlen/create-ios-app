//
//  AppDelegate.swift
//  {PROJECT_NAME}
//
//  Created by {AUTHOR} on {TODAY}.
//  Copyright © {YEAR} {ORGANIZATION}. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: PluggableApplicationDelegate {
    override var services: [ApplicationService] {
        return [
            WindowCoordinatorService(),
            SettingsService(),
        ]
    }
}
