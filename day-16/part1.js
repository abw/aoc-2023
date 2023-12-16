#!/usr/bin/env node
import { run } from '../lib/run.js'
import { R, energizedBeamLayout, parseInput } from './lib.js'

await run(
  { day: 16, part: 1, lines: true },
  ({ lines, debug, debugData }) => {
    // debugData('lines:', lines)

    const layout = parseInput(lines)
    debugData('layout:', layout)

    return energizedBeamLayout(
      { x: 0, y: 0, d: R },
      layout, debug, debugData
    )
  }
)

