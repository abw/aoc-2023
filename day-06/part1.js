#!/usr/bin/env node
import { range } from '@abw/badger-utils'
import { run } from '../lib/run.js'

await run(
  { day: 6, part: 1, lines: true },
  ({ lines, debug, debugData }) => {
    const races = parseInput(lines)
    debugData('races:', races)

    return races.map(
      (race, n) => {
        const [time, distance] = race
        debug(`Race ${n} time: ${time}, distance: ${distance}`)
        return range(0, time)
          .map(
            charge => distanceTravelled(time, charge)
          )
          .filter(
            d => d > distance
          )
          .length
      }
    ).reduce(
      (product, n) => product * n,
      1
    )
  }
)

export function parseInput(lines) {
  const [times, distances] = lines.map(
    line => [ ...line.matchAll(/(\d+)/g) ]
      .map( n => parseInt(n) )
  )
  return times.map(
    (time, n) => [time, distances[n]]
  )
}

export function distanceTravelled(totalTime, chargeTime) {
  return chargeTime * (totalTime - chargeTime)
}