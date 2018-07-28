import Foundation

typealias Library = (String, String)

class LibrariesViewModel {
    // MARK: - Properties

    let libraries: [Library]

    init() {
        if let path = Bundle.main.path(forResource: "Licenses", ofType: "plist"), let array = NSArray(contentsOfFile: path) as? [[String: Any]] {
            libraries = array.map({ dict in
                // swiftlint:disable force_cast
                let title = dict["title"] as! String
                let license = dict["license"] as! String
                // swiftlint:enable force_cast
                return (title, license)
            })
        } else {
            libraries = []
        }
    }
}
