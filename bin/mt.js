#!/usr/bin/env node
let process = require('process')
let {exec} = require('child_process')
const { Command } = require('commander');

const program = new Command();
program.version('0.0.1');

program
  .command('g', 'xxx', {executableFile: '../src/gulp'})

program
  .command('c <projectName>')
  .action((projectName) => {
    let create = require('../src/create')
    create.copy(projectName)
  })

program
  .command('o')
  .action(() => {
    exec('explorer')
  })

program.parse(process.argv);