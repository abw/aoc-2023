#!/usr/bin/env node
import { splitHash } from '@abw/badger-utils'
import { run } from '../lib/run.js'
import { R, D, parseInput, bestPath } from './lib.js'

await run(
  { day: 17, part: 1, lines: true },
  ({ lines, debug, debugData }) => {
    debugData('lines:', lines)

    const blocks = parseInput(lines)
    debugData('blocks:', blocks)

    const width    = blocks[0].length
    const height   = blocks.length
    const inbounds = (x, y) => x >= 0 && y >= 0 && x < width && y < height
    const city     = { blocks, width, height }
    const crucible = { x: 0, y: 0, loss: 0, ds: [ ] }

    // const winner   = bestPath(crucible, city)
    // const state    = { width, height, debug, debugData }

    // console.log(`winner: `, winner)


    return 'TODO'
  }
)
