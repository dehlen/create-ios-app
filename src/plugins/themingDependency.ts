import Plugin from '../plugin'

export default class ThemingDependencyPlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'toggle',
        name: 'theming',
        message: '⚪️⚫️ Do you need a global theming solution?',
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
