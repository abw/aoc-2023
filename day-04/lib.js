import { splitHash, splitList } from '@abw/badger-utils'

export function parseLines(lines) {
  return lines.map(parseLine)
}

function parseLine(line) {
  const [card, w, n] = line.split(/\s*[:|]\s*/)
  const winning = splitHash(w)
  const numbers = splitList(n)
  const winners = numbers.filter( n => winning[n] )
  const score   = winners.reduce(
    sum => sum ? sum * 2 : 1,
    0
  )
  const [, cardno] = card.match(/(\d+)/)
  const index = parseInt(cardno)
  return { card, index, winning, numbers, winners, score }
}