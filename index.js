#!/usr/bin/env node

const program = require('commander')
const generator = require('./generator')

program
  .version('0.1.0')
  .option('-d, --destination <destination>', 'Set output destination of generated project')
  .command('init <name>')
  .description('generate boilerplate project with given name')
  .action(async (name) => {
  	const destination = !!program.destination ? program.destination : process.cwd()
    await generator.setup(name, destination)
  })

program.parse(process.argv)