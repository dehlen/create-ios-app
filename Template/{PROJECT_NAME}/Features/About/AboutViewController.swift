import UIKit

final class AboutViewController: UITableViewController {
    @IBOutlet private var titleLabel: UILabel!
    @IBOutlet private var versionLabel: UILabel!
    @IBOutlet private var librariesLabel: UILabel!
    @IBOutlet private var settingsLabel: UILabel!

    var viewModel: AboutViewModel!

    override func viewDidLoad() {
        title = L10n.about

        setupUI()
    }

    private func setupUI() {
        title = L10n.about

        tableView.rowHeight = UITableViewAutomaticDimension
        tableView.estimatedRowHeight = 44

        librariesLabel.text = L10n.libraries
        settingsLabel.text = L10n.settings
        titleLabel.text = viewModel.appName
        versionLabel.text = viewModel.appVersion
    }
}

extension AboutViewController {
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)

        guard let routeItem = AboutViewRoute(rawValue: indexPath.row) else { fatalError("Invalid indexPath") }

        switch routeItem {
        case .libraries:
            viewModel.userDidRequestLibraries()
        case .settings:
            viewModel.userDidRequestSettings()
        }
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()

        guard let headerView = tableView.tableHeaderView else {
            return
        }

        let size = headerView.systemLayoutSizeFitting(UILayoutFittingCompressedSize)

        if headerView.frame.size.height != size.height {
            headerView.frame.size.height = size.height
            tableView.tableHeaderView = headerView
            tableView.layoutIfNeeded()
        }
    }
}
