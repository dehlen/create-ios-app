import { join } from 'path'

interface PluginInterface {
  questions(): Array<Prompt.PromptParameter>
  execute(configuration: any, destination: string): void
  postExecute(configuration: any, destination: string): void
}

export default class Plugin implements PluginInterface {
  constructor() {}

  questions(): Array<Prompt.PromptParameter> {
    return []
  }

  async execute(configuration: any, destination: string) {}

  async postExecute(configuration: any, destination: string) {}
}
