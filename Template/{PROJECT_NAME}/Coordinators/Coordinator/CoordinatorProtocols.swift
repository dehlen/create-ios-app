import UIKit

// MARK: - ViewControllerCoordinator
protocol ViewControllerCoordinator {
    var viewFactory: ViewFactory { get }
    var presenter: UIViewController { get }
    func start()
}

// MARK: - NavigationCoordinator
protocol NavigationCoordinator: ViewControllerCoordinator {
    var navigationController: UINavigationController { get }
}

extension NavigationCoordinator {
    var presenter: UIViewController {
        return navigationController as UIViewController
    }
}

// MARK: - TabCoordinator
protocol TabCoordinator: ViewControllerCoordinator {
    var tabBarController: UITabBarController { get }
}

extension TabCoordinator {
    var presenter: UIViewController {
        return tabBarController as UIViewController
    }
}
