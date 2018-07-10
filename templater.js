const path = require('path')
const moment = require('moment')

const rename = require('./rename')

exports.copyTemplateProject = async (projectLocation, name, configuration) => {
    const replacementMap = {
        '{PROJECT_NAME}': name,
        '{AUTHOR}': configuration.name,
        '{TODAY}': moment().format('LL'),
        '{YEAR}': moment().format('YYYY'),
        '{ORGANIZATION}': configuration.organization,
    }
    await rename.recusivelyCopy(path.join(__dirname, 'Template'), projectLocation, replacementMap, configuration)
}