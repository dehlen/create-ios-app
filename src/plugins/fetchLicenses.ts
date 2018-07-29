import Plugin from '../plugin'
import * as copy from 'recursive-copy'
import { join } from 'path'
import { exec } from 'shelljs'

export default class FetchLicensesPlugin extends Plugin {
  pluginDirectory: string
  constructor(pluginDirectory: string) {
    super()
    this.pluginDirectory = pluginDirectory
  }

  questions(): Array<Prompt.PromptParameter> {
    return []
  }

  async execute(configuration: any, destination: string) {
    const fetchLicensesScriptPath = join(this.pluginDirectory, 'scripts', 'fetch-licenses.sh')
    await copy(fetchLicensesScriptPath, join(destination, 'scripts', 'fetch-licenses.sh'), {
      overwrite: true,
      expand: true,
      dot: true,
      junk: true
    })
  }

  async postExecute(configuration: any, destination: string) {
    exec('cd ' + destination + ' && ./scripts/fetch-licenses.sh')
  }
}
