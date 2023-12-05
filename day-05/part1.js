#!/usr/bin/env node
import { run } from '../lib/run.js'
import { buildMap, findLocation, parseSeeds } from './lib.js'

await run(
  { day: 5, part: 1, blocks: true },
  ({ blocks, debugData }) => {
    // debugData('blocks:', blocks)

    const seeds = parseSeeds(blocks.shift())
    // debugData('seeds:', seeds)

    const transition = buildMap(blocks)

    const locations = seeds.map(
      s => findLocation(s, transition)
    )
    debugData('locations', locations)

    return locations.reduce(
      (lowest, n) => Math.min(lowest, n)
    )
  }
)
