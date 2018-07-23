import Plugin from '../plugin'

export default class CocoapodsPlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return []
  }

  async execute(configuration: any, destination: string) {
    // TODO: copy podfile and everything else into the folder
  }

  async postExecute(configuration: any, destination: string) {
    // TODO: consider a --skipInstall parameter and fetch or install based on that
  }
}
