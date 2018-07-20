#!/usr/bin/env node

import * as program from 'commander'
import { homedir } from 'os'
import packageVersion from './actions/packageVersion'
import handleInit from './actions/initAction'

const main = async () => {
  program.version(await packageVersion())
  program
    .command('init <name>')
    .description('Scaffold a new project with the given name')
    .option('-d, --destination <destination>', 'Set output destination of generated project')
    .action((name: string, args: any) => {
      const destination = args.destination || homedir()
      handleInit(name, destination)
    })

  program.parse(process.argv)
}

main()
