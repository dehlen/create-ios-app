const prompts = require('prompts')
const shell = require("shelljs")
const yaml = require('write-yaml')
const path = require('path')
const fs = require('fs');
const plist = require('simple-plist');

const questions = [
		{
        type: 'text',
        name: 'name',
        message: '👶 What\'s your name?',
        initial: 'John Doe',
    },
    {
        type: 'text',
        name: 'githubURL',
        message: '🌎 Any Github URL that you\'ll be hosting this project at? You may leave this empty.',
        initial: '',
    },
    {
        type: 'list',
        name: 'configurations',
        message: 'Enter configurations - Comma separated',
    },
    {
        type: 'text',
        name: 'bundleIdPrefix',
        message: 'Set a bundleIdPrefix',
        initial: 'com.domain',
    },
    {
        type: 'select',
        name: 'deploymentTarget',
        message: '🚀 Pick a deployment target',
        choices: () => availableDeploymentTargets(),
    },
    {
        type: 'toggle',
        name: 'tabBased',
        message: 'Is this a tab based app?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes'
    },
    {
        type: prev => prev && 'list',
        name: 'tabs',
        message: 'Enter names of tabs - Comma separated',
    },
    {
        type: 'toggle',
        name: 'swiftlint',
        message: 'Add Swiftlint as linting mechanism?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes',
    },
    {
        type: 'toggle',
        name: 'fastlane',
        message: '🚘 Should we add fastlane support?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes',
    },
    {
        type: 'toggle',
        name: 'swiftgen',
        message: 'Should we add swiftgen to generate localizable string, images, etc?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes',
    },
    {
        type: 'toggle',
        name: 'settings',
        message: '⚙️ Should we add a settings bundle for external settings?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes',
    },
    {
        type: 'toggle',
        name: 'network',
        message: '🌏 Do you need a network stack?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes',
    },
    {
        type: 'toggle',
        name: 'logging',
        message: '⌨️ Do you need logging?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes',
    },
    {
        type: 'toggle',
        name: 'analytics',
        message: '📈 Do you need analytics?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes',
    },
    {
        type: 'toggle',
        name: 'theming',
        message: '⚪️⚫️ Do you need a global theming solution?',
        active: 'yes',
        inactive: 'no',
        initial: 'yes',
    },
    {
        type: 'select',
        name: 'uiengine',
        message: 'Pick UI engine',
        choices: [
            { title: 'UIKit', value:'uikit' },
            { title: 'Layoutless', value: 'layoutless', selected: true },
            { title: 'TextureKit', value: 'textureKit'}
        ],
        initial: 1,
    },
    {
        type: 'multiselect',
        name: 'animations',
        message: 'Do you need any of these animation frameworks?',
        choices: [
            { title: 'Hero', value:'hero' },
            { title: 'Spruce', value: 'spruce'},
            { title: 'ViewAnimator', value: 'viewAnimator', selected: true },
            { title: 'EasyTransitions', value: 'easyTransitions'}
        ],
        hint: '- Space to select. Return to submit'
    },
    {
        type: 'multiselect',
        name: 'dependencies',
        message: 'Any other dependencies you would like to add for convenience?',
        choices: [
            { title: 'Nuke (Image Caching)', value:'nuke', selected: true  },
            { title: 'Shallows (Persistence)', value: 'shallows', selected: true },
            { title: 'SwiftEntryKit (Context menus)', value: 'swiftentrykit', selected: true },
            { title: 'PromiseKit (Promises)', value: 'promisekit', selected: true }
        ],
        hint: '- Space to select. Return to submit'
    }
]

const confirmation = [
		{
        type: 'toggle',
        name: 'shouldProceed',
        message: 'Proceed? ✅',
        active: 'yes',
        inactive: 'no',
        initial: 'yes'
    },
]

const availableDeploymentTargets = () => {
    const plistPath = path.join(shell.exec('xcrun --sdk iphoneos --show-sdk-path').stdout.trim(), 'SDKSettings.plist')
    const data = plist.readFileSync(plistPath);
    return data['DefaultProperties']['DEPLOYMENT_TARGET_SUGGESTED_VALUES'].reverse().map((target) => {
        return { title: target, value: target }
    })
}

const createProjectConfiguration = (name, configuration, projectLocation) => {
    const yamlConfiguration = {
        name: name,
        options: {
            bundleIdPrefix: configuration.bundleIdPrefix
        },
        targets: {}
    };

    const targetConfiguration = {
        type: 'application',
        platform: 'iOS',
        deploymentTarget: configuration.deploymentTarget
    }
    yamlConfiguration.targets[name] = targetConfiguration
    
    const specLocation = path.join(projectLocation, '/project.yml')
    try {
        yaml.sync(specLocation, yamlConfiguration)
        console.log('✅ Created project spec at ' + specLocation)
    } catch(err) {
        console.log('Could not create project spec.')
        console.error(err)
        exit()
    }
}

const createXcodeProject = (projectLocation) => {
    console.log('🛠 Generating Xcode project...')
    shell.exec('xcodegen --spec ' + path.join(projectLocation, 'project.yml') + ' --project ' + projectLocation)
}

const exit = () => {
	console.error('❌ Aborting...')
  process.exit()
}

module.exports = {
    setup: async (name, projectLocation) => {
        const configuration = await prompts(questions, {onCancel: () => {
            console.error('Aborting...')
            process.exit()
        }})
        console.log("create-ios-app will now generate a project with the following parameters: ")
        console.log("Name: ", name)
        console.log("Destination: ", projectLocation)
        console.log("Configuration: ", configuration)

        const confirmation = await prompts(confirmation, {onCancel: () => {
          	exit()
        }})

        if (!confirmation.shouldProceed) {
        		exit()
        }

        console.log("🚀 Please hold tight while create-ios-app generates the project for you")
        createProjectConfiguration(name, configuration, projectLocation)
        createXcodeProject(projectLocation)
    },
};