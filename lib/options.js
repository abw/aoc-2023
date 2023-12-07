import { options } from '@abw/badger'

export const cmdLineOptions = async ({ day, part }) => await options({
  name: `day-${day.toString().padStart(2, '0')}/part${part}/run.js`,
  version: '0.0.1',
  description: `Advent of Code 2023 - day ${day} / part ${part}`,
  options: [
    {
      name:     'debugging',
      short:    'd',
      about:    'Debugging',
    },
    {
      name:     'example',
      short:    'e',
      about:    'Example',
    },
    {
      name:     'test',
      short:    't',
      about:    'Test',
    },
  ]
})
