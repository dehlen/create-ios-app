const path = require('path')
const moment = require('moment')

const rename = require('./rename')
const stringUtil = require('./stringUtil')

const removeTrailingDot = (string) => {
    return string.replace(/\.$/, '');
}

const swiftlintLane = (shouldBeAdded) => {
    if (shouldBeAdded) {
        return `desc "Check style and conventions"
        lane :lint do
            swiftlint(strict: true)
        end`
    } else {
        return ''
    }
}

const gitPushConfiguration = (githubURL) => {
    if (stringUtil.isEmpty(githubURL)) {
        return ""
    } else {
        return "push_to_git_remote"
    }
}

exports.copyTemplateProject = async (projectLocation, name, configuration) => {
    const replacementMap = {
        '{PROJECT_NAME}': name,
        '{AUTHOR}': configuration.name,
        '{TODAY}': moment().format('LL'),
        '{YEAR}': moment().format('YYYY'),
        '{ORGANIZATION}': configuration.organization,
        '{BUNDLE_IDENTIFIER_PREFIX}': removeTrailingDot(configuration.bundleIdPrefix),
        '{DEPLOYMENT_TARGET}': configuration.deploymentTarget,
        '{SWIFTLINT_LANE}': swiftlintLane(configuration.swiftlint),
        '{GIT_PUSH_CONFIGURATION}': gitPushConfiguration(configuration.githubURL),
    }
    await rename.recusivelyCopy(path.join(__dirname, 'Template'), projectLocation, replacementMap, configuration)
}