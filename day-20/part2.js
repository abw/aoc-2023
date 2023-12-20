#!/usr/bin/env node
import { fail, hasValue } from '@abw/badger-utils'
import { run } from '../lib/run.js'
import { leastCommonMultiple } from '../lib/lcm.js'
import { parseInput, prepareModuleState } from './lib.js'
import process from 'node:process'

await run(
  { day: 20, part: 2, lines: true },
  ({ lines, debug, debugData }) => {
    debugData('lines:', lines)

    const data = parseInput(lines)
    debugData('data:', data)

    const { modules, state } = prepareModuleState(data)
    debugData(`modules:`, modules)

    // ql (in my input) is a conjunction module leading to rx so first we
    // need to find all the modules leading into sql
    const feedsRx = Object.keys(modules.rx.inputs)[0]
    const feedsQl = Object.keys(modules.ql.inputs)
    const cycles  = feedsQl.reduce(
      (cycles, name) => {
        cycles[name] = { first: null, next: null, detected: false }
        return cycles
      },
      { }
    )
    debug(`feedsRx: ${feedsRx}`)
    debugData(`feedsQl:`, feedsQl)
    debugData(`cycles:`, cycles)
    const detectCycles = feedsQl.length
    let detectedCycles = 0
    let n = 0

    const pushTheButton = () => {
      const signals = state.signals
      signals.push(['button', 'broadcaster', 0])

      while (signals.length && ! state.rxPushed) {
        const [from, to, signal] = signals.shift()
        const target = modules[to] || fail(`Invalid target: ${to}`)
        if (signal) {
          state.high++
        }
        else {
          state.low++
        }
        target.pulse(signal, from)

        // see if we want to detect cycles for this node
        const cycle = cycles[from]
        // if (cycle && ! cycle.detected && allInputsHigh(target)) {
        if (cycle && ! cycle.detected && signal) {
          if (hasValue(cycle.first)) {
            cycle.next = n
            cycle.detected = true
            detectedCycles++
          }
          else {
            cycle.first = n
          }
        }
      }
    }

    for (;;) {
      n++
      pushTheButton()
      if (state.rxPushed) {
        debug(`rx pushed`)
        break
      }
      if (detectedCycles === detectCycles) {
        debug(`detected ${detectCycles} cycles`)
        break
      }
      if (n % 1000 === 0) {
        process.stdout.write('.')
      }
    }

    debugData(`detected all cycles:`, cycles)
    const first = Object.values(cycles).reduce(
      (min, cycle) => Math.min(min, cycle.first),
      Infinity
    )
    const lengths = Object.values(cycles).map(
      cycle => cycle.next - cycle.first
    )
    debug(`first cycle starts: ${first}`)
    debugData(`cycle lengths:`, lengths)

    return lengths.reduce(
      (a, b) => leastCommonMultiple(a, b)
    )
  }
)

