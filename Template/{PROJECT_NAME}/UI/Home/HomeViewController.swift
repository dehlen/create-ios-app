import UIKit

enum HomeViewRoute {
}

protocol HomeViewRouting: class {
    var routeSelected: ((HomeViewRoute) -> Void)? { get set }
}

final class HomeViewController: UIViewController, HomeViewRouting {
    var routeSelected: ((HomeViewRoute) -> Void)?

    override func viewDidLoad() {
        title = L10n.home
    }
}
