#!/usr/bin/env node
import { run, deepCopy } from '../lib/index.js'
import { L, R, U, D, energizedBeamLayout, parseInput } from './lib.js'

await run(
  { day: 16, part: 2, lines: true },
  ({ lines, debug, debugData }) => {
    const layout = parseInput(lines)
    debugData('layout:', layout)

    const width   = layout[0].length
    const height  = layout.length
    const results = [ ]

    for (let y = 0; y < height; y++) {
      // left edge moving right
      let beam = { y, x: 0, d: R }
      beam.energy = energizedBeamLayout(
        { ...beam },
        deepCopy(layout),
        debug, debugData
      )
      results.push(beam)

      // right edge moving right
      beam = { y, x: width - 1, d: L }
      beam.energy = energizedBeamLayout(
        { ...beam },
        deepCopy(layout),
        debug, debugData
      )
      results.push(beam)
    }

    for (let x = 0; x < width; x++) {
      // top edge moving down
      let beam = { x, y: 0, d: D }
      beam.energy = energizedBeamLayout(
        { ...beam },
        deepCopy(layout),
        debug, debugData
      )
      results.push(beam)

      // bottom edge moving up
      beam = { x, y: height - 1, d: U }
      beam.energy = energizedBeamLayout(
        { ...beam },
        deepCopy(layout),
        debug, debugData
      )
    }

    debugData(`results: `, results)

    const max = results
      .reduce(
        (max, result) => result.energy > max.energy
          ? result
          : max
      )

    debugData(`best result: `, max)

    return max.energy
  }
)

