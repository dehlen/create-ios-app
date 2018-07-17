const prompts = require('prompts')
const shell = require("shelljs")
const path = require('path')
const plist = require('simple-plist')
const child_process = require('child_process')
const copy = require('recursive-copy')

const xcodegen = require('./xcodegen')
const templater = require('./templater')
const exit = require('./exit')

const questions = [
	{
        type: 'text',
        name: 'name',
        message: '👶 What\'s your name?',
        initial: 'John Doe',
    },
    {
        type: 'text',
        name: 'organization',
        message: '🏢 What\'s your organizations name?',
        initial: '',
    },
    {
        type: 'text',
        name: 'githubURL',
        message: '🌎 Any Github URL that you\'ll be hosting this project at? You may leave this empty.',
        initial: '',
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
        message: 'Should we add swiftgen to generate localizable strings, images, etc?',
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
        type: 'multiselect',
        name: 'testDependencies',
        message: 'Do you want to add one or more of this curated testing dependencies?',
        choices: [
            { title: 'Quick', value:'Quick/Quick', selected: true  },
            { title: 'Nimble', value: 'Quick/Nimble', selected: true },
        ],
        hint: '- Space to select. Return to submit'
    },
    {
        type: 'multiselect',
        name: 'dependencies',
        message: 'Do you want to add one or more of this curated other dependencies?',
        choices: [
            { title: 'Nuke (Image Caching)', value:'kean/Nuke', selected: true  },
            { title: 'Shallows (Persistence)', value: 'dreymonde/Shallows', selected: true },
            { title: 'SwiftEntryKit (Context menus)', value: 'huri000/SwiftEntryKit', selected: true },
            { title: 'PromiseKit (Promises)', value: 'mxcl/PromiseKit', selected: true },
            { title: 'ViewAnimator (Animations)', value: 'marcosgriselli/ViewAnimator', selected: true },
            { title: 'Layoutless (Layouting)', value: 'DeclarativeHub/Layoutless', selected: true },
            { title: 'Texture (Async Rendering)', value: 'texturegroup/texture'},
            { title: 'Spruce (Transitions)', value: 'willowtreeapps/spruce-ios'},
            { title: 'Hero', value:'HeroTransitions/Hero' },
            { title: 'EasyTransitions (Transitions)', value: 'marcosgriselli/EasyTransitions'},
        ],
        hint: '- Space to select. Return to submit'
    },
    {
        type: 'multiselect',
        name: 'editor',
        message: '✏️ Do you want to edit your Cartfiles even further?',
        choices: [
            { title: 'Cartfile', value: 'Cartfile' },
            { title: 'Cartfile.private', value: 'Cartfile.private' },
        ],
        hint: '- Space to select. Return to submit'
    },
]

const confirmationQuestion = [
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

module.exports = {
    setup: async (name, projectLocation) => {
        const configuration = await prompts(questions, {onCancel: () => {
        	exit.exit()
        }})
        if(configuration.editor.length > 0) {
            const files = configuration.editor.map(fileName => path.join(__dirname, 'Template', fileName))
            for (file of files) {
                await copy(file, file + '.bak', { overwrite: true })
            }

            //TODO: add dependecies into cartfile, needs to happen here but should also happen if no editor was requested
            console.log("You selected to edit " + configuration.editor.join(" and ") + ".")
            console.log("The editor will open the files for you to edit.")
            console.log("Use :tabn (next), :tabp (previous) and :tabc (close) to control the tabs.")
            console.log("\n");
            var editor = 'vim'
            var child = child_process.spawnSync(editor, ['-p', ...files], {
                stdio: 'inherit'
            });
        }

        console.log("create-ios-app will now generate a project with the following parameters: ")
        console.log("Name: ", name)
        console.log("Destination: ", projectLocation)
        console.log("Configuration: ", configuration)

        const confirmation = await prompts(confirmationQuestion, {onCancel: () => {
          exit.exit()
        }})

        if (!confirmation.shouldProceed) {
        	exit.exit()
        }

        console.log("🚀 Please hold tight while create-ios-app generates the project for you")
        await xcodegen.createProjectConfiguration(name, configuration, projectLocation)
        await templater.copyTemplateProject(projectLocation, name, configuration)
        await xcodegen.createXcodeProject(projectLocation, configuration)
    },
};