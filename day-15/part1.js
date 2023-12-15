#!/usr/bin/env node
import { run } from '../lib/run.js'
import { hash, parseInput } from './lib.js'

await run(
  { day: 15, part: 1, lines: true },
  ({ lines, debugData }) => {
    debugData('lines:', lines)

    const codes = parseInput(lines)
    debugData('codes:', codes)

    return codes
      .map(hash)
      .reduce(
        (sum, n) => sum + n,
        0
      )
  }
)
