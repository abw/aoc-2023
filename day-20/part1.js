#!/usr/bin/env node
import { fail } from '@abw/badger-utils'
import { run } from '../lib/run.js'
import { parseInput, prepareModuleState } from './lib.js'

await run(
  { day: 20, part: 1, lines: true },
  ({ lines, debugData }) => {
    debugData('lines:', lines)

    const data = parseInput(lines)
    debugData('data:', data)

    const { modules, state } = prepareModuleState(data)
    debugData(`modules:`, modules)

    const pushTheButton = () => {
      const signals = state.signals
      signals.push(['button', 'broadcaster', 0])
      while (signals.length) {
        const [from, to, signal] = signals.shift()
        const target = modules[to] || fail(`Invalid target: ${to}`)
        if (signal) {
          state.high++
        }
        else {
          state.low++
        }
        target.pulse(signal, from)
      }
    }

    for (let n = 0; n < 1000; n++) {
      pushTheButton()
    }
    debugData(`state after 1000 pushes: `, state)

    return state.high * state.low
  }
)
