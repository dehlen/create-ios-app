import UIKit

class LibrariesViewController: UITableViewController {

    // MARK: - Properties

    var viewModel: LibrariesViewModel!
    var librariesDataSource: LibrariesDataSource!
    // MARK: - Fields

    override func viewDidLoad() {
        super.viewDidLoad()

        setupUI()
        setupData()
    }

    // MARK: - Setup

    private func setupUI() {
        title = L10n.libraries

        tableView.tableFooterView = UIView()
    }

    private func setupData() {
        librariesDataSource = LibrariesDataSource(viewModel: viewModel)
        tableView.dataSource = librariesDataSource
    }
}
