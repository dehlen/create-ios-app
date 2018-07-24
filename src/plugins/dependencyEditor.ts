import Plugin from '../plugin'
import { spawnSync } from 'child_process'
import { join } from 'path'

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
    if (configuration.editDependencies) {
      console.log('The editor will open the files for you to edit.')
      console.log('Use :tabn (next), :tabp (previous) and :tabc (close) to control the tabs.')
      console.log('\n')

      const files: Array<string> = []
      if (configuration.dependencyManager === 'Carthage') {
        files.push(join(destination, 'Cartfile'))
        files.push(join(destination, 'Cartfile.private'))
      } else if (configuration.dependencyManager === 'Cocoapods') {
        // TODO: open Podfile for further editing
      } else {
        return
      }
      const editor = 'vim'
      const child = spawnSync(editor, ['-p', ...files], {
        stdio: 'inherit'
      })
    }
  }

  async postExecute(configuration: any, destination: string) {}
}
