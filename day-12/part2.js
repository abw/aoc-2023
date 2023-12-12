#!/usr/bin/env node
import { run } from '../lib/run.js'
import { analyseLine, counter, parseInput } from './lib.js'

await run(
  { day: 12, part: 2, lines: true },
  ({ lines, debug, debugData }) => {
    const data = parseInput(lines)

    // expand each set of chars and runs x5
    data.forEach(
      line => {
        line.chars = [
          ...line.chars, '?',
          ...line.chars, '?',
          ...line.chars, '?',
          ...line.chars, '?',
          ...line.chars
        ]
        line.runs = [
          ...line.runs,
          ...line.runs,
          ...line.runs,
          ...line.runs,
          ...line.runs
        ]
      }
    )
    debugData('data:', data)

    // create a memoized function
    const count = counter(debug)

    return data
      .map(
        line => analyseLine(line, count, debug)
      )
      .reduce(
        (sum, n) => sum + n,
        0
      )
  }
)
