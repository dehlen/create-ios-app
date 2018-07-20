import Plugin from '../plugin'
import * as replace from 'regex-replace'
import StringUtility from '../stringUtil'

export default class NamePlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'text',
        name: 'bundleIdPrefix',
        message: 'Set a bundleIdPrefix',
        initial: 'com.domain'
      }
    ]
  }

  async execute(configuration: any, destination: string) {}

  async postExecute(configuration: any, destination: string) {
    const stringUtil = new StringUtility()
    await replace(
      '{BUNDLE_IDENTIFIER_PREFIX}',
      stringUtil.removeTrailingDot(configuration.bundleIdPrefix),
      stringUtil.removeTrailingSlash(destination)
    )
  }
}
