const yaml = require('write-yaml')
const path = require('path')
const shell = require("shelljs")

const createUnitTestConfiguration = (testTargetName, name) => {
    const testTargetConfiguration = {
        platform: 'iOS',
        type: 'bundle.unit-test',
        configFiles: {
            Debug: 'Configurations/Tests.xcconfig',
            Release: 'Configurations/Tests.xcconfig',
        },
        sources: testTargetName,
        dependencies: [
            { 
                target: name
            },
        ],
        scheme: {
            testTargets: [testTargetName],
            gatherCoverageData: true,
        },
    }

    return testTargetConfiguration
}

const createRunScriptPhases = (configuration) => {
    var runScriptPhases = []

    if(configuration.swiftlint) {
        runScriptPhases.push({
            script: `
            if which swiftlint >/dev/null; then
                swiftlint
            else
                echo "warning: SwiftLint not installed, download from https://github.com/realm/SwiftLint"
            fi`,
            name: "Lint with Swiftlint",
        })
    }

    if(configuration.swiftgen) {
        runScriptPhases.push({
            script: `
            if which swiftgen >/dev/null; then
                swiftgen
            else
                echo "warning: SwiftGen not installed, download it from https://github.com/SwiftGen/SwiftGen"
            fi`,
            name: "Generate with SwiftGen",
        })
    }

    return runScriptPhases
}

const createApplicationConfiguration = (name, configuration, testTargetName) => {
    const targetConfiguration = {
        type: 'application',
        platform: 'iOS',
        deploymentTarget: configuration.deploymentTarget,
        configFiles: {
            Debug: 'Configurations/Application.xcconfig',
            Release: 'Configurations/Application.xcconfig',
        },
        sources: [name],
        scheme: {
            testTargets: [testTargetName],
            gatherCoverageData: true,
        },
    }

    const runScriptPhases = createRunScriptPhases(configuration)
    if (runScriptPhases !== undefined && runScriptPhases.length > 0) {
        targetConfiguration['postbuildScripts'] = runScriptPhases
    }

    return targetConfiguration
}

exports.createProjectConfiguration = (name, configuration, projectLocation) => {
    const testTargetName = name + 'Tests'

    const yamlConfiguration = {
        name: name,
        options: {
            bundleIdPrefix: configuration.bundleIdPrefix
        },
        targets: {},
        configFiles: {
            Debug: 'Configurations/Debug.xcconfig',
            Release: 'Configurations/Release.xcconfig',
        },
    };

    yamlConfiguration.targets[name] = createApplicationConfiguration(name, configuration, testTargetName)
    yamlConfiguration.targets[testTargetName] = createUnitTestConfiguration(testTargetName, name)
    
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

exports.createXcodeProject = (projectLocation, configuration) => {
    if(configuration.swiftgen) {
        console.log("Generating SwiftGen content before creating the project...")
        shell.exec("cd " + projectLocation + " && swiftgen")
    }
    if(configuration.fastlane) {
        console.log("Installing ruby gems needed for fastlane configuration")
        shell.exec("cd " + projectLocation + " && bundle install --path vendor/bundle")
    }
    console.log('🛠 Generating Xcode project...')
    shell.exec('xcodegen --spec ' + path.join(projectLocation, 'project.yml') + ' --project ' + projectLocation)
}