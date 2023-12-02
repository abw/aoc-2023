#!/usr/bin/env node
import { fail } from '@abw/badger-utils'

export function parseGame(text) {
  const [game, results] = text.split(': ')
  const [,id] = game.match(/(\d+)/) || fail(`No game id: ${game}`)
  const draws = results.split(/;\s*/).map(parseDraw)
  return { id: parseInt(id), draws }
}

export function parseDraw(draw) {
  return draw
    .split(/,\s*/)
    .map(
      subset => subset.match(/(\d+)\s+(.*)/)
        || fail(`Can't parse draw subset: ${subset}`)
    )
    .reduce(
      (drawn, [, n, color]) => {
        drawn[color] = parseInt(n)
        return drawn
      },
      { }
    )
}

