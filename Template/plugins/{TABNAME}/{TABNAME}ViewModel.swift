enum {TABNAME}ViewRoute { //change to type :Int when you need to define a route case here
}

protocol {TABNAME}ViewRouting: class {
    var routeSelected: (({TABNAME}ViewRoute) -> Void)? { get set }
}

protocol {TABNAME}ViewModeling {
}

final class {TABNAME}ViewModel: {TABNAME}ViewRouting {
    var routeSelected: (({TABNAME}ViewRoute) -> Void)?
    init() {
    }
}

extension {TABNAME}ViewModel: {TABNAME}ViewModeling {
}
