#!/usr/bin/env node
import { range } from '@abw/badger-utils'
import { run } from '../../lib/run.js'

await run(
  { day: 3, part: 1, lines: true },
  ({ lines, debugData }) => {
    debugData('lines:', lines)

    const schematic = parseSchematic(lines)
    debugData('schematic:', schematic)

    const adjacent = findPartNumbers(schematic)
    debugData('adjacent:', adjacent)

    const answer = adjacent.reduce(
      (sum, part) => sum + part.number,
      0
    )

    return answer
  }
)

export function parseSchematic(lines) {
  const parts = lines.map(parseLine)
  const numbers = parts.flatMap(
    part => part.numbers
  )
  const symbols = parts.reduce(
    (symbols, part, y) => {
      part.symbols.forEach(
        x => {
          symbols[`${x},${y}`] = true
        }
      )
      return symbols
    },
    { }
  )
  return { parts, numbers, symbols }

}

function parseLine(line, y) {
  const map = line
    .replaceAll(/\./g, ' ')
    .replaceAll(/[^\d\s]/g, 'X')

  const numbers = [...map.matchAll(/(\d+)/g)].map(
    match => {
      const numstr = match[1]
      const number = parseInt(match[1])
      const x1 = match.index
      const x2 = match.index + numstr.length - 1
      return {
        number, x1, x2, y
      }
    }
  )

  const symbols = [...map.matchAll(/X/g)].map(
    match => match.index
  )
  return { line, map, numbers, symbols }
}

function findPartNumbers({ numbers, symbols }) {
  return numbers.filter(
    number => numberAdjacentToSymbol(number, symbols)
  )
}

function numberAdjacentToSymbol(number, symbols) {
  const { y, x1, x2 } = number
  for (let dy of range(y-1, y+1)) {
    for (let dx of range(x1-1, x2+1)) {
      if (symbols[`${dx},${dy}`]) {
        // console.log(`found symbol at ${dx},${dy}`);
        return true
      }
    }
  }
  return false
}
