import Plugin from '../plugin'
import { join } from 'path'
import * as copy from 'recursive-copy'
import { exec } from 'shelljs'

export default class BootstrapPlugin extends Plugin {
  pluginDirectory: string
  constructor(pluginDirectory: string) {
    super()
    this.pluginDirectory = pluginDirectory
  }

  questions(): Array<Prompt.PromptParameter> {
    return []
  }

  async execute(configuration: any, destination: string) {
    const bootstrapScriptPath = join(this.pluginDirectory, 'scripts', 'bootstrap.sh')

    await copy(bootstrapScriptPath, join(destination, 'scripts', 'bootstrap.sh'), {
      overwrite: true,
      expand: true,
      dot: true,
      junk: false
    })
  }

  async postExecute(configuration: any, destination: string) {}
}
