#!/usr/bin/env node
import { run } from '../lib/run.js'
import { mapText, parseInput, rollMapNorth } from './lib.js'

await run(
  { day: 14, part: 1, lines: true },
  ({ lines, debug, debugData }) => {
    debugData('lines:', lines)

    const map = parseInput(lines)
    const { rolled, rocks } = rollMapNorth(map)

    // console.log(mapText(rolled))
    debug(`map:\n` + mapText(map))
    debug(`rolled:\n` + mapText(rolled))
    debugData('rocks:', rocks)

    const height = map.length
    return rocks.reduce(
      (sum, [y]) => sum + height - y,
      0
    )
  }
)
