#!/usr/bin/env node
import { run } from '../../lib/run.js'
import { parseLines } from '../lib.js'

await run(
  { day: 4, part: 2, lines: true },
  ({ lines, debug, debugData }) => {
    debugData('lines:', lines)

    const cards = parseLines(lines)
    debugData('cards:', cards)

    let cardCount = cards.reduce(
      (count, card) => {
        count[card.index] = 1
        return count
      },
      { }
    )
    debugData('cardCount: ', cardCount)

    cards.forEach(
      card => {
        // debugData('card:', card)
        const { index, winners } = card
        const count = cardCount[index]
        const n = winners.length
        const copies = cards.slice(index, index + n)
        debug(`${count} copies of ${index} with ${n} winners`)
        copies.forEach(
          copy => cardCount[copy.index] += count
        )
      }
    )

    debugData('cardCount after processing:', cardCount)

    return Object.values(cardCount).reduce(
      (sum, n) => sum + n,
      0
    )
  }
)
