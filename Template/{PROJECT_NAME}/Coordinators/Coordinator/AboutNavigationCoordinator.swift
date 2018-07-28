import UIKit

final class AboutNavigationCoordinator: NavigationCoordinator {
    let viewFactory: ViewFactory
    let navigationController: UINavigationController

    init(viewFactory: ViewFactory) {
        self.viewFactory = viewFactory
        navigationController = UINavigationController()
        navigationController.title = L10n.about
    }

    func start() {
        let (aboutViewController, routing) = viewFactory.about()
        routing.routeSelected = { route in
            switch route {
            default:
                print("no handling for route \(route)")
            }
        }

        navigationController.pushViewController(aboutViewController, animated: false)
    }
}
