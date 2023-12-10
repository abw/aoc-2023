#!/usr/bin/env node
import { run } from '../lib/run.js'
import { parseInput, walkPath } from './lib.js'


await run(
  { day: 10, part: 1, lines: true },
  ({ lines, debug }) => {
    // debugData('lines:', lines)
    const { map, x, y } = parseInput(lines)
    const points = walkPath({ map, x, y, debug })

    // visual representation of path taken, for debugging only
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

