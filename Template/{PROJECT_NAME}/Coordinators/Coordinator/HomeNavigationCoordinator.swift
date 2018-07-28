import UIKit

final class HomeNavigationCoordinator: NavigationCoordinator {
    let viewFactory: ViewFactory
    let navigationController: UINavigationController

    init(viewFactory: ViewFactory) {
        self.viewFactory = viewFactory
        navigationController = .largeTitleNavigationController
        navigationController.title = L10n.home
    }

    func start() {
        let (homeViewController, routing) = viewFactory.home()
        routing.routeSelected = { route in
            switch route {
            default:
                print("no handling for route \(route)")
            }
        }

        navigationController.pushViewController(homeViewController, animated: false)
    }
}
