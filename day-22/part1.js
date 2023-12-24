#!/usr/bin/env node
import { run } from '../lib/run.js'
import { parseInput, shakaWhenTheBlocksFell, wouldAnyBlocksFall } from './lib.js'

await run(
  { day: 22, part: 1, lines: true },
  ({ lines, debug, debugData }) => {
    // debugData('lines:', lines)

    const blocks = parseInput(lines)
    debugData('blocks:', blocks)
    debug('n blocks:', blocks.length)

    let movement = shakaWhenTheBlocksFell(blocks, debug)
    debug(`${movement} blocks fell`)

    let safe = 0
    blocks.forEach(
      block => {
        const fall = wouldAnyBlocksFall(block, blocks)
        if (fall) {
          debug(`block ${block.n} would fall`)
        }
        else {
          safe++
        }
      }
    )

    return safe
  }
)
