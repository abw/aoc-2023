#!/usr/bin/env node
import { run } from '../lib/run.js'
// import { range } from '@abw/badger-utils'

await run(
  { day: 6, part: 2, lines: true },
  ({ lines, debug }) => {
    const [time, distance] = lines.map(
      line => [
        ...line
          .replaceAll(/\s+/g, '')
          .matchAll(/(\d+)/g)
      ]
        .map( n => parseInt(n) )
    )
    debug(`Time: ${time}, distance: ${distance}`)

    // brute force approach gives the answer in a few seconds...
    /*
    return range(0, time)
      .map(
        charge => charge * (time - charge)
      )
      .filter(
        d => d > distance
      )
      .length
    */

    // ...but we can do better
    //    distanceTravelled = chargeTime * (totalTime - chargeTime)
    // or shorter:
    //    d = c * (t - c)
    //    d = ct - c²
    //    -c² + tc - d = 0
    // Solve the quadratic equation to get the range of values
    //    x = (-d ± sqrt(b² - 4ac)) / 2a
    // Where a=-1, b=t, c=-d, b²=1, 4ac = 4 * -1 * -d = 4d, 2a = -2
    const a    = -1
    const b    = time
    const c    = -distance
    const b2   = b * b
    const ac4  = 4 * a * c
    const a2   = 2 * a
    const sqrt = Math.sqrt(b2 - ac4)
    const r1   = Math.ceil((-distance + sqrt) / -2)
    const r2   = Math.floor((-distance - sqrt) / -2)
    debug(`a:${a} b:${b} b²:${b2} c:${c} 4ac:${ac4} 2a:${a2} r1:${r1} r2${r2}`)
    return (r2 - r1) + 1
  }
)
