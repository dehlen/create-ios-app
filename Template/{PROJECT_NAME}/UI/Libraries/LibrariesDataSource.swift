//
//  LibrariesDataSource.swift
//  Sample
//
//  Created by David Ehlen on 28.07.18.
//

import UIKit

class LibrariesDataSource: NSObject, UITableViewDataSource {
    private let viewModel: LibrariesViewModel!

    init(viewModel: LibrariesViewModel) {
        self.viewModel = viewModel
    }

    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return viewModel.libraries.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "LicensesCell", for: indexPath)

        let element = viewModel.libraries[indexPath.row]
        let (name, licenseName) = element
        cell.textLabel?.text = name
        cell.detailTextLabel?.text = licenseName

        return cell
    }
}
