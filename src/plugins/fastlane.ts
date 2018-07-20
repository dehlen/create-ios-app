import Plugin from '../plugin'

export default class FastlanePlugin extends Plugin {
  constructor() {
    super()
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
      // TODO copy fastlane folder and Gemfile, Gemfile.lock
    }
  }
  async postExecute(configuration: any, destination: string) {
    // TODO: bundle install
  }
}
