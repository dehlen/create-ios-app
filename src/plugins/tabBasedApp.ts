import Plugin from '../plugin'

export default class TabBasedAppPlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'toggle',
        name: 'tabBased',
        message: 'Is this a tab based app?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes'
      },
      {
        type: (prev: any) => prev && 'list',
        name: 'tabs',
        message: 'Enter names of tabs - Comma separated'
      }
    ]
  }

  async execute(configuration: any, destination: string) {
    // copy files based on this configuration
  }

  async postExecute(configuration: any, destination: string) {}
}
