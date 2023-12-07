#!/usr/bin/env node
import { run } from '../lib/run.js'
import { fail, range, splitHash } from '@abw/badger-utils'
import { cardCount, cardFrequency, rankHands, handTypes } from './lib.js'

const cardValues = {
  J: 1,
  ...splitHash(range(2,9), v => v),
  T: 10,
  Q: 12,
  K: 13,
  A: 14,
}

await run(
  { day: 7, part: 2, lines: true },
  ({ lines, debugData }) => {
    // debugData('lines:', lines)
    const hands = parseInput(lines, cardValues)

    hands.forEach(applyJokers)
    hands.forEach(
      hand => hand.ncards = cardCount(hand.frequency)
    )
    hands.forEach(
      hand => hand.type = handType(hand)
    )
    hands.forEach(
      hand => hand.ncards = cardCount(hand.frequency)
    )
    debugData('hands:', hands)

    const ranked = hands.sort(rankHands)
    ranked.forEach(
      (hand, n) => hand.rank = n + 1
    )
    debugData('ranked hands:', ranked)

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
  return {
    line, n, cards, values, frequency,
    bid: parseInt(bid)
  }
}

function applyJokers(hand) {
  const { frequency } = hand
  if (! frequency.J || frequency.J === 5) {
    return
  }
  // console.log(`applying jokers to hand: `, hand)
  while (frequency.J) {
    frequency.J--
    // find the card with the highest frequency and add it to that
    const highest = Object
      .entries(frequency)
      .filter( ([key]) => key !== 'J' )
      .reduce(
        (highest, entry) => entry[1] > highest[1]
          ? entry
          : highest,
        [null, 0]
      )
    if (highest[0]) {
      // console.log(`highest to add joker to: `, highest)
      frequency[highest[0]]++
    }
    else {
      break
    }
  }
  hand.withJokers = Object.entries(frequency)
    .filter(
      ([ , count]) => count
    )
    .map(
      ([card, count]) => card.repeat(count)

    )
    .join('')
  // console.log(`applied jokers to hand: `, hand)
}

export function handType(hand) {
  const { ncards } = hand
  for (let typeTest of handTypes) {
    const type = typeTest(ncards)
    if (type) {
      return type
    }
  }
  fail('Cannot determine hand type: ', ncards)
}
