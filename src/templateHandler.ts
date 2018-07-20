import * as copy from 'recursive-copy'

export default class TemplateHandler {
  templateDirectory: string

  constructor(templateDirectory: string) {
    this.templateDirectory = templateDirectory
  }

  async copyTo(destination: string, configuration: object) {
    await copy(this.templateDirectory, destination, {
      overwrite: true,
      expand: true,
      dot: true,
      junk: false,
      filter: ['**/*', '!**/.gitkeep', '!**/plugins', '!**/plugins/**']
    })
  }
}
