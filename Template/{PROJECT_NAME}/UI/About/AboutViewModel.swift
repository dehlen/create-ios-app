import Foundation

enum AboutViewRoute: Int {
    case libraries
}

protocol AboutViewRouting: class {
    var routeSelected: ((AboutViewRoute) -> Void)? { get set }
}

protocol AboutViewModeling {
    func userDidRequestLibraries()
}

final class AboutViewModel: AboutViewRouting {

    let appName: String
    let appVersion: String
    var routeSelected: ((AboutViewRoute) -> Void)?

    init() {
        appName = Bundle.main.appName
        appVersion = "\(Bundle.main.appVersion) (\(Bundle.main.appBuild))"
    }
}

extension AboutViewModel: AboutViewModeling {
    func userDidRequestLibraries() {
        routeSelected?(.libraries)
    }
}
