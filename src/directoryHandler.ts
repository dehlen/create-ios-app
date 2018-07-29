import { pathExists, ensureDir, remove } from 'fs-extra'
import exit from './exit'
const prompts = require('prompts')

export default class DirectoryHandler {
  private async createDirectory(path: string) {
    try {
      await ensureDir(path)
      console.log('Sucessfully created folder at ' + path)
    } catch (err) {
      console.error('Could not create a folder at ' + path)
      exit()
    }
  }

  private async removeDirectory(path: string) {
    try {
      await remove(path)
    } catch (err) {
      console.error('Could not remove the existing folder at ' + path)
      exit()
    }
  }

  async directoryExists(path: string): Promise<boolean> {
    const exists = await pathExists(path)
    return exists
  }

  private async askProjectFolderCreation(path: string): Promise<boolean> {
    const questions = [
      {
        type: 'toggle',
        name: 'createNewDirectory',
        message:
          'There is already a folder at ' +
          path +
          '. Should we create a new folder and delete the old one?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes'
      }
    ]

    const confirmation: any = await prompts(questions, {
      onCancel: () => {
        exit()
      },
      onSubmit: () => {}
    })

    return confirmation.createNewDirectory
  }

  async handleProjectFolderGeneration(path: string) {
    if (await this.directoryExists(path)) {
      if (await this.askProjectFolderCreation(path)) {
        await this.removeDirectory(path)
        await this.createDirectory(path)
      } else {
        exit()
      }
    } else {
      await this.createDirectory(path)
    }
  }
}
