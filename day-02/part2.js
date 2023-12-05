#!/usr/bin/env node
import { run } from '../lib/run.js'
import { parseGame } from './lib.js'

await run(
  { day: 2, part: 2, lines: true },
  ({ lines, debug, debugData }) => {
    debug('lines:', lines)

    const games = lines.map(parseGame).map(computePower)
    debugData('games:', games)

    return games.reduce(
      (sum, { power }) => sum + power,
      0
    )
  }
)

function computePower(game) {
  game.minimum = game.draws.reduce(
    (minimum, draw) => {
      Object.entries(draw).forEach(
        ([color, drawn]) => {
          minimum[color] = Math.max(minimum[color] || 0, drawn)
        }
      )
      return minimum
    },
    { }
  )
  game.power = Object.values(game.minimum).reduce(
    (power, n) => power * n,
    1
  )
  return game
}
