import Plugin from '../plugin'
import * as replace from 'regex-replace'
import { join } from 'path'
import { exec } from 'shelljs'
import StringUtility from '../stringUtil'
const plist = require('simple-plist')

export default class DeploymentTargetPlugin extends Plugin {
  constructor() {
    super()
  }

  private availableDeploymentTargets(): Prompt.Choice {
    const plistPath = join((exec('xcrun --sdk iphoneos --show-sdk-path', { silent: true }).stdout as string).trim(), 'SDKSettings.plist')
    const data = plist.readFileSync(plistPath)
    return data['DefaultProperties']['DEPLOYMENT_TARGET_SUGGESTED_VALUES'].reverse().map((target: string) => {
        return { title: target, value: target }
    })
  }

  questions(): Array<Prompt.PromptParameter> {
    return [{
        type: 'select',
        name: 'deploymentTarget',
        message: '🚀 Pick a deployment target',
        choices: () => this.availableDeploymentTargets(),
    }]
  }

  async execute(configuration: any, destination: string) {
  }

  async postExecute(configuration: any, destination: string) {
    const stringUtil = new StringUtility()
    await replace(
      '{DEPLOYMENT_TARGET}',
      configuration.deploymentTarget,
      stringUtil.removeTrailingSlash(destination)
    )
  }
}