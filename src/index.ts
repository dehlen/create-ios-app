#!/usr/bin/env node

import * as program from 'commander'
import { homedir } from 'os'
import packageVersion from './actions/packageVersion'
import handleInit from './actions/initAction'
import handleTestDrive from './actions/testDriveAction'
const main = async () => {
  program.version(await packageVersion())
  program
    .command('init <name>')
    .description('Scaffold a new project with the given name')
    .option('-d, --destination <destination>', 'Set output destination of generated project')
    .option('-s, --skipInstall', 'Skip installation of dependencies and only fetch them')
    .option(
      '-t, --template <templateFileDirectory>',
      'Directory to an optional template.json file to skip setup question with a prebuild configuration'
    )
    .action((name: string, args: any) => {
      const destination = args.destination || homedir()
      const skipInstall = args.skipInstall || false
      const templateFileDirectory = args.template || undefined
      handleInit(name, destination, skipInstall, templateFileDirectory)
    })

  program
    .command('testdrive <name> <carthageFramework>')
    .description('Scaffold a new project with the given carthage framework')
    .option('-d, --destination <destination>', 'Set output destination of generated project')
    .action((name: string, carthageFramework: string, args: any) => {
      const destination = args.destination || homedir()
      handleTestDrive(name, destination, carthageFramework)
    })

  program.parse(process.argv)
}

main()
