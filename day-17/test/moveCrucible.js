import { expect, test } from 'vitest'
import { L, R, U, D, moveCrucible } from '../lib.js'

// move looks like this:
//   { x: 1, y: 0, d: R },
// crucible looks like this:
//   { x: 0, y: 0, ds: [ ], loss: 0 },
// should return:
//   { x: 1, y: 0, ds: [R], loss: n },
const city = {
  width: 3,
  height: 3,
  blocks: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]
}

test(
  'moveCrucible() left at 1,1',
  () => expect(
    moveCrucible(
      { x: 0, y: 1, d: L },
      { x: 1, y: 1, ds: [ ], loss: 0 },
      city
    )
  ).toStrictEqual({
    x: 0, y: 1, ds: [L], loss: 4
  })
)

test(
  'moveCrucible() down at 0,1',
  () => expect(
    moveCrucible(
      { x: 0, y: 2, d: D },
      { x: 0, y: 1, ds: [L], loss: 4 },
      city
    )
  ).toStrictEqual({
    x: 0, y: 2, ds: [L, D], loss: 11
  })
)

test(
  'moveCrucible() right at 0,2',
  () => expect(
    moveCrucible(
      { x: 1, y: 2, d: R },
      { x: 0, y: 2, ds: [L, D], loss: 11 },
      city
    )
  ).toStrictEqual({
    x: 1, y: 2, ds: [L, D, R], loss: 19
  })
)

test(
  'moveCrucible() up at 1,2',
  () => expect(
    moveCrucible(
      { x: 1, y: 1, d: U },
      { x: 1, y: 2, ds: [L, D, R], loss: 19 },
      city
    )
  ).toStrictEqual({
    x: 1, y: 1, ds: [L, D, R, U], loss: 24
  })
)
