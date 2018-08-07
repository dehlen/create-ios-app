import UIKit

protocol CoordinatorFactory {
    func window() -> WindowCoordinator
    func tab() -> TabCoordinator
    func home() -> HomeNavigationCoordinator
    func about() -> AboutNavigationCoordinator
}

final class ConcreteCoordinatorFactory {

    let viewFactory: ViewFactory

    init(viewFactory: ViewFactory) {
        self.viewFactory = viewFactory
    }
}

extension ConcreteCoordinatorFactory: CoordinatorFactory {
    func window() -> WindowCoordinator {
        return WindowCoordinator(rootCoordinator: tab())
    }

    func tab() -> TabCoordinator {
        return ConcreteTabCoordinator(
            viewFactory: viewFactory,
            childCoordinators: [home(), about(){ADDITIONAL_TAB_FUNCTIONS}])
    }

    func home() -> HomeNavigationCoordinator {
        return HomeNavigationCoordinator(viewFactory: viewFactory)
    }

    func about() -> AboutNavigationCoordinator {
        return AboutNavigationCoordinator(viewFactory: viewFactory)
    }
}
