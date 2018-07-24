import Plugin from '../plugin'

import * as replace from 'regex-replace'
import { join } from 'path'
import * as copy from 'recursive-copy'
import StringUtility from '../stringUtil'

export default class SwiftLintPlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'toggle',
        name: 'swiftlint',
        message: 'Add Swiftlint as linting mechanism?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes'
      }
    ]
  }

  async execute(configuration: any, destination: string) {
    if (configuration.swiftlint) {
      const swiftlintConfigurationPath = join(this.pluginDirectory, '.swiftlint.yml')
      const swiftlintScriptPath = join(this.pluginDirectory, 'scripts', 'swiftlint.sh')

      await copy(swiftlintConfigurationPath, join(destination, '.swiftlint.yml'), {
        overwrite: true,
        expand: true,
        dot: true,
        junk: true
      })

      await copy(swiftlintScriptPath, join(destination, 'scripts', 'swiftlint.sh'), {
        overwrite: true,
        expand: true,
        dot: true,
        junk: true
      })
    }
  }

  async postExecute(configuration: any, destination: string) {
    const swiftlintLane = configuration.swiftlint
      ? `desc "Check style and conventions"
    lane :lint do
      swiftlint(strict: true)
    end`
      : ''

    const stringUtil = new StringUtility()
    await replace(
      '{SWIFTLINT_LANE}',
      configuration.swiftlintLane,
      stringUtil.removeTrailingSlash(destination)
    )
  }
}
