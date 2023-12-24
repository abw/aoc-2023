#!/usr/bin/env node
import { run } from '../lib/run.js'
import { parseInput, shakaWhenTheBlocksFell, whichBlocksWouldFall, wouldAnyBlocksFall } from './lib.js'

await run(
  { day: 22, part: 2, lines: true },
  ({ lines, debug, debugData }) => {
    const blocks = parseInput(lines)
    debugData('blocks:', blocks)
    debug('n blocks:', blocks.length)

    let movement = shakaWhenTheBlocksFell(blocks, debug)
    debug(`Darmok and Jalad at Tanagra.  When the ${movement} blocks fell`)

    let dependents = { }
    blocks.forEach(
      block => {
        let fallers = whichBlocksWouldFall(block, blocks)
        dependents[block.n] = fallers.map( block => block.n )
      }
    )
    debugData(`Sokath, his eyes uncovered:`, dependents)

    return 'TODO'
  }
)
