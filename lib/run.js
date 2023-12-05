import { Debugger } from '@abw/badger'
import { answer } from './answer.js'
import { readFileTrim } from './file.js'
import { cmdLineOptions } from './options.js'
import { inspect } from 'node:util'

export async function run(options={}, process) {
  const config = { ...options, ...await cmdLineOptions(options) }
  config.text  = await readFileTrim(config)
  if (options.lines) {
    config.lines = config.text.split('\n')
  }
  if (options.blocks) {
    config.blocks = config.text.split('\n\n')
  }
  config.debug = Debugger(
    config.debugging,
    config.debugPrefix || `AOC D${config.day}:P${config.part} > `,
    config.debugColor || 'yellow'
  )
  config.debugData = (format, data) =>
    config.debug(
      format,
      inspect(data, { depth: null, colors: true })
    )

  const result = await process(config)

  answer(result, config)
}

