import UIKit

extension UINavigationController {
    static var largeTitleNavigationController: UINavigationController {
        let navigationController = UINavigationController()
        navigationController.navigationBar.prefersLargeTitles = true
        return navigationController
    }
}
