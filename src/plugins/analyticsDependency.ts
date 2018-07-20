import Plugin from '../plugin'

export default class AnalyticsDependencyPlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'toggle',
        name: 'analytics',
        message: '📈 Do you need analytics?',
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
