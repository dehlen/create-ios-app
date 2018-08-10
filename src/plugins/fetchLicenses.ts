import Plugin from '../plugin'
import * as copy from 'recursive-copy'
import { join } from 'path'
import { exec } from 'shelljs'
import StringUtility from '../stringUtil'
import * as replace from 'regex-replace'

export default class FetchLicensesPlugin extends Plugin {
  pluginDirectory: string
  shouldExecute: boolean

  constructor(pluginDirectory: string, shouldExecute: boolean) {
    super()
    this.shouldExecute = shouldExecute
    this.pluginDirectory = pluginDirectory
  }

  questions(): Array<Prompt.PromptParameter> {
    return []
  }

  async execute(configuration: any, destination: string) {
    if (this.shouldExecute) {
      const fetchLicensesScriptPath = join(this.pluginDirectory, 'scripts', 'fetch-licenses.sh')
      await copy(fetchLicensesScriptPath, join(destination, 'scripts', 'fetch-licenses.sh'), {
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
      '{FETCH_LICENSES_SCRIPT}\n',
      this.shouldExecute
        ? '* fetch-licenses.sh: Fetches license information for all Carthage dependencies and adds them to a library screen in the about page of the app\n'
        : '',
      stringUtil.removeTrailingSlash(destination)
    )
    if (this.shouldExecute) {
      exec('cd ' + destination + ' && ./scripts/fetch-licenses.sh')
    }
  }
}
