import { deepCopy } from '../lib/copy.js'

export function parseInput(lines) {
  const rocks = { }
  const plots = { }
  const chars = lines.map(
    line => line.split('')
  )
  const width  = chars[0].length
  const height = chars.length
  let start

  chars.forEach(
    (row, y) => {
      row.forEach(
        (cell, x) => {
          const key = xyKey(x, y)
          if (cell === '#') {
            rocks[key] = true
          }
          else {
            plots[key] = true
            if (cell === 'S') {
              start = { key, x, y }
            }
          }
        }
      )
    }
  )
  return { chars, width, height, rocks, plots, start }
}

export function xyKey(x, y) {
  return `${x},${y}`
}

export function showMap(data, moves) {
  const chars = deepCopy(data.chars)
  moves.forEach(
    move => {
      const [x, y] = move.split(',').map( m => parseInt(m) )
      chars[y][x] = 'O'
    }
  )
  return chars.map( line => line.join('') ).join('\n')
}