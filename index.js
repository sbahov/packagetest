#! /usr/bin/env node
const { program } = require('commander');
const { runMochaTestsByTag } = require('./mocha_helper');

program
    .command('run <tag>')
    .action(runTests);

async function runTests(tag) {
    console.log('Tests are running...');
    await runMochaTestsByTag(tag);
}

program.parse()
