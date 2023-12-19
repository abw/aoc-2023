import { expect, test } from 'vitest'
import { parseWorkflow, runWorkflow } from '../lib.js'

const [ , rules] = parseWorkflow('a{x<10:foo,m>20:A,a<30:R,bar}')

test(
  'workflow match x',
  () => expect(
    runWorkflow(rules, { x: 9} ),
  ).toBe('foo')
)

test(
  'workflow match m',
  () => expect(
    runWorkflow(rules, { x: 11, m: 21 } ),
  ).toBe('A')
)

test(
  'workflow match a',
  () => expect(
    runWorkflow(rules, { x: 11, m: 20, a: 29 } ),
  ).toBe('R')
)

test(
  'workflow match default',
  () => expect(
    runWorkflow(rules, { x: 11, m: 20, a: 31 } ),
  ).toBe('bar')
)
