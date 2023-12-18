#!/usr/bin/env node
import { run } from '../lib/run.js'
import { connectLines, countFilled, determineSize, emptyGrid, fillGrid, outlineGrid, parseInput, shiftPolygon, showGrid, turtleCoordinates } from './lib.js'

await run(
  { day: 18, part: 1, lines: true },
  ({ lines, debug, debugData }) => {
    debugData('lines:', lines)
    const data = parseInput(lines)
    debugData('data:', data)

    const polygon = turtleCoordinates(data)
    debugData('polygon:', polygon)

    const size = determineSize(polygon)
    debugData('size:', size)

    const grid = emptyGrid(size)
    debug(`grid:\n` + showGrid(grid))

    const shifted = shiftPolygon(polygon, size)
    debugData('shifted polygon:', shifted)
    debugData('shifted size:', size)

    outlineGrid(shifted, grid)
    debug(`grid:\n` + showGrid(grid))

    const polyline = connectLines(shifted)
    debugData('polyline:', shifted)

    fillGrid(polyline, grid, size)
    debug(`grid:\n` + showGrid(grid))

    return countFilled(grid)
  }
)
