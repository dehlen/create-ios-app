import Plugin from '../plugin'
import * as replace from 'regex-replace'
import StringUtility from '../stringUtil'
import { join } from 'path'
import { move } from 'fs-extra'
import DirectoryHandler from '../directoryHandler'

export default class NamePlugin extends Plugin {
  projectName: string
  constructor(projectName: string) {
    super()
    this.projectName = projectName
  }

  questions(): Array<Prompt.PromptParameter> {
    return []
  }

  async execute(configuration: any, destination: string) {}

  async postExecute(configuration: any, destination: string) {
    // Since there are folders and files which contain {PROJECT_NAME} replace will fail if these files are renamed by this replacement operation
    // All other files in this directory will not be found since the directory name has changed
    // Therefore we are only replacing the file contents and move the specific files afterwards
    const stringUtil = new StringUtility()
    await replace('{PROJECT_NAME}', this.projectName, stringUtil.removeTrailingSlash(destination), {
      fileContentsOnly: true
    })

    // This should be revisited since it is kinda hacky and requires a specific order of function calls to correctly work
    const filesToMove: Array<string> = [
      join(destination, '{PROJECT_NAME}'),
      join(destination, '{PROJECT_NAME}Tests'),
      join(destination, this.projectName + 'Tests', '{PROJECT_NAME}Tests.swift'),
      join(destination, '{PROJECT_NAME}UITests'),
      join(destination, this.projectName + 'UITests', '{PROJECT_NAME}UITests.swift')
    ]

    const directoryHandler = new DirectoryHandler()
    for (const file of filesToMove) {
      if (await directoryHandler.directoryExists(file)) {
        await move(file, file.replace(/\{PROJECT_NAME\}/g, this.projectName), { overwrite: false })
      }
    }
  }
}
