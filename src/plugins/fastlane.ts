import Plugin from '../plugin'
import * as copy from 'recursive-copy'
import { join } from 'path'
import { exec } from 'shelljs'

export default class FastlanePlugin extends Plugin {
  pluginDirectory: string
  constructor(pluginDirectory: string) {
    super()
    this.pluginDirectory = pluginDirectory
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'toggle',
        name: 'fastlane',
        message: '🚘 Should we add fastlane support?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes'
      }
    ]
  }
  async execute(configuration: any, destination: string) {
    if (configuration.fastlane) {
      const fastlanePath = join(this.pluginDirectory, 'fastlane')
      const gemfilePath = join(this.pluginDirectory, 'Gemfile')
      const gemfileLockPath = join(this.pluginDirectory, 'Gemfile.lock')

      await copy(fastlanePath, join(destination, 'fastlane'), {
        overwrite: true,
        expand: true,
        dot: true,
        junk: true
      })

      await copy(gemfilePath, join(destination, 'Gemfile'), {
        overwrite: true,
        expand: true,
        dot: true,
        junk: true
      })

      await copy(gemfileLockPath, join(destination, 'Gemfile.lock'), {
        overwrite: true,
        expand: true,
        dot: true,
        junk: true
      })
    }
  }
  async postExecute(configuration: any, destination: string) {
    if (configuration.fastlane) {
      console.log('Installing ruby gems needed for fastlane configuration')
      exec('cd ' + destination + ' && bundle install --path vendor/bundle', { silent: true })
    }
  }
}
