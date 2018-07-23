import { join } from 'path'

import Generator from '../generator'
import NamePlugin from '../plugins/name'
import OrganizationPlugin from '../plugins/organization'
import BundleIdPrefixPlugin from '../plugins/bundleIdPrefix'
import DeploymentTargetPlugin from '../plugins/deploymentTarget'
import GithubPlugin from '../plugins/github'
import TabBasedAppPlugin from '../plugins/tabBasedApp'
import SwiftLintPlugin from '../plugins/swiftlint'
import FastlanePlugin from '../plugins/fastlane'
import SwiftGenPlugin from '../plugins/swiftgen'
import SettingsBundlePlugin from '../plugins/settingsBundle'
import NetworkStackPlugin from '../plugins/networkStack'
import LoggingDependencyPlugin from '../plugins/loggingDependency'
import AnalyticsDependencyPlugin from '../plugins/analyticsDependency'
import ThemingDependencyPlugin from '../plugins/themingDependency'
import DependencyChooserPlugin from '../plugins/dependencyChooser'
import CuratedDependencyPlugin from '../plugins/curatedDependency'
import DependencyEditorPlugin from '../plugins/dependencyEditor'
import TemplateHandler from '../templateHandler'
import XcodeGenPlugin from '../plugins/xcodegen'
import AuthorPlugin from '../plugins/author'
import YearPlugin from '../plugins/year'
import TodayPlugin from '../plugins/today'

export default async (name: string, destination: string) => {
  const generator = new Generator(name, destination)
  const templateHandler = new TemplateHandler(join(__dirname, '../../Template'))

  generator.register([
    new NamePlugin(name),
    new YearPlugin(),
    new TodayPlugin(),
    new AuthorPlugin(),
    new OrganizationPlugin(),
    new BundleIdPrefixPlugin(),
    new DeploymentTargetPlugin(),
    new TabBasedAppPlugin(),
    new SwiftLintPlugin(),
    new FastlanePlugin(),
    new SwiftGenPlugin(),
    new DependencyChooserPlugin(),
    new SettingsBundlePlugin(),
    new NetworkStackPlugin(),
    new LoggingDependencyPlugin(),
    new AnalyticsDependencyPlugin(),
    new ThemingDependencyPlugin(),
    new CuratedDependencyPlugin(),
    new DependencyEditorPlugin(),
    new XcodeGenPlugin(name),
    new GithubPlugin()
  ])
  const configuration = await generator.ask()
  await templateHandler.copyTo(destination, configuration)
  await generator.run(configuration)
}
