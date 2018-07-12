# create-ios-app
A command line interface to create an iOS Boilerplate Xcode project

[![Build Status](https://travis-ci.org/dehlen/create-ios-app.svg?branch=develop)](https://travis-ci.org/dehlen/create-ios-app)

## Installation
Install dependencies: ```chmod +x ./scripts/installDependencies.sh```
Install node modules: ```yarn```
Link binary: ```yarn link create-ios-app```

## Run
```create-ios-app init <projectName> --destination <projectDestination>```

For further help call: ```create-ios-app --help```

## Created Xcode project
If you enabled fastlane support in the setup a sample configuration is copied to your generated Xcode project.
You can run all available options via ```bundle exec fastlane ios <action>```.
Possible actions are:
* version_bump patch/minor/major: Increment the version of your app
* tests: Run test target 
* lint : Lint via swiftlint if a configuration is specified. This is only added if you enabled swiftlint support.
* beta : Increment build number and build the app