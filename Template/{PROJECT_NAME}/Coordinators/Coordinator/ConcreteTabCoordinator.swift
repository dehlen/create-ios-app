import UIKit

final class ConcreteTabCoordinator: TabCoordinator {
    let viewFactory: ViewFactory
    let tabBarController: UITabBarController
    let childCoordinators: [ViewControllerCoordinator]

    init(viewFactory: ViewFactory, childCoordinators: [ViewControllerCoordinator]) {
        self.viewFactory = viewFactory
        tabBarController = UITabBarController()
        self.childCoordinators = childCoordinators
    }

    func start() {
        tabBarController.setViewControllers(childCoordinators.map { $0.presenter }, animated: false)
        childCoordinators.forEach { $0.start() }
    }
}
