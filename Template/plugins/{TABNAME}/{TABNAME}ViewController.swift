import UIKit

final class {TABNAME}ViewController: UIViewController {
    var viewModel: {TABNAME}ViewModel!

    override func viewDidLoad() {
        title = L10n.{TABNAME_CAMEL_CASED}

        setupUI()
    }

    private func setupUI() {
        title = L10n.{TABNAME_CAMEL_CASED}
    }
}