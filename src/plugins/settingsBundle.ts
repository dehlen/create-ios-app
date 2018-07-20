import Plugin from '../plugin'

export default class SettingsBundlePlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'toggle',
        name: 'settings',
        message: '⚙️ Should we add a settings bundle for external settings?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes'
      }
    ]
  }

  async execute(configuration: any, destination: string) {
    // TODO: copy settings bundle to xcodeproject
  }

  async postExecute(configuration: any, destination: string) {}
}
