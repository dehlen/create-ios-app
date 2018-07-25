import Plugin from '../plugin'

export default class CocoapodsPlugin extends Plugin {
  skipInstall: boolean

  constructor(skipInstall: boolean) {
    super()
    this.skipInstall = skipInstall
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
