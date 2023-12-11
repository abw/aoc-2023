#!/usr/bin/env node
import { run } from '../lib/run.js'
import { range, splitHash } from '@abw/badger-utils'
import { emptyColumns, emptyRows, findGalaxies, parseInput } from './lib.js'

await run(
  { day: 11, part: 2, lines: true },
  ({ lines, debugData }) => {
    const rows = parseInput(lines)
    debugData('rows:', rows)

    const galaxies = findGalaxies(rows)
    debugData('galaxies:', galaxies)

    const er = emptyRows(rows)
    const ec = emptyColumns(rows)
    debugData('empty rows:', er)
    debugData('empty cols:', ec)
    const isEmptyRow = splitHash(er)
    const isEmptyCol = splitHash(ec)

    const factor = 1_000_000

    const distances = galaxies.flatMap(
      (g1, n) => galaxies.slice(n).map(
        g2 =>
          colDistance(g1.x, g2.x, isEmptyCol, factor) +
          rowDistance(g1.y, g2.y, isEmptyRow, factor)
      )
    )

    return distances.reduce(
      (sum, d) => sum + d,
      0
    )
  }
)

function rowDistance(y1, y2, isEmptyRow, factor) {
  const empty = range(y1, y2)
    .filter(
      y => isEmptyRow[y]
    )
    .length
  return Math.abs(y1 - y2) - empty + (empty * factor)
}

function colDistance(x1, x2, isEmptyCol, factor) {
  const empty = range(x1, x2)
    .filter(
      x => isEmptyCol[x]
    )
    .length
  return Math.abs(x1 - x2) - empty + (empty * factor)
}