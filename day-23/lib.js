import { fail } from '@abw/badger-utils'

export function parseInput(lines) {
  const grid = lines.map(
    line => line.split('')
  )
  const width  = grid[0].length
  const height = grid.length
  const startX = grid[0].indexOf('.')
  const endX   = grid.at(-1).indexOf('.')
  return { grid, width, height, startX, endX }
}

const goUp    = (x, y) => [x, y - 1]
const goDown  = (x, y) => [x, y + 1]
const goLeft  = (x, y) => [x - 1, y]
const goRight = (x, y) => [x + 1, y]

const validDirs = {
  '^': [goUp],
  'v': [goDown],
  '<': [goLeft],
  '>': [goRight],
  '.': [goUp, goDown, goLeft, goRight],
}

export function neighbours(x, y, grid) {
  const ch = grid[y][x]
  const dirs = validDirs[ch] || fail(`Invalid character at ${x}, ${y}: ${ch}`)
  return dirs
    .map(
      fn => fn(x, y)
    )
    .filter(
      ([x, y]) => x >= 0 && x < grid[0].length && y >= 0 && y < grid.length
    )
    .filter(
      ([x, y]) => grid[y][x] !== '#'
    )
    .map(
      ([x, y]) => `${x},${y}`
    )
}