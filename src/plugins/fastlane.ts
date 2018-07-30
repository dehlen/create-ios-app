import Plugin from '../plugin'
import * as copy from 'recursive-copy'
import { join } from 'path'
import { exec } from 'shelljs'
import StringUtility from '../stringUtil'
import * as replace from 'regex-replace'

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
    const stringUtil = new StringUtility()
    await replace(
      '{FASTLANE_README}\n',
      configuration.fastlane
        ? `## Fastlane
      You can run all available options via \`bundle exec fastlane ios <action>\`.
      Possible actions are:
      * version_bump patch/minor/major: Increment the version of your app
      * tests: Run test target
      * lint : Lint via swiftlint if a configuration is specified. This is only added if you enabled swiftlint support.
      * beta : Increment build number and build the app\n`
        : '',
      stringUtil.removeTrailingSlash(destination)
    )

    if (configuration.fastlane) {
      console.log('Installing ruby gems needed for fastlane configuration')
      exec('cd ' + destination + ' && bundle install --path vendor/bundle', { silent: true })
    }
  }
}
