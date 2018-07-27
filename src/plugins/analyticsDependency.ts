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
    // TODO: add dependency to cartfile
  }
  async postExecute(configuration: any, destination: string) {}
}
