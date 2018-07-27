import Plugin from '../plugin'
import { join } from 'path'
import * as yaml from 'write-yaml'
import exit from '../exit'
import { exec } from 'shelljs'
import CarthageFrameworkHandler from '../carthageFrameworkHandler'

export default class XcodeGenPlugin extends Plugin {
  name: string

  constructor(name: string) {
    super()
    this.name = name
  }

  questions(): Array<Prompt.PromptParameter> {
    return []
  }

  private createUnitTestConfiguration(
    configuration: any,
    testTargetName: string,
    carthageFrameworks: Array<CarthageDependency>
  ) {
    const testTargetConfiguration: any = {
      platform: 'iOS',
      type: 'bundle.unit-test',
      configFiles: {
        Debug: 'Configurations/Tests.xcconfig',
        Release: 'Configurations/Tests.xcconfig'
      },
      sources: testTargetName,
      dependencies: [
        {
          target: this.name
        }
      ],
      scheme: {
        testTargets: [testTargetName],
        gatherCoverageData: true
      }
    }

    testTargetConfiguration.dependencies = carthageFrameworks

    return testTargetConfiguration
  }

  private createRunScriptPhases(configuration: any): Array<RunScriptPhase> {
    const runScriptPhases = []

    if (configuration.swiftlint) {
      runScriptPhases.push({
        script: 'sh "$PROJECT_DIR/scripts/swiftlint.sh"',
        name: 'Lint with Swiftlint'
      })
    }

    if (configuration.swiftgen) {
      runScriptPhases.push({
        script: 'sh "$PROJECT_DIR/scripts/swiftgen.sh"',
        name: 'Generate with SwiftGen'
      })
    }

    return runScriptPhases
  }

  private createApplicationConfiguration(
    configuration: any,
    testTargetName: string,
    carthageFrameworks: Array<CarthageDependency>
  ) {
    const targetConfiguration: any = {
      type: 'application',
      platform: 'iOS',
      deploymentTarget: configuration.deploymentTarget,
      configFiles: {
        Debug: 'Configurations/Application.xcconfig',
        Release: 'Configurations/Application.xcconfig'
      },
      sources: [this.name],
      scheme: {
        testTargets: [testTargetName],
        gatherCoverageData: true
      }
    }

    targetConfiguration.dependencies = carthageFrameworks

    const runScriptPhases = this.createRunScriptPhases(configuration)
    if (runScriptPhases !== undefined && runScriptPhases.length > 0) {
      targetConfiguration['postbuildScripts'] = runScriptPhases
    }

    return targetConfiguration
  }

  private generateProjectConfiguration(
    configuration: any,
    carthageFrameworks: CarthageDependencies
  ) {
    const testTargetName = this.name + 'Tests'

    const yamlConfiguration: any = {
      name: this.name,
      options: {
        bundleIdPrefix: configuration.bundleIdPrefix
      },
      targets: {},
      configFiles: {
        Debug: 'Configurations/Debug.xcconfig',
        Release: 'Configurations/Release.xcconfig'
      }
    }

    yamlConfiguration.targets[this.name] = this.createApplicationConfiguration(
      configuration,
      testTargetName,
      carthageFrameworks.applicationDependencies
    )
    yamlConfiguration.targets[testTargetName] = this.createUnitTestConfiguration(
      configuration,
      testTargetName,
      carthageFrameworks.testDependencies
    )

    return yamlConfiguration
  }

  private writeProjectConfiguration(
    configuration: any,
    destination: string,
    carthageFrameworks: CarthageDependencies
  ) {
    const specLocation = join(destination, '/project.yml')
    try {
      yaml.sync(specLocation, this.generateProjectConfiguration(configuration, carthageFrameworks))
      console.log('✅ Created project spec at ' + specLocation)
    } catch (err) {
      console.log('Could not create project spec.')
      console.error(err)
      exit()
    }
  }

  async execute(configuration: any, destination: string) {}

  async postExecute(configuration: any, destination: string) {
    const frameworkHandler = new CarthageFrameworkHandler()
    const carthageFrameworks = await frameworkHandler.retrieveDependencies(destination)
    this.writeProjectConfiguration(configuration, destination, carthageFrameworks)

    console.log('🛠 Generating Xcode project...')
    exec('xcodegen --spec ' + join(destination, 'project.yml') + ' --project ' + destination)
  }
}
