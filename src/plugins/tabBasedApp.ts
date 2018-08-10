import Plugin from '../plugin'
import * as replace from 'regex-replace'
import StringUtility from '../stringUtil'
import * as copy from 'recursive-copy'
import { join } from 'path'
import isEmpty = require('is-empty')

export default class TabBasedAppPlugin extends Plugin {
  pluginDirectory: string

  constructor(pluginDirectory: string) {
    super()
    this.pluginDirectory = pluginDirectory
  }

  questions(): Array<Prompt.PromptParameter> {
    return [
      {
        type: 'text',
        name: 'tabs',
        message:
          'Enter names of tabs which should be added to the app other than the default home and about tab - Comma separated'
      }
    ]
  }

  async execute(configuration: any, destination: string) {
    const stringUtil = new StringUtility()
    const tabs: Array<string> = configuration.tabs
      .split(',')
      .map((tab: string) => tab.trim())
      .filter((tab: string) => !isEmpty(tab))

    if (tabs.length > 0) {
      console.log('Generating tabs...')
      const protocolFunctions: string = tabs
        .map(
          (tab: string) =>
            `func ${stringUtil.camelize(tab)}() -> (UIViewController, ${stringUtil.capitalize(
              tab.toLowerCase()
            )}ViewRouting)`
        )
        .join('\n')

      const localizableStrings: string = tabs
        .map((tab: string) => `"${stringUtil.camelize(tab)}" = "${stringUtil.capitalize(tab)}";`)
        .join('\n')

      const storyboardCases: string = tabs
        .map((tab: string) => `case ${stringUtil.camelize(tab)}`)
        .join('\n')

      const additionalTabFunctions: string = tabs
        .map((tab: string) => `${stringUtil.camelize(tab)}()`)
        .join(', ')

      await replace(
        '{ADDITIONAL_TAB_VIEWFACTORY_FUNCTIONS}\n',
        protocolFunctions,
        stringUtil.removeTrailingSlash(destination)
      )

      await replace(
        '{ADDITIONAL_TAB_LOCALIZABLE_STRINGS}\n',
        localizableStrings,
        stringUtil.removeTrailingSlash(destination)
      )

      await replace(
        '{ADDITIONAL_TAB_STORYBOARD_CASES}\n',
        storyboardCases,
        stringUtil.removeTrailingSlash(destination)
      )

      await replace(
        '{ADDITIONAL_TAB_FUNCTIONS}',
        `, ${additionalTabFunctions}`,
        stringUtil.removeTrailingSlash(destination)
      )

      if (!configuration.swiftgen) {
        const additionalTabStrings = tabs
          .map(
            (tab: string) =>
              `/// ${stringUtil.capitalize(
                stringUtil.camelize(tab)
              )}\npublic static let ${stringUtil.camelize(
                tab
              )} = L10n.tr("Localizable", "${stringUtil.camelize(tab)}")`
          )
          .join('\n')
        await replace(
          '{ADDITIONAL_TAB_STRINGS_WITHOUT_SWIFTGEN}\n',
          additionalTabStrings,
          stringUtil.removeTrailingSlash(destination)
        )
      } else {
        await replace(
          '{ADDITIONAL_TAB_STRINGS_WITHOUT_SWIFTGEN}\n',
          '',
          stringUtil.removeTrailingSlash(destination)
        )
      }

      for (const tab of tabs) {
        const tabClassesPath = join(this.pluginDirectory, '{TABNAME}')
        await copy(tabClassesPath, join(destination, '{PROJECT_NAME}', 'Features'), {
          overwrite: false,
          expand: true,
          dot: true,
          junk: false
        })

        await replace(
          '{TABNAME}',
          stringUtil.capitalize(stringUtil.camelize(tab)),
          stringUtil.removeTrailingSlash(destination)
        )

        await replace(
          '{TABNAME_CAMEL_CASED}',
          stringUtil.camelize(tab),
          stringUtil.removeTrailingSlash(destination)
        )
      }
      console.log(`Automagically added tabs: ${tabs.join(', ')} for you.`)
    } else {
      await replace(
        '{ADDITIONAL_TAB_VIEWFACTORY_FUNCTIONS}\n',
        '',
        stringUtil.removeTrailingSlash(destination)
      )

      await replace(
        '{ADDITIONAL_TAB_LOCALIZABLE_STRINGS}\n',
        '',
        stringUtil.removeTrailingSlash(destination)
      )

      await replace(
        '{ADDITIONAL_TAB_STORYBOARD_CASES}\n',
        '',
        stringUtil.removeTrailingSlash(destination)
      )

      await replace('{ADDITIONAL_TAB_FUNCTIONS}', '', stringUtil.removeTrailingSlash(destination))
      await replace(
        '{ADDITIONAL_TAB_STRINGS_WITHOUT_SWIFTGEN}\n',
        '',
        stringUtil.removeTrailingSlash(destination)
      )
    }
  }

  async postExecute(configuration: any, destination: string) {}
}
