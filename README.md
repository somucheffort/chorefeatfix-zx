# chorefeatfix-zx
[`google/zx`](https://github.com/google/zx) version of [`chorefeatfix`](https://github.com/redcarti/chorefeatfix), CLI app that will help you to create semantic commit messages

## What to choose? `zx` or original version?
Practically, they both are identical, but `zx` version is much better. You may use any version.

### Lag
Original version is lagging with `-a`/`--add` option, because of two commands being executed.

`zx` version doesn't have this issue.

# Installing

If you have installed original version, please delete it. It will conflict because of `cff` and `chorefeatfix` commands.

## `npm`

```console
$ npm i https://github.com/redcarti/chorefeatfix-zx -g
```

## `yarn`

```console
$ yarn global add https://github.com/redcarti/chorefeatfix-zx
```

# Usage

```console
Usage: cff [options] <command>

Commands:
  cff feat [message]      new feature for the user, not a new feature for build
                          script
  cff fix [message]       bug fix for the user, not a fix to a build script
  cff docs [message]      changes to the documentation
  cff style [message]     formatting, missing semi colons, etc; no production co
                          de change
  cff refactor [message]  refactoring production code, eg. renaming a variable
  cff test [message]      adding missing tests, refactoring tests; no production
                           code change
  cff chore [message]     updating grunt tasks etc; no production code change
  cff ci [message]        changes to the ci

Options:
      --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]
  -s, --scope    Set scope of a commit                                  [string]
  -a, --add      Perform `git add` command                             [boolean]
  -c, --closes, --close  Close an issue                                 [number]

by redcarti
```

## Commit message

You must use quotes in your message, if you are going to write more than one word.

### Example

One word:

```console
$ cff chore test
```

More than one word:

```console
$ cff chore 'test. simple test. dont use test. something...'
```

## `-s` or `--scope` option

You can use `-s` option to provide scope of your fix, chore, feat, etc.

### Example

```console
$ cff -s deps fix 'updated discord.js to last version'
```

## `-a` or `--add` option

If you provide `-a` option, chorefeatfix will execute `git add .` command, so you don't need to type it yourself!

### Example

```console
$ cff -a fix 'fixed dependabot'
```

Works as

```console
$ git add .
$ cff fix 'fixed dependabot'
```
