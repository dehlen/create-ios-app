import Plugin from '../plugin'
import { appendFileSync } from 'fs'
import { join } from 'path'

export default class CuratedDependencyPlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'multiselect',
        name: 'testDependencies',
        message: 'Do you want to add one or more of this curated testing dependencies?',
        choices: [
          { title: 'Quick', value: 'Quick/Quick', selected: true },
          { title: 'Nimble', value: 'Quick/Nimble', selected: true }
        ],
        hint: '- Space to select. Return to submit'
      },
      {
        type: 'multiselect',
        name: 'dependencies',
        message: 'Do you want to add one or more of this curated other dependencies?',
        choices: [
          { title: 'Nuke (Image Caching)', value: 'kean/Nuke', selected: true },
          { title: 'Shallows (Persistence)', value: 'dreymonde/Shallows', selected: true },
          {
            title: 'SwiftEntryKit (Context menus)',
            value: 'huri000/SwiftEntryKit',
            selected: true
          },
          { title: 'PromiseKit (Promises)', value: 'mxcl/PromiseKit', selected: true },
          {
            title: 'ViewAnimator (Animations)',
            value: 'marcosgriselli/ViewAnimator',
            selected: true
          },
          { title: 'Layoutless (Layouting)', value: 'DeclarativeHub/Layoutless', selected: true },
          { title: 'Texture (Async Rendering)', value: 'texturegroup/texture' },
          { title: 'Spruce (Transitions)', value: 'willowtreeapps/spruce-ios' },
          { title: 'Hero', value: 'HeroTransitions/Hero' },
          { title: 'EasyTransitions (Transitions)', value: 'marcosgriselli/EasyTransitions' }
        ],
        hint: '- Space to select. Return to submit'
      }
    ]
  }

  private writeCarthageDependencies(configuration: any, destination: string) {
    for (const testDependency of configuration.testDependencies) {
      appendFileSync(join(destination, 'Cartfile.private'), 'github "' + testDependency + '"\n')
    }
    for (const dependency of configuration.dependencies) {
      appendFileSync(join(destination, 'Cartfile'), 'github "' + dependency + '"\n')
    }
  }

  async execute(configuration: any, destination: string) {
    if (configuration.dependencyManager === 'Carthage') {
      this.writeCarthageDependencies(configuration, destination)
    } else if (configuration.dependencyManager === 'Cocoapods') {
      // TODO: add dependencies to podfile
    }
  }

  async postExecute(configuration: any, destination: string) {}
}
