import { expect, test } from 'vitest'
import { parseRuleComparator } from '../lib.js'

const rule1 = parseRuleComparator('x<10:foo')
const rule2 = parseRuleComparator('m>10:bar')

test(
  'x<10:foo with 9',
  () => expect(
    rule1({ x: 9 }),
  ).toBe('foo')
)

test(
  'x<10:foo with 10',
  () => expect(
    rule1({ x: 10 }),
  ).toBe(null)
)

test(
  'x<10:foo with 11',
  () => expect(
    rule1({ x: 11 }),
  ).toBe(null)
)

test(
  'm>10:bar with 9',
  () => expect(
    rule2({ m: 9 }),
  ).toBe(null)
)

test(
  'm>10:bar with 10',
  () => expect(
    rule2({ m: 10 }),
  ).toBe(null)
)

test(
  'm>10:bar with 11',
  () => expect(
    rule2({ m: 11 }),
  ).toBe('bar')
)