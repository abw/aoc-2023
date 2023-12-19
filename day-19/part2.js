#!/usr/bin/env node
import { run } from '../lib/run.js'
import { parseRule, parseStates } from './lib.js'
import { fail } from '@abw/badger-utils'

await run(
  { day: 19, part: 2, blocks: true },
  ({ blocks, debugData }) => {
    debugData('blocks:', blocks)

    const workflows = parseWorkflows(blocks[0])
    debugData('rules:', workflows)

    const states = parseStates(blocks[1])
    debugData('states:', states)

    const count = (ranges, name='in') => {
      if (name === 'R') {
        return 0
      }
      if (name === 'A') {
        return Object.values(ranges)
          .reduce(
            (product, [low, high]) => product * ((high - low) + 1),
            1
          )
      }
      const [deflt, ...rules] = workflows[name]
      let total = 0

      for (let rule of rules) {
        const { cat, cmp, value, then } = rule
        const [low, high] = ranges[cat]
        let inside, outside
        if (cmp === '<') {
          inside  = [low, Math.min(value - 1, high)]
          outside = [Math.max(value, low), high]
        }
        else {
          inside  = [Math.max(value +1, low), high]
          outside = [low, Math.min(value, high)]
        }

        if (inside[0] <= inside[1]) {
          const clone = cloneRanges(ranges)
          clone[cat] = inside
          total += count(clone, then)
        }
        if (outside[0] <= outside[1]) {
          ranges = cloneRanges(ranges)
          ranges[cat] = outside
        }
        else {
          return total
        }
      }
      total += count(ranges, deflt)

      return total
    }

    const ranges = {
      x: [1, 4000],
      m: [1, 4000],
      a: [1, 4000],
      s: [1, 4000],
    }

    return count(ranges)
  }
)

export function parseWorkflows(text) {
  return text
    .split(/\n/)
    .map(parseWorkflow)
    .reduce(
      (workflows, [name, rules]) => ({
        ...workflows,
        [name]: rules,
      }),
      { }
    )
}

export function parseWorkflow(text) {
  const [, name, workflow] = text.match(/(.*?)\{(.*?)\}/)
    || fail(`Cannot parse workflow: ${text}`)
  const parts = workflow.split(',')
  const deflt = parts.pop()
  const rules = [
    deflt,
    ...parts.map(parseRule),
  ]
  return [name, rules]
}

function cloneRanges(ranges) {
  return Object.entries(ranges)
    .reduce(
      (clone, [key, value]) => {
        clone[key] = [...value]
        return clone
      },
      { }
    )
}