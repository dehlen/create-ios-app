import Plugin from '../plugin'
import { join } from 'path'
import * as copy from 'recursive-copy'
import { exec } from 'shelljs'

export default class BootstrapPlugin extends Plugin {
  constructor() {
    super()
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
      junk: true
    })
  }

  async postExecute(configuration: any, destination: string) {}
}
