#!/usr/bin/env node
import { fail } from '@abw/badger-utils'
import { run } from '../lib/run.js'
import { parseInput, moves } from './lib.js'


await run(
  { day: 10, part: 1, lines: true },
  ({ lines, debug }) => {
    // debugData('lines:', lines)
    const { map, x, y } = parseInput(lines)

    const width  = map[0].length
    const height = map.length
    debug(`${width} x ${height}`)
    // debugData(`map:`, map)

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
      // debugData('point:', point)
      point = { ...point.next }
      points.push(point)
      // debugData(`next: `, point)
    }
    while (makeMove(moves[point.dir]))

    // debugData('path:', points)

    // visual representation of path take, for debugging only
    const pathMap = map.map(
      row => [...row]
    )
    points.forEach(
      point => pathMap[point.y][point.x] = '*'
    )
    const pathStr = pathMap.map(
      row => row.join('')
    ).join('\n')
    debug(`path:\n${pathStr}`)
    debug(`path length: `, points.length)
    return points.length / 2
  }
)

