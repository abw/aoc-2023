#!/usr/bin/env node
import { run } from '../lib/run.js'
import { parseInput, walkCity } from './lib.js'

await run(
  { day: 17, part: 1, lines: true },
  ({ lines, debug, debugData }) => {
    debugData('lines:', lines)

    const blocks = parseInput(lines)
    debugData('blocks:', blocks)

    const width    = blocks[0].length
    const height   = blocks.length
    const inbounds = (x, y) => x >= 0 && y >= 0 && x < width && y < height
    const city     = { blocks, width, height, inbounds }
    const losses   = walkCity(city)

    return losses.reduce(
      (smallest, n) => n < smallest
        ? n
        : smallest
    )
  }
)
