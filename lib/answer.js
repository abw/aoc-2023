import { brightBlue, brightGreen } from '@abw/badger'

export const answer = (a, options={}) =>
  console.log(
    options.example
      ? brightBlue('Example answer:')
      : brightGreen('Answer:'),
    a
  )
