#!/usr/bin/env node
import { run } from '../lib/run.js'
import { analyseLine, counter, parseInput } from './lib.js'

await run(
  { day: 12, part: 1, lines: true },
  ({ lines, debug, debugData }) => {
    const data = parseInput(lines)
    debugData('data:', data)

    // create a memoized function
    const count = counter(debug)

    return data
      .map(
        line => analyseLine(line, count, debug)
      )
      .reduce(
        (sum, n) => sum + n,
        0
      )
  }
)

