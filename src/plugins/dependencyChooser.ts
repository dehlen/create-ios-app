import Plugin from '../plugin'

export default class DependencyChooserPlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'select',
        name: 'dependencyManager',
        message: 'Pick a dependency manager',
        choices: [
          { title: 'Carthage', value: 'Carthage' },
          { title: 'Cocoapods', value: 'Cocoapods' }
        ],
        initial: 0
      }
    ]
  }

  async execute(configuration: any, destination: string) {
    // copy files based on selection
  }

  async postExecute(configuration: any, destination: string) {}
}
