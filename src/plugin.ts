import { join } from 'path'

export default class Plugin {
  pluginDirectory: string
  constructor() {
    this.pluginDirectory = join(__dirname, '../Template', 'plugins')
  }

  questions(): Array<Prompt.PromptParameter> {
    return []
  }

  async execute(configuration: any, destination: string) {}

  async postExecute(configuration: any, destination: string) {}
}
