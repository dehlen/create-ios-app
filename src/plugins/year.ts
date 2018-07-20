import Plugin from '../plugin'
import * as replace from 'regex-replace'
import * as moment from 'moment'
import StringUtility from '../stringUtil'

export default class YearPlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return []
  }

  async execute(configuration: any, destination: string) {}

  async postExecute(configuration: any, destination: string) {
    const stringUtil = new StringUtility()
    await replace('{YEAR}', moment().format('YYYY'), stringUtil.removeTrailingSlash(destination))
  }
}
