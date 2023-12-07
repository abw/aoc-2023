#!/usr/bin/env node
import { fail } from '@abw/badger-utils'

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