#!/usr/bin/env node
import { run } from '../lib/run.js'
import { diffs, parseInput, sum } from './lib.js'

await run(
  { day: 9, part: 2, lines: true },
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

  return rows.reverse().reduce(
    (sum, row) => row.at(0) - sum,
    0
  )
}


