import Plugin from '../plugin'
import { exec } from 'shelljs'
import { join } from 'path'
import * as copy from 'recursive-copy'

export default class CarthagePlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return []
  }

  private fetchDependencies(destination: string) {
    console.log('⚡️ Installing carthage dependencies')
    exec('cd ' + destination + ' && ./scripts/fetch-dependencies.sh')
  }

  async execute(configuration: any, destination: string) {
    if (configuration.dependencyManager === 'Carthage') {
      const cartfilePath = join(this.pluginDirectory, 'Cartfile')
      const cartfilePrivatePath = join(this.pluginDirectory, 'Cartfile.private')

      await copy(cartfilePath, join(destination, 'Cartfile'), {
        overwrite: true,
        expand: true,
        dot: true,
        junk: true
      })

      await copy(cartfilePrivatePath, join(destination, 'Cartfile.private'), {
        overwrite: true,
        expand: true,
        dot: true,
        junk: true
      })
    }
  }

  async postExecute(configuration: any, destination: string) {
    // TODO: consider a --skipInstall parameter and fetch or install based on that
    if (configuration.dependencyManager === 'Carthage') {
      this.fetchDependencies(destination)
    }
  }
}
