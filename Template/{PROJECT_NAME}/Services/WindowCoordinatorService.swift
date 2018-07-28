import UIKit

final class WindowCoordinatorService: NSObject, ApplicationService {
    private var windowCoordinator: WindowCoordinator!

    // MARK: - Lifecycle

    // swiftlint:disable
    func application(_: UIApplication, didFinishLaunchingWithOptions _: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        let coordinatorFactory = ConcreteCoordinatorFactory(viewFactory: ConcreteViewFactory())
        windowCoordinator = coordinatorFactory.window()

        guard let delegate = UIApplication.shared.delegate as? AppDelegate else {
            fatalError("Looks like there is no AppDelegate ?!")
        }
        delegate.window = windowCoordinator.window
        windowCoordinator.start()

        return true
    }

    // swiftlint:enable
}
