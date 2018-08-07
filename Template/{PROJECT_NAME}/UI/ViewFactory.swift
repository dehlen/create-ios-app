import UIKit

protocol ViewFactory {
    func home() -> (UIViewController, HomeViewRouting)
    func about() -> (UIViewController, AboutViewRouting)
    func libraries() -> UIViewController
    {ADDITIONAL_TAB_VIEWFACTORY_FUNCTIONS}
}

final class ConcreteViewFactory {
}

extension ConcreteViewFactory: ViewFactory {
    func home() -> (UIViewController, HomeViewRouting) {
        let storyboard = UIStoryboard(storyboard: .home)
        let viewController: HomeViewController = storyboard.instantiateViewController()

        return (viewController, viewController)
    }

    func about() -> (UIViewController, AboutViewRouting) {
        let storyboard = UIStoryboard(storyboard: .about)
        let viewController: AboutViewController = storyboard.instantiateViewController()
        let viewModel = AboutViewModel()
        viewController.viewModel = viewModel

        return (viewController, viewModel)
    }

    func libraries() -> UIViewController {
        let storyboard = UIStoryboard(storyboard: .libraries)
        let viewController: LibrariesViewController = storyboard.instantiateViewController()
        let viewModel = LibrariesViewModel()
        viewController.viewModel = viewModel

        return viewController
    }
}
