import UIKit

extension ConcreteViewFactory {
    func {TABNAME_CAMEL_CASED}() -> (UIViewController, {TABNAME}ViewRouting) {
        let storyboard = UIStoryboard(storyboard: .{TABNAME_CAMEL_CASED})
        let viewController: {TABNAME}ViewController = storyboard.instantiateViewController()
        let viewModel = {TABNAME}ViewModel()
        viewController.viewModel = viewModel

        return (viewController, viewModel)
    }
}