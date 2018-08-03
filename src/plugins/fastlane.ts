import Plugin from '../plugin'
import * as copy from 'recursive-copy'
import { join } from 'path'
import { exec } from 'shelljs'
import StringUtility from '../stringUtil'
import * as replace from 'regex-replace'

export default class FastlanePlugin extends Plugin {
  pluginDirectory: string
  name: string

  constructor(pluginDirectory: string, name: string) {
    super()
    this.pluginDirectory = pluginDirectory
    this.name = name
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
      },
      {
        type: (prev: any) => prev && 'toggle',
        name: 'match',
        message: 'Should we add match for code signing support?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes'
      },
      {
        type: (prev: any) => prev && 'text',
        name: 'matchGitUrl',
        message:
          'Enter a git url to  a privat repository where your certificates and profile will be stored:'
      },
      {
        type: (prev: any) => prev && 'text',
        name: 'matchAppleDeveloper',
        message: 'Enter the E-Mail address of your Apple Developer username:'
      }
    ]
  }
  async execute(configuration: any, destination: string) {
    if (configuration.fastlane) {
      const fastlanePath = join(this.pluginDirectory, 'fastlane')
      const gemfilePath = join(this.pluginDirectory, 'Gemfile')
      const gemfileLockPath = join(this.pluginDirectory, 'Gemfile.lock')

      const filter = ['**/*']
      if (!configuration.match) {
        filter.push('!**/*Matchfile')
      }
      await copy(fastlanePath, join(destination, 'fastlane'), {
        overwrite: true,
        expand: true,
        dot: true,
        junk: true,
        filter: filter
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
    const betaString = configuration.match
      ? '\n* beta : Increment build number and build the app'
      : ''
    await replace(
      '{FASTLANE_README}\n',
      configuration.fastlane
        ? `## Fastlane
      You can run all available options via \`bundle exec fastlane ios <action>\`.
      Possible actions are:
      * version_bump patch/minor/major: Increment the version of your app
      * tests: Run test target
      * lint : Lint via swiftlint if a configuration is specified. This is only added if you enabled swiftlint support.${betaString}\n`
        : '',
      stringUtil.removeTrailingSlash(destination)
    )

    if (configuration.match) {
      await replace(
        '{MATCH_GIT_URL}',
        configuration.matchGitUrl,
        stringUtil.removeTrailingSlash(destination)
      )

      await replace(
        '{MATCH_APPLE_DEVELOPER}',
        configuration.matchAppleDeveloper,
        stringUtil.removeTrailingSlash(destination)
      )

      const bundleIdentifier =
        stringUtil.removeTrailingDot(configuration.bundleIdPrefix) + '.' + this.name
      await replace(
        '{}',
        `#### Build ####
        lane :beta do
          increment_build_number_in_plist(
            xcodeproj: './${this.name}.xcodeproj',
            scheme: '${this.name}'
          )
          produce(
            app_name: '${this.name}',
            username: '${configuration.matchAppleDeveloper}',
            app_identifier: '${bundleIdentifier}'
          )
          match(type: 'development')
          gym(
            clean: true,
            scheme: '${this.name}',
            configuration: 'Debug',
            output_name: '${this.name}'
          )
      end`
        stringUtil.removeTrailingSlash(destination)
      )

      console.log(`Since you configured match for your project you might need to update your Xcode project to Manual Code Signing
      and update the targets provision profiles accordingly in order for the beta lane to work.`)
    }

    if (configuration.fastlane) {
      console.log('Installing ruby gems needed for fastlane configuration')
      exec('cd ' + destination + ' && bundle install --path vendor/bundle', { silent: true })
    }
  }
}
