#!/usr/bin/env node
import { run } from '../lib/run.js'

await run(
  { day: 1, part: 1, lines: true },
  ({ lines }) => {
    return lines
      .map(
        line => line                        // process each line
          .replaceAll(/\D/g, '')            // remove non-digits
          .split('')                        // split into array
          .map( digit => parseInt(digit) )  // convert to integers
      )
      .map(
        nums =>                             // sum digits on each line
          nums[0] * 10 +                    // first digit is tens
          nums.at(-1)                       // last digit is units
      )
      .reduce(                              // sum numbers on all lines
        (sum, n) => sum + n,
        0
      )
  }
)
