#!/usr/bin/env node
import { run } from '../../lib/run.js'
import { parseGame } from '../lib.js'

const maxColors = {
  red:   12,
  green: 13,
  blue:  14
}

await run(
  { day: 2, part: 1, lines: true },
  ({ lines, debug, debugData }) => {
    debug('lines:', lines)

    const games = lines.map(parseGame)
    debugData('games:', games)

    const valid = games.filter(validGame)
    debugData('valid games:', valid)

    const answer = valid.reduce(
      (sum, game) => sum + game.id,
      0
    )
    return answer
  }
)

function validGame(game) {
  return game.draws.every(validDraw)
}

function validDraw(draw) {
  return Object.entries(draw).every(
    ([color, n]) => n <= maxColors[color]
  )
}
