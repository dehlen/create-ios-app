import Plugin from '../plugin'

export default class SwiftGenPlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'toggle',
        name: 'swiftgen',
        message: 'Should we add swiftgen to generate localizable strings, images, etc?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes'
      }
    ]
  }

  async execute(configuration: any, destination: string) {
    if (configuration.swiftgen) {
      // copy swiftgen.yml and Resources folder
    }
  }

  async postExecute(configuration: any, destination: string) {}
}
