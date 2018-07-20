const prompts = require('prompts')
import Plugin from './plugin'
import exit from './exit'

export default class Generator {
  name: string
  destination: string
  plugins: Array<Plugin>

  constructor(name: string, destination: string) {
    this.name = name
    this.destination = destination
    this.plugins = []
  }

  register(plugins: Array<Plugin>) {
    this.plugins.push(...plugins)
  }

  async ask(): Promise<object> {
    const questions: Array<Prompt.PromptParameter> = []
    this.plugins.forEach(plugin => {
      questions.push(...plugin.questions())
    })

    const configuration = await prompts(questions, {
      onCancel: () => {
        exit()
      },
      onSubmit: () => {}
    })

    const isConfirmed = await this.confirm(configuration)
    if (isConfirmed) {
      return configuration
    } else {
      exit()
    }
  }

  async confirm(configuration: object): Promise<boolean> {
    const confirmationQuestion = [
      {
        type: 'toggle',
        name: 'shouldProceed',
        message: 'Proceed? ✅',
        active: 'yes',
        inactive: 'no',
        initial: 'yes'
      }
    ]

    console.log('The project will be generated with the following parameters: ')
    console.log('Name: ', this.name)
    console.log('Destination: ', this.destination)
    console.log('Configuration: ', configuration)

    const confirmation: any = await prompts(confirmationQuestion, {
      onCancel: () => {
        exit()
      },
      onSubmit: () => {}
    })

    return confirmation.shouldProceed
  }

  async run(configuration: object) {
    console.log('🚀 Please hold tight while create-ios-app generates the project for you')
    await this.plugins.forEach((plugin: Plugin) => plugin.execute(configuration, this.destination))
    await this.plugins.forEach((plugin: Plugin) =>
      plugin.postExecute(configuration, this.destination)
    )
  }
}
