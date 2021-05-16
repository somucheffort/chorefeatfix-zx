#!/usr/bin/env node

import { $, chalk } from 'zx'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import types from '../types.mjs'
import config from '../config.mjs'
import 'string-format-js'

import shq from '../shq_noquotes.mjs'

// zx settings
$.quote = shq           // command quoting
$.verbose = false       // disables logging what command are being executed

const cffPrefix = chalk.red.bgHex('#000000')('cff')
const gitPrefix = chalk.white.bgHex('#000000')('git')

const toCommitMessage = (type, scope, message, closes) => config.template_commit.format(
    type, 
    scope ? config.template_scope.format(scope) : '', 
    message, 
    closes ? config.template_closes.format(closes) : ''
) // `${type}${scope ? `(${scope})` : ''}: ${message}`

const gitAdd = async () => await $`git add .`

const gitCommit = async (commitMessage) => await $`git commit -m "${commitMessage}"`

const commitArgv = async (argv) => {
    const commitMessage = toCommitMessage(
        argv._[0], 
        argv.scope, 
        argv.message,
        argv.closes
    )

    if (commitMessage.length > config.commit_length) {
        console.log(`${cffPrefix}: Commit message is longer than 72 chars!`)
        process.exit(1)
    }

    if (argv.add || argv.a) 
        await gitAdd()

    await gitCommit(commitMessage)    
}

const commitYargs = (yargs) => {
    yargs
    .positional('message', {
        describe: 'Commit message. Use quotes.',
    })
    .required('message')
}

const cff = yargs(hideBin(process.argv))
    .scriptName('cff')
    .usage('Usage: $0 [options] <command>')
    .help('h')
    .alias('h', 'help')
    .epilog('by redcarti')
    .demandCommand()
    .option('scope', {
        alias: 's',
        type: 'string',
        description: 'Set scope of a commit'
    })
    .option('add', {
        alias: 'a',
        type: 'boolean',
        description: 'Perform `git add .` command'
    })
    .option('closes', {
        alias: ['close', 'c'],
        type: 'number',
        description: 'Close an issue'
    })

Object.entries(types).forEach(([type, msg]) => {
    cff
    .command(type + ' [message]', msg, commitYargs, commitArgv)
})
    
cff.argv