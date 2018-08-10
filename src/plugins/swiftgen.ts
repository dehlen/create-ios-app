import Plugin from '../plugin'
import { exec } from 'shelljs'
import * as copy from 'recursive-copy'
import { join } from 'path'
import StringUtility from '../stringUtil'
import * as replace from 'regex-replace'

export default class SwiftGenPlugin extends Plugin {
  pluginDirectory: string
  constructor(pluginDirectory: string) {
    super()
    this.pluginDirectory = pluginDirectory
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'toggle',
        name: 'swiftgen',
        message: 'Should we add SwiftGen to generate localizable strings, images, etc?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes'
      }
    ]
  }

  async execute(configuration: any, destination: string) {
    if (configuration.swiftgen) {
      const swiftgenConfigurationPath = join(this.pluginDirectory, 'swiftgen.yml')
      const swiftgenScriptPath = join(this.pluginDirectory, 'scripts', 'swiftgen.sh')

      await copy(swiftgenConfigurationPath, join(destination, 'swiftgen.yml'), {
        overwrite: true,
        expand: true,
        dot: true,
        junk: false
      })

      await copy(swiftgenScriptPath, join(destination, 'scripts', 'swiftgen.sh'), {
        overwrite: true,
        expand: true,
        dot: true,
        junk: false
      })
    }
  }

  async postExecute(configuration: any, destination: string) {
    const stringUtil = new StringUtility()
    await replace(
      '{SWIFTGEN_MINT}\n',
      configuration.swiftgen ? 'swiftgen/swiftgen@master\n' : '',
      stringUtil.removeTrailingSlash(destination)
    )

    await replace(
      '{SWIFTGEN_SCRIPT}\n',
      configuration.swiftgen
        ? '* swiftgen.sh: generates enum for type safe access of your localization and image assets\n'
        : '',
      stringUtil.removeTrailingSlash(destination)
    )

    if (configuration.swiftgen) {
      console.log('Generating SwiftGen content before creating the project...')
      exec('cd ' + destination + ' && mint run swiftgen swiftgen')
    }
  }
}
