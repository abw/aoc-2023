import { options } from '@abw/badger'

export const cmdLineOptions = async (cfg) => await options({
  name: `part${cfg.part}.js`,
  version: '0.0.1',
  description: `Advent of Code 2023 - day ${cfg.day} / part ${cfg.part}`,
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
  ]
})
