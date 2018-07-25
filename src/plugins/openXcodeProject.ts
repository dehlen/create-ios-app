import Plugin from '../plugin'
import { exec } from 'shelljs'
import { readdirSync } from 'fs'
import { join } from 'path'

export default class OpenXcodeProjectPlugin extends Plugin {
  constructor() {
    super()
  }

  questions(): Array<Prompt.PromptParameter> {
    return []
  }

  async execute(configuration: any, destination: string) {}

  async postExecute(configuration: any, destination: string) {
    const directoryContents = readdirSync(destination)
    const files = directoryContents
      .filter(file => /.*\.xcodeproj/gi.test(file))
      .map(file => join(destination, file))
      .join(' ')
    if (files.length > 0) {
      console.log(files)
      exec('open ' + files)
    } else {
      console.error('Could not find any Xcode project. Therefore no project will be opened.')
    }
  }
}
