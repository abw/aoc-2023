#!/usr/bin/env node
import { run } from '../lib/run.js'
import { parseInput, reflection } from './lib.js'

await run(
  { day: 13, part: 1, blocks: true },
  ({ blocks, debugData }) => {
    debugData('blocks:', blocks)

    const maps = parseInput(blocks)
    debugData('maps:', maps)

    return maps
      .map(
        (map, n) => reflection(map, n, debugData)
      )
      .reduce(
        (sum, n) => sum + n,
        0
      )
  }
)
