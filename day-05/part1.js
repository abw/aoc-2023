#!/usr/bin/env node
import { run } from '../lib/run.js'

await run(
  { day: 5, part: 1, lines: true },
  ({ lines, debugData }) => {
    debugData('lines:', lines)

    return 'TODO'
  }
)


