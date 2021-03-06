import Plugin from '../plugin'
import { appendFileSync } from 'fs'
import { join } from 'path'
import dependencies from '../dependencyMap'

export default class CuratedDependencyPlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    const testDependencies = dependencies
      .filter(dependency => dependency.isTestDependency)
      .map(function(dependency: FrameworkNameMap): Prompt.Choice {
        return {
          title: dependency.frameworkName,
          value: dependency.value,
          selected: dependency.initiallySelected
        }
      })

    const appDependencies = dependencies
      .filter(dependency => !dependency.isTestDependency)
      .map(function(dependency: FrameworkNameMap): Prompt.Choice {
        return {
          title: dependency.frameworkName + ' (' + dependency.description + ')',
          value: dependency.value,
          selected: dependency.initiallySelected
        }
      })
    return [
      {
        type: 'multiselect',
        name: 'testDependencies',
        message: 'Do you want to add one or more of this curated testing dependencies?',
        choices: testDependencies,
        hint: '- Space to select. Return to submit'
      },
      {
        type: 'multiselect',
        name: 'dependencies',
        message: 'Do you want to add one or more of this curated other dependencies?',
        choices: appDependencies,
        hint: '- Space to select. Return to submit'
      }
    ]
  }

  private writeCarthageDependencies(configuration: any, destination: string) {
    for (const testDependency of configuration.testDependencies) {
      appendFileSync(join(destination, 'Cartfile.private'), 'github "' + testDependency + '"\n')
    }

    if (configuration.logging || configuration.analytics || configuration.network) {
      configuration.dependencies.push('Mindera/Alicerce')
    }
    for (const dependency of configuration.dependencies) {
      appendFileSync(join(destination, 'Cartfile'), 'github "' + dependency + '"\n')
    }
  }

  async execute(configuration: any, destination: string) {
    this.writeCarthageDependencies(configuration, destination)
  }

  async postExecute(configuration: any, destination: string) {}
}
