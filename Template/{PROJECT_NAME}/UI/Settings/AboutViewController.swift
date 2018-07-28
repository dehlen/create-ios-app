import UIKit

enum AboutViewRoute {
}

protocol AboutViewRouting: class {
    var routeSelected: ((AboutViewRoute) -> Void)? { get set }
}

final class AboutViewController: UIViewController, AboutViewRouting {
    var routeSelected: ((AboutViewRoute) -> Void)?

    override func viewDidLoad() {
        title = L10n.about
    }
}
