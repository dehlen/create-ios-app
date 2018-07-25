import { join } from 'path'

interface PluginInterface {
  questions(): Array<Prompt.PromptParameter>
  execute(configuration: any, destination: string): void
  postExecute(configuration: any, destination: string): void
}

export default class Plugin implements PluginInterface {
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
