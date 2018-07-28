import Plugin from '../plugin'

export default class LoggingDependencyPlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'toggle',
        name: 'logging',
        message: '⌨️ Do you need logging?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes'
      }
    ]
  }

  async execute(configuration: any, destination: string) {}

  async postExecute(configuration: any, destination: string) {}
}
