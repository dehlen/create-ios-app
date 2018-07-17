const path = require('path')
const moment = require('moment')
const fs = require('fs')

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

const handleCartfileBackups = (templateDirectory) => {
    const cartfileContents = fs.readFileSync(path.join(templateDirectory, 'Cartfile.bak'))
    const cartfilePrivateContents = fs.readFileSync(path.join(templateDirectory, 'Cartfile.private.bak'))

    fs.writeFileSync(path.join(templateDirectory, 'Cartfile'), cartfileContents)
    fs.writeFileSync(path.join(templateDirectory, 'Cartfile.private'), cartfilePrivateContents)

    const files = fs.readdirSync(templateDirectory)
    files.filter(name => /\.*\.bak$/.test(name)).forEach((file) => { fs.unlinkSync(path.join(templateDirectory, file)) })
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
    const templateDirectory = path.join(__dirname, 'Template')
    await rename.recusivelyCopy(templateDirectory, projectLocation, replacementMap, configuration)
    console.log("finished copying")
    await handleCartfileBackups(templateDirectory)
}