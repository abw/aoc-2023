#!/usr/bin/env node
import { run } from '../lib/run.js'
import { fail, range, splitHash } from '@abw/badger-utils'

const cardValues = {
  ...splitHash(range(2,9), v => v),
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
}

export const handTypes = [
  ncards => ncards[5] && {
    cards: ncards[5],
    value: 7,
    name: 'Five of a kind',
  },
  ncards => ncards[4] && {
    cards: ncards[4],
    value: 6,
    name: 'Four of a kind'
  },
  ncards => ncards[3] && ncards[2] && {
    cards: [ncards[3][0], ncards[2][0]],
    value: 5,
    name:  'Full house'
  },
  ncards => ncards[3] && {
    cards: ncards[3],
    value: 4,
    name:  'Three of a kind'
  },
  ncards => ncards[2]?.length == 2 && {
    cards: ncards[2],
    value: 3,
    name:  'Two pairs'
  },
  ncards => ncards[2] && {
    cards: ncards[2],
    value: 2,
    name:  'One pair'
  },
  ncards => ({
    cards: ncards[1],
    value: 1,
    name:  'High card'
  }),
]

await run(
  { day: 7, part: 1, lines: true },
  ({ lines, debugData }) => {
    debugData('lines:', lines)
    debugData('last line: ', lines.at(-1))
    const hands = parseInput(lines, cardValues)
    debugData('hands:', hands)
    const ranked = hands.sort(rankHands)
    ranked.forEach(
      (hand, n) => hand.rank = n + 1
    )
    debugData('ranked:', ranked)
    return ranked.reduce(
      (sum, hand) => sum + hand.rank * hand.bid,
      0
    )
  }
)

export function parseInput(lines, cardValues) {
  return lines.map(
    (line, n) => parseLine(line, n, cardValues)
  )
}

export function parseLine(line, n, cardValues) {
  const [cardStr, bid] = line.split(/\s+/)
  const cards     = cardStr.split('')
  const values    = cards.map( c => cardValues[c] )
  const frequency = cardFrequency(cards)
  const type      = handType(frequency)
  return {
    line, n, cards, values, frequency, ...type,
    bid: parseInt(bid)
  }
}

export function cardFrequency(cards) {
  return cards.reduce(
    (freq, card) => {
      freq[card] ||= 0
      freq[card]++
      return freq
    },
    { }
  )
}

export function cardCount(frequency) {
  return Object.entries(frequency).reduce(
    (counts, [card, count]) => {
      const list = counts[count] ||= [ ]
      list.push(card)
      return counts
    },
    { }
  )
}

export function handType(frequency) {
  const ncards = cardCount(frequency)
  for (let typeTest of handTypes) {
    const type = typeTest(ncards)
    if (type) {
      return { ncards, type }
    }
  }
  fail('Cannot determine hand type: ', ncards)
}

export function rankHands(a, b) {
  return (a.type.value - b.type.value) || rankValues(a, b)
}

export function rankValues(a, b) {
  return a.values[0] - b.values[0]
    ||   a.values[1] - b.values[1]
    ||   a.values[2] - b.values[2]
    ||   a.values[3] - b.values[3]
    ||   a.values[4] - b.values[4]
}