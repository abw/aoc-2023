import { fail } from '@abw/badger-utils'

export function parseInput(lines) {
  const instructions = lines.shift().split('')
  lines.shift()
  const nodes = lines.map(
    line => {
      const [, node, L, R] = line.match(/^(\w+) = \((\w+), (\w+)\)/)
        || fail(`Cannot parse line: ${line}`)
      return { node, L, R }
    }
  )
  return { instructions, nodes }
}

// https://stackoverflow.com/questions/31302054/how-to-find-the-least-common-multiple-of-a-range-of-numbers
export const leastCommonMultiple = (a, b) =>
  (a * b) / greatestCommonDivisor(a, b)

export const greatestCommonDivisor = (a, b) => {
  const remainder = a % b
  if (remainder === 0) return b
  return greatestCommonDivisor(b, remainder)
}
