import { brightBlue, brightGreen, brightYellow } from '@abw/badger'

export const answer = (a, options={}) =>
  console.log(
    options.example
      ? brightBlue('Example answer:')
      : options.test
        ? brightYellow('Test answer:')
        : brightGreen('Answer:'),
    a
  )
