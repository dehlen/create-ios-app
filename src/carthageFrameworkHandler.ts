import { readFileSync } from 'fs'
import { join } from 'path'
import isEmpty = require('is-empty')
import exit from './exit'
import frameworkNameMap from './dependencyMap'

const prompts = require('prompts')

export default class CarthageFrameworkHandler {
  constructor() {}

  private getDependencies(
    filePath: string,
    filterForTestDependencies: boolean
  ): ResolvedDependencies {
    const dependencies: Array<CarthageDependency> = []
    const unknownDependencies: Array<string> = []

    const lines = readFileSync(filePath)
      .toString()
      .split(/\r?\n/)

    for (const line of lines) {
      const value = line.split(/"/)[1]
      const frameworkItem = frameworkNameMap.find(element => {
        return element.value === value && element.isTestDependency == filterForTestDependencies
      })
      if (isEmpty(frameworkItem)) {
        if (value !== undefined) {
          unknownDependencies.push(value)
        }
      } else {
        dependencies.push({ carthage: frameworkItem.frameworkName })
      }
    }

    return { dependencies, unknownDependencies }
  }

  async retrieveDependencies(projectPath: string): Promise<CarthageDependencies> {
    const resolvedAppDependencies = this.getDependencies(join(projectPath, 'Cartfile'), false)
    const resolvedTestDependencies = this.getDependencies(
      join(projectPath, 'Cartfile.private'),
      true
    )
    console.log(resolvedAppDependencies.dependencies)
    console.log(resolvedAppDependencies.unknownDependencies)
    console.log(resolvedTestDependencies.dependencies)
    console.log(resolvedTestDependencies.unknownDependencies)

    if (
      resolvedAppDependencies.unknownDependencies.length > 0 ||
      resolvedTestDependencies.unknownDependencies.length > 0
    ) {
      console.log(
        'The resulting framework name of one or more of the entered Carthage dependencies could not be retrieved.'
      )
      console.log(
        'This is necessary in order to automatically create a Run-Script-Phase in your Xcode project.'
      )
      console.log('Please enter the correct framework names for the following dependencies.')
      console.log(
        "Leave blank if this dependency does not build a framework or you don't want to link the framework"
      )
      const appDependencyQuestions = resolvedAppDependencies.unknownDependencies.map(function(
        dependency: string,
        index: number
      ) {
        return {
          type: 'text',
          name: 'appDependency' + index,
          message: 'How is the framework called for ' + dependency + '?'
        }
      })

      const testDependencyQuestions = resolvedTestDependencies.unknownDependencies.map(function(
        dependency: string,
        index: number
      ) {
        return {
          type: 'text',
          name: 'testDependency' + index,
          message: 'How is the framework called for ' + dependency + '?'
        }
      })

      const appDependencyAnswers: any = await prompts(appDependencyQuestions, {
        onCancel: () => {
          exit()
        },
        onSubmit: () => {}
      })

      const testDependencyAnswers: any = await prompts(testDependencyQuestions, {
        onCancel: () => {
          exit()
        },
        onSubmit: () => {}
      })

      for (const key in appDependencyAnswers) {
        const value = appDependencyAnswers[key]
        if (!isEmpty(value)) {
          resolvedAppDependencies.dependencies.push({ carthage: value })
        }
      }

      for (const key in testDependencyAnswers) {
        const value = testDependencyAnswers[key]
        if (!isEmpty(value)) {
          resolvedTestDependencies.dependencies.push({ carthage: value })
        }
      }
    }

    return {
      testDependencies: resolvedTestDependencies.dependencies,
      applicationDependencies: resolvedAppDependencies.dependencies
    }
  }
}
