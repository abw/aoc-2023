#!/usr/bin/env node
import { run } from '../lib/run.js'
import { determineSize, parseColors, parseInput, shiftPolygon, turtleCoordinates } from './lib.js'

await run(
  { day: 18, part: 2, lines: true },
  ({ lines, debugData }) => {
    debugData('lines:', lines)
    const data = parseInput(lines)
    debugData('data:', data)

    const dirs = parseColors(data)
    debugData('dirs:', dirs)

    const polygon = turtleCoordinates(dirs)
    debugData('polygon:', polygon)

    const size = determineSize(polygon)
    debugData('size:', size)

    const shifted = shiftPolygon(polygon, size)
    debugData('shifted polygon:', shifted)
    debugData('shifted size:', size)

    let sum = 0
    for (let p = 0; p < shifted.length - 2; p++) {
    // for (let p = shifted.length - 2; p >= 1; p--) {
      const p1 = shifted[p]
      const p2 = shifted[p + 1]
      sum += (p1.y + p2.y) * (p1.x - p2.x)
      debugData('pair: ', { p1, p2 })
    }
    sum /= 2

    // last point doesn't have a distance
    const prevp = shifted.at(-2)
    const lastp = shifted.at(-1)
    lastp.dist = Math.abs(prevp.x - lastp.x, prevp.y - lastp.y)

    const perimeter = shifted.reduce(
      (sum, p) => sum + p.dist,
      0
    )

    // halve the perimeter and add on the final point
    sum += perimeter / 2 + 1

    return sum
  }
)
