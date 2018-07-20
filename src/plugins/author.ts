import Plugin from '../plugin'
import StringUtility from '../stringUtil'
import * as replace from 'regex-replace'

export default class AuthorPlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'text',
        name: 'name',
        message: "👶 What's your name?",
        initial: 'John Doe'
      }
    ]
  }
  async execute(configuration: any, destination: string) {}
  async postExecute(configuration: any, destination: string) {
    const stringUtil = new StringUtility()
    await replace('{AUTHOR}', configuration.name, stringUtil.removeTrailingSlash(destination))
  }
}
