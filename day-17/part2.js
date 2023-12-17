#!/usr/bin/env node
import { run } from '../lib/run.js'
import { parseInput } from './lib.js'

await run(
  { day: 17, part: 2, lines: true },
  ({ lines, debugData }) => {
    debugData('lines:', lines)
    const data = parseInput(lines)
    debugData('data:', data)
    return 'TODO'
  }
)
