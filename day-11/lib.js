import { hasValue, range, splitHash } from '@abw/badger-utils'

export function parseInput(lines) {
  return lines.map(
    line => line.split('')
  )
}

export function emptyColumns(rows) {
  return range(0, rows[0].length - 1)
    .map(
      x => rows.every( row => row[x] === '.' )
        ? x
        : null
    )
    .filter(hasValue)
}

export function emptyRows(rows) {
  return range(0, rows.length - 1)
    .map(
      y => rows[y].every( char => char === '.' )
        ? y
        : null
    )
    .filter(hasValue)
}

export function expandColumns(rows, empties) {
  const isEmpty = splitHash(empties)
  return rows.map(
    row => row.flatMap(
      (char, n) => isEmpty[n]
        ? [char, char]
        : [char]
    )
  )
}

export function expandRows(rows, empties) {
  const isEmpty = splitHash(empties)
  return rows.flatMap(
    (row, n) => isEmpty[n]
      ? [ row, row ]
      : [ row ]
  )
}

export function expandGalaxy(rows) {
  const er = emptyRows(rows)
  const ec = emptyColumns(rows)

  return expandRows(
    expandColumns(rows, ec),
    er
  )
}

export function findGalaxies(rows) {
  return rows
    .flatMap(
      (row, y) => row.map(
        (char, x) => ({ x, y, isGalaxy: row[x] === '#' })
      )
    )
    .filter(
      entry => entry.isGalaxy
    )
}
