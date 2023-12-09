#!/usr/bin/env node
import { run } from '../lib/run.js'
import { diffs, parseInput, sum } from './lib.js'

await run(
  { day: 9, part: 1, lines: true },
  ({ lines, debugData }) => {
    debugData('lines:', lines)

    const data = parseInput(lines)
    debugData('data:', data)

    return data.reduce(
      (sum, history) => sum + analyseHistory(history, debugData),
      0
    )
  }
)

function analyseHistory(history, debugData) {
  const rows = [ history ]
  let row = history
  debugData(`history:`, row)

  while (sum(row) !== 0) {
    row = diffs(row)
    rows.push(row)
    debugData(`diffs:`, row)
  }

  return rows.reduce(
    (sum, row) => sum + row.at(-1),
    0
  )
}


