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
        name: 'organization',
        message: "🏢 What's your organizations name?",
        initial: ''
      }
    ]
  }
  async execute(configuration: any, destination: string) {}
  async postExecute(configuration: any, destination: string) {
    const stringUtil = new StringUtility()
    await replace(
      '{ORGANIZATION}',
      configuration.organization,
      stringUtil.removeTrailingSlash(destination)
    )
  }
}
