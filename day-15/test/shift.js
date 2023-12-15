import { expect, test } from 'vitest'
import { shiftLensesForwards } from '../lib.js'

test(
  'shiftLensesForwards() 1',
  () => expect(
    shiftLensesForwards(
      ['a', null, 'b', null, null, 'c', null, 'd', null],
      2
    )
  )
    .toStrictEqual(
      ['a', 'b', 'c', 'd']
    )
)

test(
  'shiftLensesForwards() 2',
  () => expect(
    shiftLensesForwards(
      ['a', null, 'b', null, null, 'c', null, 'd', null, 'e'],
      3
    )
  )
    .toStrictEqual(
      ['a', null, 'b', 'c', 'd', 'e']
    )
)

test(
  'shiftLensesForwards() 3',
  () => expect(
    shiftLensesForwards(
      ['a', null, 'b'],
      2
    )
  )
    .toStrictEqual(
      ['a', 'b']
    )
)