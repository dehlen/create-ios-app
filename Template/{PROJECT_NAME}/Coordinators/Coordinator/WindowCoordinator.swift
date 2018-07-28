import UIKit

final class WindowCoordinator {
    let window: UIWindow
    private let rootCoordinator: ViewControllerCoordinator

    init(rootCoordinator: ViewControllerCoordinator) {
        window = UIWindow(frame: UIScreen.main.bounds)
        self.rootCoordinator = rootCoordinator
    }

    func start() {
        window.rootViewController = rootCoordinator.presenter
        window.makeKeyAndVisible()
        rootCoordinator.start()
    }
}
