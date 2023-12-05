#!/usr/bin/env node
import { range } from '@abw/badger-utils'
import { run } from '../lib/run.js'

await run(
  { day: 3, part: 2, lines: true },
  ({ lines, debugData }) => {
    debugData('lines:', lines)

    const schematic = parseSchematic(lines)
    debugData('schematic:', schematic)

    const adjacent = matchGears(schematic)
    debugData('adjacent:', adjacent)

    const pairs = gearPairs(adjacent)
    debugData('gear pairs:', pairs)

    const ratios = gearRatios(pairs)
    debugData('gear ratios:', ratios)

    return ratios.reduce(
      (sum, ratio) => sum + ratio,
      0
    )
  }
)

export function parseSchematic(lines) {
  const parts = lines.map(parseLine)
  const numbers = parts.flatMap(
    part => part.numbers
  )
  let g = 0
  const gears = parts.reduce(
    (gears, part, y) => {
      part.gears.forEach(
        x => {
          gears[`${x},${y}`] = ++g
        }
      )
      return gears
    },
    { }
  )
  return { parts, numbers, gears }

}

function parseLine(line, y) {
  const numbers = [...line.matchAll(/(\d+)/g)].map(
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

  const gears = [...line.matchAll(/\*/g)].map(
    match => match.index
  )
  return { line, numbers, gears }
}

function matchGears({ numbers, gears }) {
  return numbers.filter(
    number => numberAdjacentToGear(number, gears)
  )
}

function numberAdjacentToGear(number, gears) {
  const { y, x1, x2 } = number
  for (let dy of range(y-1, y+1)) {
    for (let dx of range(x1-1, x2+1)) {
      const gear = gears[`${dx},${dy}`]
      if (gear) {
        number.gear = gear
        return true
      }
    }
  }
  return false
}

function gearPairs(adjacent) {
  return Object
    .values(
      adjacent
        .reduce(
          (gears, number) => {
            const gear = gears[number.gear] ||= [ ]
            gear.push(number)
            return gears
          },
          { }
        )
    )
    .filter(
      gear => gear.length == 2
    )
}

function gearRatios(pairs) {
  return pairs.map(
    pair => pair[0].number * pair[1].number
  )
}