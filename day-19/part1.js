#!/usr/bin/env node
import { run } from '../lib/run.js'
import { acceptState, parseStates, parseWorkflows } from './lib.js'

await run(
  { day: 19, part: 1, blocks: true },
  ({ blocks, debugData }) => {
    debugData('blocks:', blocks)
    const workflows = parseWorkflows(blocks[0])
    debugData('rules:', workflows)

    const states = parseStates(blocks[1])
    debugData('states:', states)

    const accepted = states
      .filter(
        state => acceptState(workflows, state, debugData)
      )
    debugData(`accepted: `, accepted)

    return accepted.reduce(
      (sum, state) => sum + Object
        .values(state)
        .reduce( (sum, r) => sum + r, 0 ),
      0
    )
  }
)
