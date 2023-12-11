#!/usr/bin/env node
import { run } from '../lib/run.js'
import { expandGalaxy, findGalaxies, parseInput } from './lib.js'

await run(
  { day: 11, part: 1, lines: true },
  ({ lines, debug, debugData }) => {
    debugData('lines:', lines)
    const rows = parseInput(lines)
    debugData('rows:', rows)

    const expanded = expandGalaxy(rows)
    debugData(`expanded:`, expanded)

    const newMap = expanded
      .map( row => row.join('') )
      .join('\n')

    debug(`expanded map:\n${newMap}`)

    const galaxies = findGalaxies(expanded)
    debugData('galaxies:', galaxies)

    const distances = galaxies.flatMap(
      (g1, n) => galaxies.slice(n).map(
        g2 => Math.abs(g1.x - g2.x) + Math.abs(g1.y - g2.y)
      )
    )
    debugData('distances:', distances)
    return distances.reduce(
      (sum, d) => sum + d,
      0
    )
  }
)

