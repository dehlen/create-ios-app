import * as copy from 'recursive-copy'
import { readJson } from 'fs-extra'
import { join, resolve } from 'path'
export default class TemplateHandler {
  templateDirectory: string

  constructor(templateDirectory: string) {
    this.templateDirectory = templateDirectory
  }

  async copyTo(destination: string, configuration: object) {
    await copy(this.templateDirectory, destination, {
      overwrite: true,
      expand: true,
      dot: true,
      junk: false,
      filter: ['**/*', '!**/.gitkeep', '!**/plugins', '!**/plugins/**']
    })
  }

  async readConfiguration(templateFileDirectory: string): Promise<any> {
    try {
      const file = join(resolve(__dirname, '..', templateFileDirectory), 'template.json')
      const configuration = await readJson(file)
      if (this.validateConfiguration(configuration)) {
        return configuration
      } else {
        console.log('The template file is invalid because keys are missing.')
        console.log('Therefore the normal setup will be presented to you.')
      }
    } catch (err) {
      console.log('Could not read template file')
      console.log('Therefore the normal setup will be presented to you.')
    }
  }

  private validateConfiguration(configuration: any): boolean {
    if (
      configuration.hasOwnProperty('name') &&
      configuration.hasOwnProperty('organization') &&
      configuration.hasOwnProperty('bundleIdPrefix') &&
      configuration.hasOwnProperty('deploymentTarget') &&
      configuration.hasOwnProperty('tabBased') &&
      configuration.hasOwnProperty('tabs') &&
      configuration.hasOwnProperty('swiftformat') &&
      configuration.hasOwnProperty('swiftlint') &&
      configuration.hasOwnProperty('fastlane') &&
      configuration.hasOwnProperty('swiftgen') &&
      configuration.hasOwnProperty('network') &&
      configuration.hasOwnProperty('logging') &&
      configuration.hasOwnProperty('analytics') &&
      configuration.hasOwnProperty('theming') &&
      configuration.hasOwnProperty('testDependencies') &&
      configuration.hasOwnProperty('dependencies') &&
      configuration.hasOwnProperty('editDependencies') &&
      configuration.hasOwnProperty('repositoryURL')
    ) {
      return true
    }
    return false
  }
}
