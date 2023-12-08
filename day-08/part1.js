#!/usr/bin/env node
import { fail } from '@abw/badger-utils'
import { run } from '../lib/run.js'
import { parseInput } from './lib.js'

await run(
  { day: 8, part: 1, lines: true },
  ({ lines, debug, debugData }) => {
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

    return walkPath(instructions, map, 'AAA', debug)
  }
)

export function walkPath(instructions, map, start='AAA', debug) {
  let steps = 0
  let name  = start
  let node  = map[name]
    || fail(`Can't find start node ${name}`)

  while (name !== 'ZZZ') {
    debug(`step ${steps} at ${name}`)
    const move = instructions[steps++ % instructions.length]
    debug(`move: ${move}`)
    name = node[move] || fail(`Can't move ${move} from`, node)
    debug(`dest: ${move}`)
    node = map[name] || fail(`Can't find node ${name}`)
  }

  return steps
}
