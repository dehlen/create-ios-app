const path = require('path')
const moment = require('moment')

const rename = require('./rename')

const removeTrailingDot = (string) => {
    return string.replace(/\.$/, '');
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
    }
    await rename.recusivelyCopy(path.join(__dirname, 'Template'), projectLocation, replacementMap, configuration)
}