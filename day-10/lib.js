import { fail } from '@abw/badger-utils'

export function parseInput(lines) {
  let x, y
  const map = lines.map(
    (line, n) => {
      const chars = line.split('')
      if (line.match(/S/)) {
        y = n
        x = chars.indexOf('S')
      }
      return chars
    }
  )
  return { map, x, y }
}

// Each move in the direction n, s, e, w changes the x, y coordinates of the
// current point.  The character at that next position indicates the new
// direction for the next move.
export const moves = {
  n: point => ({
    x: point.x,
    y: point.y - 1,
    d: {
      '|': 'n',
      '7': 'w',
      'F': 'e',
    }
  }),
  e: point => ({
    x: point.x + 1,
    y: point.y,
    d: {
      '-': 'e',
      'J': 'n',
      '7': 's',
    }
  }),
  s: point => ({
    x: point.x,
    y: point.y + 1,
    d: {
      '|': 's',
      'L': 'e',
      'J': 'w',
    }
  }),
  w: point => ({
    x: point.x - 1,
    y: point.y,
    d: {
      '-': 'w',
      'L': 'n',
      'F': 's',
    }
  }),
}

export function walkPath({ map, x, y, debug }) {
  const width  = map[0].length
  const height = map.length
  debug(`${width} x ${height}`)

  let point  = { x, y }
  let points = [ point ]

  const makeMove = move => {
    const { x, y, d } = move(point)
    // debug(`move ${point.dir} to ${x},${y}`)
    if (x < 0 || x >= width || y < 0 || y >= height) {
      // out of bounds!
      return false
    }
    const char = map[y][x]
    const turn = d[char]
    if (! turn) {
      // not a legal move
      return false
    }
    point.char = char
    point.turn = turn
    point.next = { x, y, dir: turn }
    // debug(`change direction to ${turn}`)
    return true
  }

  // make the first move by looking in each direction until we find a
  // valid move
  const [dir] = Object.entries(moves).find(
    ([ , move]) => makeMove(move)
  ) || fail('cannot make first move')

  point.dir = dir

  // then follow the current direction until we're back at the start
  do {
    point = { ...point.next }
    points.push(point)
  }
  while (makeMove(moves[point.dir]))

  return { width, height, points }
}
