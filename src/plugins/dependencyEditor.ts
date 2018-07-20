import Plugin from '../plugin'

export default class DependencyEditorPlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'toggle',
        name: 'editDependencies',
        message: 'Do you want to edit your dependencies even further?',
        initial: true,
        active: 'yes',
        inactive: 'no'
      }
    ]
  }

  async execute(configuration: any, destination: string) {
    // TODO: show editor for files based on configuration.dependencyManager
  }

  async postExecute(configuration: any, destination: string) {}
}
