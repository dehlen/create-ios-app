import Plugin from '../plugin'
import { exec } from 'shelljs'
import { join } from 'path'
import * as copy from 'recursive-copy'

export default class CarthagePlugin extends Plugin {
  skipInstall: boolean

  constructor(skipInstall: boolean) {
    super()
    this.skipInstall = skipInstall
  }

  private fetchDependencies(destination: string) {
    console.log('⚡️ Fetching carthage dependencies')
    exec('cd ' + destination + ' && ./scripts/fetch-dependencies.sh')
  }

  private buildDependencies(destination: string) {
    console.log('⚡️ Installing carthage dependencies')
    exec('cd ' + destination + ' && ./scripts/build-dependencies.sh')
  }

  questions(): Array<Prompt.PromptParameter> {
    return []
  }

  async execute(configuration: any, destination: string) {
    if (configuration.dependencyManager === 'Carthage') {
      const cartfilePath = join(this.pluginDirectory, 'Cartfile')
      const cartfilePrivatePath = join(this.pluginDirectory, 'Cartfile.private')
      const buildDependenciesScriptPath = join(
        this.pluginDirectory,
        'scripts',
        'build-dependencies.sh'
      )
      const fetchDependenciesScriptPath = join(
        this.pluginDirectory,
        'scripts',
        'fetch-dependencies.sh'
      )

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

      await copy(
        buildDependenciesScriptPath,
        join(destination, 'scripts', 'build-dependencies.sh'),
        {
          overwrite: true,
          expand: true,
          dot: true,
          junk: true
        }
      )

      await copy(
        fetchDependenciesScriptPath,
        join(destination, 'scripts', 'fetch-dependencies.sh'),
        {
          overwrite: true,
          expand: true,
          dot: true,
          junk: true
        }
      )
    }
  }

  async postExecute(configuration: any, destination: string) {
    if (configuration.dependencyManager === 'Carthage') {
      console.log(
        'Please note, that whenever you enter custom carthage dependencies in the future you should update the dependencies in the xcodegen project.yml file.'
      )
      if (this.skipInstall) {
        this.fetchDependencies(destination)
      } else {
        this.buildDependencies(destination)
      }
    }
  }
}
