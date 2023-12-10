#!/usr/bin/env node
import { run } from '../lib/run.js'
import { splitHash } from '@abw/badger-utils'
import { parseInput, walkPath, dirs } from './lib.js'

const cross = splitHash('| F 7 J L')

await run(
  { day: 10, part: 2, lines: true },
  ({ lines, debug, debugData }) => {
    debugData('lines:', lines)
    const { map, x, y } = parseInput(lines)
    const points = walkPath({ map, x, y, debug })

    debugData('points: ', points)

    // Replace the first 'S' character with the correct corner
    const first  = points[0]
    map[first.y][first.x] = dirs[first.dir]

    // Mark each point that we visited
    const path = map.map(
      row => [ ...row.map( () => '.' ) ]
    )
    points.forEach(
      point => path[point.y][point.x] = map[point.y][point.x]
    )

    const crossPath = path.map(
      row => row
        .join('')
        .replaceAll(/(F-*)J/g, '$1-') // get rid of those pesky dog legs
        .replaceAll(/(L-*)7/g, '$1-')
        .split('')
    )

    return crossPath
      .map(
        line => pointsInside(line)
      )
      .reduce(
        (sum, n) => sum + n,
        0
      )
  }
)


function pointsInside(line) {
  // point in polygon test - if we cross an odd number of edges then
  // we're inside the polygon
  let result = [ ]
  let crossing = 0
  let inside = 0
  for (let point of line) {
    if (point === '.') {
      inside += crossing % 2
      result.push(
        crossing % 2
          ? 'I'
          : 'O'
      )
    }
    else {
      if (cross[point]) {
        crossing++
      }
      result.push(point)
    }
  }
  return inside
}