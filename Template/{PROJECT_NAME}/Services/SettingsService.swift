import UIKit

final class SettingsService: NSObject, ApplicationService {
    // MARK: - Lifecycle

    // swiftlint:disable
    func application(_: UIApplication, didFinishLaunchingWithOptions _: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        let defaults = UserDefaults.standard
        defaults.register(defaults: [.versionNumber: Bundle.main.appVersion, .buildNumber: Bundle.main.appBuild])
        return true
    }

    // swiftlint:enable
}
