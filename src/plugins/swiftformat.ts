import Plugin from '../plugin'
import { exec } from 'shelljs'
import * as copy from 'recursive-copy'
import { join } from 'path'
import StringUtility from '../stringUtil'
import * as replace from 'regex-replace'

export default class SwiftFormatPlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'toggle',
        name: 'swiftformat',
        message: 'Should we add SwiftFormat to automatically format your swift code?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes'
      }
    ]
  }

  async execute(configuration: any, destination: string) {
    if (configuration.swiftformat) {
      const swiftformatScriptPath = join(this.pluginDirectory, 'scripts', 'swiftformat.sh')

      await copy(swiftformatScriptPath, join(destination, 'scripts', 'swiftformat.sh'), {
        overwrite: true,
        expand: true,
        dot: true,
        junk: true
      })
    }
  }

  async postExecute(configuration: any, destination: string) {
    const stringUtil = new StringUtility()
    await replace(
      '{SWIFTFORMAT_MINT}',
      configuration.swiftformat ? 'nicklockwood/SwiftFormat@0.33.13' : '',
      stringUtil.removeTrailingSlash(destination)
    )
  }
}
