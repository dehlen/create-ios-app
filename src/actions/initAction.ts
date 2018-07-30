import { join } from 'path'

import Generator from '../generator'
import NamePlugin from '../plugins/name'
import OrganizationPlugin from '../plugins/organization'
import BundleIdPrefixPlugin from '../plugins/bundleIdPrefix'
import DeploymentTargetPlugin from '../plugins/deploymentTarget'
import GitHandlerPlugin from '../plugins/gitHandler'
import TabBasedAppPlugin from '../plugins/tabBasedApp'
import SwiftLintPlugin from '../plugins/swiftlint'
import FastlanePlugin from '../plugins/fastlane'
import SwiftGenPlugin from '../plugins/swiftgen'
import NetworkStackPlugin from '../plugins/networkStack'
import LoggingDependencyPlugin from '../plugins/loggingDependency'
import AnalyticsDependencyPlugin from '../plugins/analyticsDependency'
import ThemingDependencyPlugin from '../plugins/themingDependency'
import CuratedDependencyPlugin from '../plugins/curatedDependency'
import DependencyEditorPlugin from '../plugins/dependencyEditor'
import TemplateHandler from '../templateHandler'
import XcodeGenPlugin from '../plugins/xcodegen'
import AuthorPlugin from '../plugins/author'
import YearPlugin from '../plugins/year'
import TodayPlugin from '../plugins/today'
import CarthagePlugin from '../plugins/carthage'
import DirectoryHandler from '../directoryHandler'
import OpenXcodeProjectPlugin from '../plugins/openXcodeProject'
import FetchLicensesPlugin from '../plugins/fetchLicenses'
import BootstrapPlugin from '../plugins/bootstrap'
import SwiftFormatPlugin from '../plugins/swiftformat'

export default async (name: string, destination: string, skipInstall: boolean) => {
  const projectPath = join(destination, name)

  const generator = new Generator(name, projectPath, skipInstall)
  const templateHandler = new TemplateHandler(join(__dirname, '../../Template'))
  const directoryHandler = new DirectoryHandler()
  const pluginDirectory = join(__dirname, '../../Template', 'plugins')

  generator.register([
    new NamePlugin(name),
    new YearPlugin(),
    new TodayPlugin(),
    new AuthorPlugin(),
    new OrganizationPlugin(),
    new BundleIdPrefixPlugin(),
    new DeploymentTargetPlugin(),
    new TabBasedAppPlugin(),
    new BootstrapPlugin(pluginDirectory),
    new SwiftFormatPlugin(pluginDirectory),
    new SwiftLintPlugin(pluginDirectory),
    new FastlanePlugin(pluginDirectory),
    new SwiftGenPlugin(pluginDirectory),
    new CarthagePlugin(skipInstall, pluginDirectory),
    new NetworkStackPlugin(),
    new LoggingDependencyPlugin(),
    new AnalyticsDependencyPlugin(),
    new ThemingDependencyPlugin(),
    new CuratedDependencyPlugin(),
    new DependencyEditorPlugin(),
    new FetchLicensesPlugin(pluginDirectory, true),
    new XcodeGenPlugin(name, true, true),
    new GitHandlerPlugin(),
    new OpenXcodeProjectPlugin()
  ])

  await directoryHandler.handleProjectFolderGeneration(projectPath)
  const configuration = await generator.ask()
  await templateHandler.copyTo(projectPath, configuration)
  await generator.run(configuration)
}
