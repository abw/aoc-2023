#!/usr/bin/env node
import { run } from '../lib/run.js'
import { mapText, parseInput, spinCycle } from './lib.js'

await run(
  { day: 14, part: 2, lines: true },
  ({ lines, debug, debugData }) => {
    debugData('lines:', lines)

    const map = parseInput(lines)
    debug(`map:\n` + mapText(map))

    // detect a cycle
    const memo = { }
    const cycles = 1_000_000_000
    let result = map
    let cycle

    for (let n2 = 0; n2 < cycles; n2++) {
      const key = JSON.stringify(result)
      const n1  = memo[key]
      if (n1) {
        cycle = { n1, n2 }
        break
      }
      memo[key] = n2
      result = spinCycle(result)
    }

    debug(`detected cycle:`, cycle)
    const length = cycle.n2 - cycle.n1
    const remain = (cycles - cycle.n1) % length
    debug(`length: ${length}, remainder: ${remain}`)
    const total  = cycle.n1 + remain
    debug(`spin for: ${total}`)

    let spun = map
    for (let s = 0; s < total; s++) {
      spun = spinCycle(spun)
    }
    debug(`spun:\n` + mapText(result))

    const rocks = findRocks(spun)
    debugData('rocks:', rocks)

    const height = map.length
    return rocks.reduce(
      (sum, [y]) => sum + height - y,
      0
    )
  }
)

function findRocks(map) {
  const rocks  = [ ]

  map.forEach(
    (line, y) => {
      line.forEach(
        (cell, x) => {
          if (cell === 'O') {
            rocks.push([y, x])
          }
        }
      )
    }
  )
  return rocks
}
