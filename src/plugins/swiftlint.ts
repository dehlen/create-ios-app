import Plugin from '../plugin'

import { join } from 'path'
import * as copy from 'recursive-copy'
import StringUtility from '../stringUtil'
import * as replace from 'regex-replace'

export default class SwiftLintPlugin extends Plugin {
  pluginDirectory: string
  constructor(pluginDirectory: string) {
    super()
    this.pluginDirectory = pluginDirectory
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'toggle',
        name: 'swiftlint',
        message: 'Add SwiftLint as linting mechanism?',
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
        junk: false
      })

      await copy(swiftlintScriptPath, join(destination, 'scripts', 'swiftlint.sh'), {
        overwrite: true,
        expand: true,
        dot: true,
        junk: false
      })
    }
  }

  async postExecute(configuration: any, destination: string) {
    const swiftlintLane = configuration.swiftlint
      ? `desc "Check style and conventions"
    lane :lint do
      swiftlint(strict: true)
    end\n`
      : ''

    const stringUtil = new StringUtility()
    await replace('{SWIFTLINT_LANE}\n', swiftlintLane, stringUtil.removeTrailingSlash(destination))

    await replace(
      '{SWIFTLINT_MINT}\n',
      configuration.swiftlint ? 'realm/SwiftLint@0.26.0\n' : '',
      stringUtil.removeTrailingSlash(destination)
    )

    await replace(
      '{SWIFTLINT_SCRIPT}\n',
      configuration.swiftgen ? '* swiftlint.sh: lints all your .swift files\n' : '',
      stringUtil.removeTrailingSlash(destination)
    )
  }
}
