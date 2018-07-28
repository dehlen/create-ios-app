import UIKit

final class AboutNavigationCoordinator: NavigationCoordinator {
    let viewFactory: ViewFactory
    let navigationController: UINavigationController

    init(viewFactory: ViewFactory) {
        self.viewFactory = viewFactory
        navigationController = .largeTitleNavigationController
        navigationController.title = L10n.about
    }

    func start() {
        let (aboutViewController, routing) = viewFactory.about()
        routing.routeSelected = {[weak self] route in
            switch route {
            case .libraries:
                self?.showLibraries()
            }
        }

        navigationController.pushViewController(aboutViewController, animated: false)
    }

    func showLibraries() {
        let viewController = viewFactory.libraries()
        navigationController.pushViewController(viewController, animated: true)
    }
}
