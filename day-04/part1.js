#!/usr/bin/env node
import { run } from '../lib/run.js'
import { parseLines } from './lib.js'

await run(
  { day: 4, part: 1, lines: true },
  ({ lines, debugData }) => {
    debugData('lines:', lines)

    const cards = parseLines(lines)
    debugData('cards:', cards)

    return cards.reduce(
      (sum, card) => sum + card.score,
      0
    )
  }
)


