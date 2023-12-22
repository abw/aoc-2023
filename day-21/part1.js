#!/usr/bin/env node
import { run } from '../lib/run.js'
import { parseInput, showMap, xyKey } from './lib.js'

await run(
  { day: 21, part: 1, lines: true },
  ({ lines, debug, debugData }) => {
    debugData('lines:', lines)
    const data = parseInput(lines)
    debugData('data:', data)

    const { width, height, start, plots } = data

    // pre-calculate all the plots that can be reach from a plot
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const key = xyKey(x, y)
        if (plots[key]) {
          const around = [ ]
          if (y > 0) {
            around.push(xyKey(x, y - 1))
          }
          if (y < height - 1) {
            around.push(xyKey(x, y + 1))
          }
          if (x > 0) {
            around.push(xyKey(x - 1, y))
          }
          if (x < width - 1) {
            around.push(xyKey(x + 1, y))
          }
          plots[key] = around.filter(
            move => plots[move]
          )
        }
      }
    }

    debugData('plots:', plots)

    const makeMove = from => {
      const moves = from.reduce(
        (moves, move) => {
          plots[move].forEach(
            to => moves[to] = true
          )
          return moves
        },
        { }
      )
      return Object.keys(moves)
    }

    let moves = [start.key]
    for (let i = 0; i < 64; i++) {
      debugData(`move from`, moves)
      moves = makeMove(moves)
      debugData(`move to`, moves)
      debug(`map after ${i + 1}\n` + showMap(data, moves))
    }

    return moves.length
  }
)
