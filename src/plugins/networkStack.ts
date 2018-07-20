import Plugin from '../plugin'

export default class NetworkStackPlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'toggle',
        name: 'network',
        message: '🌏 Do you need a network stack?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes'
      }
    ]
  }
  async execute(configuration: any, destination: string) {
    // TODO: add dependency to cartfile or podfile based on configuration.dependencyManager
  }
  async postExecute(configuration: any, destination: string) {}
}
