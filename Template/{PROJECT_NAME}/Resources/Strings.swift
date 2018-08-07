// Generated using SwiftGen, by O.Halligon — https://github.com/SwiftGen/SwiftGen

import Foundation

// swiftlint:disable superfluous_disable_command
// swiftlint:disable file_length

// swiftlint:disable explicit_type_interface function_parameter_count identifier_name line_length
// swiftlint:disable nesting type_body_length type_name
public enum L10n {
    /// About
    public static let about = L10n.tr("Localizable", "about")
    /// Home
    public static let home = L10n.tr("Localizable", "home")
    /// Used libraries
    public static let libraries = L10n.tr("Localizable", "libraries")
    /// Settings
    public static let settings = L10n.tr("Localizable", "settings")
    {ADDITIONAL_TAB_STRINGS_WITHOUT_SWIFTGEN}
}

// swiftlint:enable explicit_type_interface function_parameter_count identifier_name line_length
// swiftlint:enable nesting type_body_length type_name

extension L10n {
    private static func tr(_ table: String, _ key: String, _ args: CVarArg...) -> String {
        let format = NSLocalizedString(key, tableName: table, bundle: Bundle(for: BundleToken.self), comment: "")
        return String(format: format, locale: Locale.current, arguments: args)
    }
}

private final class BundleToken {}
