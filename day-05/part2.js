#!/usr/bin/env node
import { run } from '../lib/run.js'
import { buildMap, findLocation, parseSeeds } from './lib.js'

await run(
  { day: 5, part: 2, blocks: true },
  ({ blocks }) => {
    // debugData('blocks:', blocks)

    const seeds = parseSeeds(blocks.shift())
    // debugData('seeds:', seeds)

    const transition = buildMap(blocks)

    let min = Infinity
    while (seeds.length) {
      const rangeFrom = seeds.shift()
      const rangeLength = seeds.shift()
      console.log(`range from ${rangeFrom} + ${rangeLength}`)
      let n = rangeFrom
      let i = rangeLength
      while (i) {
        const location = findLocation(n, transition)
        if (location < min) {
          min = location
        }
        n++
        i--
      }
    }

    return min
  }
)
