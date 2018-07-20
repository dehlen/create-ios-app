import Plugin from '../plugin'

export default class XcodeGenPlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return []
  }

  async execute(configuration: any, destination: string) {}

  async postExecute(configuration: any, destination: string) {
    // TODO: generate congfig for generation here since here everything will be copied and variabled will be replaced already
    // TODO: generate swiftlint, swiftgen runscript phases
    // TODO: generate carthage run script phase if needed
    // TODO: generate cocoapods workspace if needed
    // TODO: install dependencies or only fetch them base on --skipInstall parameter
    // TODO: generate project
  }
}
