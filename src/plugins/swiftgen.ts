import Plugin from '../plugin'
import { exec } from 'shelljs'
import * as copy from 'recursive-copy'
import { join } from 'path'

export default class SwiftGenPlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'toggle',
        name: 'swiftgen',
        message: 'Should we add swiftgen to generate localizable strings, images, etc?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes'
      }
    ]
  }

  async execute(configuration: any, destination: string) {
    const swiftgenConfigurationPath = join(this.pluginDirectory, 'swiftgen.yml')
    if (configuration.swiftgen) {
      await copy(swiftgenConfigurationPath, join(destination, 'swiftgen.yml'), {
        overwrite: true,
        expand: true,
        dot: true,
        junk: true
      })
    }
  }

  async postExecute(configuration: any, destination: string) {
    if (configuration.swiftgen) {
      console.log('Generating SwiftGen content before creating the project...')
      exec('cd ' + destination + ' && swiftgen')
    }
  }
}
