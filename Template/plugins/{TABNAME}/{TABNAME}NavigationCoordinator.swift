import UIKit

final class {TABNAME}NavigationCoordinator: NavigationCoordinator {
    let viewFactory: ViewFactory
    let navigationController: UINavigationController

    init(viewFactory: ViewFactory) {
        self.viewFactory = viewFactory
        navigationController = .largeTitleNavigationController
        navigationController.title = L10n.{TABNAME_CAMEL_CASED}
    }

    func start() {
        let ({TABNAME}ViewController, routing) = viewFactory.{TABNAME_CAMEL_CASED}()
        routing.routeSelected = { route in
            switch route {
            default: print("Implement")
            }
        }

        navigationController.pushViewController({TABNAME}ViewController, animated: false)
    }
}

extension ConcreteCoordinatorFactory {
    func {TABNAME_CAMEL_CASED}() -> {TABNAME}NavigationCoordinator {
        return {TABNAME}NavigationCoordinator(viewFactory: viewFactory)
    }
}