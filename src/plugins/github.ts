import Plugin from '../plugin'
import * as git from 'simple-git'
import isEmpty = require('is-empty')
import * as replace from 'regex-replace'
import StringUtility from '../stringUtil'

export default class GithubPlugin extends Plugin {
  constructor() {
    super()
  }

  private initRepository(workingDir: string, remoteUrl: string) {
    console.log('Initializing GitHub repository')
    if (isEmpty(remoteUrl)) {
      git(workingDir)
        .init()
        .add('./*')
        .commit('initial commit', () => console.log('✅ Initialized successfully'))
    } else {
      git(workingDir)
        .init()
        .add('./*')
        .commit('initial commit')
        .addRemote('origin', remoteUrl)
        .push(['-u', 'origin', 'master'], () =>
          console.log('✅ Initialized successfully and pushed to: ' + remoteUrl)
        )
    }
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'text',
        name: 'githubURL',
        message:
          "🌎 Any Github URL that you'll be hosting this project at? You may leave this empty.",
        initial: ''
      }
    ]
  }

  async execute(configuration: any, destination: string) {}

  async postExecute(configuration: any, destination: string) {
    this.initRepository(destination, configuration.githubURL)

    const gitPushCommand = isEmpty(configuration.githubURL) ? '' : 'push_to_git_remote'
    const stringUtil = new StringUtility()
    await replace(
      '{GIT_PUSH_CONFIGURATION}',
      gitPushCommand,
      stringUtil.removeTrailingSlash(destination)
    )
  }
}
