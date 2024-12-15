#!/usr/bin/env node
import { run } from '../lib/run.js'
import { neighbours, parseInput } from './lib.js'

await run(
  { day: 23, part: 1, lines: true },
  ({ lines, debugData }) => {
    // debugData('lines:', lines)
    const data = parseInput(lines)
    debugData('data:', data)

    const { grid, startX } = data

    const points = { }
    grid.forEach(
      (row, y) => row.forEach(
        (cell, x) => {
          if (grid[y][x] !== '#') {
            points[`${x},${y}`] = neighbours(x, y, grid)
          }
        }
      )
    )
    debugData('points:', points)

    const queue = [`${startX},0`]
    const paths = [ ]

    while (queue.length) {
      const start = queue.shift()
      const seen  = { }

      let point = start
      let d = 0
      for (;;) {
        const outs  = points[point].filter( p => ! seen[p] )
        seen[point] = true
        console.log(`at ${point}, outs:`, outs)
        if (outs.length === 1) {
          point = outs[0]
          d++
        }
        else {
          paths.push({ start, point, d })

          break
        }
      }
    }
    debugData('paths:', paths)

    return 'TODO'
  }
)
