#!/usr/bin/env node
import { doNothing, fail } from '@abw/badger-utils'
import { run } from '../lib/run.js'
import { leastCommonMultiple, parseInput } from './lib.js'

await run(
  { day: 8, part: 2, lines: true },
  ({ lines, debugData }) => {
    debugData('lines:', lines)

    const { instructions, nodes } = parseInput(lines)
    debugData('instructions:', instructions)
    debugData('nodes:', nodes)

    const map = nodes.reduce(
      (map, node) => {
        map[node.node] = node
        return map
      },
      { }
    )
    debugData('map:', map)

    const starts = Object
      .keys(map)
      .filter( name => name.match(/A$/) )
    debugData('starts: ', starts)

    const steps = starts
      .map(
        start => walkPath(instructions, map, start)
      )
    debugData('steps: ', steps)

    // Hmm... I was expecting the path from the end node to take a different
    // number of steps to reach the next Z node, but it seems they're all
    // the same as the initial number of steps
    /*
    const nextSteps = steps
      .map(
        start => walkPath(instructions, map, start.name)
      )
    debugData('nextSteps: ', nextSteps)
    */

    const lengths = steps.map(
      step => step.steps
    )
    debugData(`step lengths:`, lengths)

    return lengths.reduce(
      (a, b) => leastCommonMultiple(a, b)
    )
  }
)

export function walkPath(instructions, map, start='AAA', debug=doNothing) {
  let steps = 0
  let name  = start
  let node  = map[name]
    || fail(`Can't find start node ${name}`)

  while (! (name.match(/Z$/) && steps !== 0)) {
    debug(`step ${steps} at ${name}`)
    const move = instructions[steps++ % instructions.length]
    debug(`move: ${move}`)
    name = node[move] || fail(`Can't move ${move} from`, node)
    debug(`dest: ${name}`)
    node = map[name] || fail(`Can't find node ${name}`)
  }

  return { steps, name }
}
