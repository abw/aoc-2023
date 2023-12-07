import { bin } from '@abw/badger-filesystem'

export const readFile = (options={}) =>
  bin()
    .file(
      options.filename ||
      (options.example
        ? 'files/example.txt'
        : options.test
          ? 'files/test.txt'
          : 'files/input.txt'
      )
    ).read()

export const readFileTrim = (options={}) =>
  readFile(options)
    .then( text => text.trim() )

export const readFileLines = (options={}) =>
  readFileTrim(options)
    .then( text => text.split('\n') )

