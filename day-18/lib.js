import { fail } from '@abw/badger-utils'

export const movement = {
  U: { x:  0, y: -1 },
  D: { x:  0, y:  1 },
  L: { x: -1, y:  0 },
  R: { x:  1, y:  0 },
}

export function parseInput(lines) {
  return lines.map(
    line => {
      const [, dir, dist, color] = line.match(/^(\w+)\s+(\d+)\s*\((#\w+)\)/)
        || fail(`cannot parse line: ${line}`)
      return { dir, dist: parseInt(dist), color }
    }
  )
}

export function turtleCoordinates(instrs) {
  let point = { x: 0, y: 0 }
  const points = [ point ]

  instrs.forEach(
    instr => {
      const { dir, dist } = instr
      point.dir   = dir
      point.dist  = dist
      const move = movement[dir]
        || fail(`invalid movement: ${move}`)
      const x = point.x + dist * move.x
      const y = point.y + dist * move.y
      point = { x, y }
      points.push(point)
    }
  )
  return points
}

export function determineSize(polygon) {
  const minx = polygon.reduce(
    (minx, point) => Math.min(minx, point.x),
    Infinity
  )
  const miny = polygon.reduce(
    (miny, point) => Math.min(miny, point.y),
    Infinity
  )
  const maxx = polygon.reduce(
    (maxx, point) => Math.max(maxx, point.x),
    0
  )
  const maxy = polygon.reduce(
    (maxy, point) => Math.max(maxy, point.y),
    0
  )
  return {
    miny, minx,
    maxx, maxy,
    width: (maxx - minx) + 1,
    height: (maxy - miny) + 1
  }
}

export function shiftPolygon(polygon, size) {
  const { minx, miny } = size
  const shiftx = size.shiftx = minx < 0 ? Math.abs(minx) : 0
  const shifty = size.shifty = miny < 0 ? Math.abs(miny) : 0
  return polygon.map(
    point => ({
      ...point,
      x: point.x + shiftx,
      y: point.y + shifty
    })
  )
}

export function emptyGrid({ width, height }) {
  let grid = new Array(height)
  for (let y = 0; y < height; y++) {
    grid[y] = new Array(width).fill(0)
  }
  return grid
}

export function outlineGrid(polygon, grid) {
  const p1 = polygon[0]
  let { x, y } = p1

  for (let n = 0; n < polygon.length - 1; n++) {
    const { dir, dist } = polygon[n]
    const move = movement[dir]
        || fail(`invalid movement: ${move}`)
    for (let d = 0; d < dist; d++) {
      grid[y][x] = 1
      x += move.x
      y += move.y
    }
  }
}

export function connectLines(polygon) {
  const lines = [ ]
  for (let p = 0; p < polygon.length - 1; p++) {
    const p1 = polygon[p]
    const p2 = polygon[p + 1]
    lines.push({
      x1: p1.x, y1: p1.y,
      x2: p2.x, y2: p2.y,
      dir: p1.x === p2.x ? 'v' : 'h',
      miny: Math.min(p1.y, p2.y),
      maxy: Math.max(p1.y, p2.y)
    })
  }
  return lines
}

export function fillGrid(polygon, grid, size) {
  for (let y = 0; y < size.height; y++) {
    for (let x = 0; x < size.width; x++) {
      if (grid[y][x] !== 0) {
        continue
      }
      const n = crossedLines(polygon, x, y)
      if (n % 2) {
        grid[y][x] = 2
      }
    }
  }
}


export function crossedLines(polygon, x, y) {
  return polygon.filter(
    line => line.dir === 'v' && line.x1 < x && line.miny <= y && line.maxy > y
  ).length
}

const cells = {
  0: '.',
  1: '#',
  2: '+'
}

export function showGrid(grid) {
  return grid.map(
    line => line
      .map( cell => cells[cell] ) .join('')
  ).join(`\n`)
}

export function countFilled(grid) {
  return grid.reduce(
    (sum, line) => sum + line.filter(
      cell => cell > 0
    ).length,
    0
  )
}

export function parseColors(data) {
  return data.map(
    item => parseColor(item.color)
  )
}

export function parseColor(color) {
  const dirs = ['R', 'D', 'L', 'U']
  const [, hexDist, dirCode] = color.match(/^#(.{5})(.)/)
    || fail(`Can't parse color: ${color}`)
  const dir = dirs[parseInt(dirCode)]
    || fail(`Invalid direction: ${dirCode}`)
  const dist = parseInt(hexDist, 16)
  return { dir, dist }
}