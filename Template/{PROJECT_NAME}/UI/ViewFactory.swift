import UIKit

protocol ViewFactory {
    func home() -> (UIViewController, HomeViewRouting)
    func about() -> (UIViewController, AboutViewRouting)
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

        return (viewController, viewController)
    }

}
