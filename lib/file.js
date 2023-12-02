import { file } from '@abw/badger-filesystem'

export const readFile = (options={}) =>
  file(
    options.filename ||
    (options.example
      ? 'files/example.txt'
      : 'files/input.txt'
    )
  ).read()

export const readFileTrim = (options={}) =>
  readFile(options)
    .then( text => text.trim() )

export const readFileLines = (options={}) =>
  readFileTrim(options)
    .then( text => text.split('\n') )

