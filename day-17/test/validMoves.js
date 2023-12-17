import { expect, test } from 'vitest'
import { L, R, U, D, validMoves } from '../lib.js'

const city = { width: 5, height: 6 }

test(
  'validMoves() at 0, 0',
  () => expect(
    validMoves(
      { x: 0, y: 0, ds: [ ] },
      city
    )
  ).toStrictEqual([
    { x: 0, y: 1, d: D },
    { x: 1, y: 0, d: R }
  ])
)

test(
  'validMoves() at 0, 0 gone L',
  () => expect(
    validMoves(
      { x: 0, y: 0, ds: [L] },
      { ...city, seen: { } },
    )
  ).toStrictEqual([
    { x: 0, y: 1, d: D },
  ])
)

test(
  'validMoves() at 3, 0 gone rr',
  () => expect(
    validMoves(
      { x: 3, y: 0, ds: [ R, R ] },
      { ...city, seen: { } },
    )
  ).toStrictEqual([
    { x: 3, y: 1, d: D },
    { x: 4, y: 0, d: R },
  ])
)

test(
  'validMoves() at 3, 0 gone rrr',
  () => expect(
    validMoves(
      { x: 3, y: 0, ds: [ R, R, R ] },
      { ...city, seen: { } },
    )
  ).toStrictEqual([
    { x: 3, y: 1, d: D },
  ])
)

test(
  'validMoves() at 3, 1 gone rr',
  () => expect(
    validMoves(
      { x: 3, y: 1, ds: [ R, R ] },
      { ...city, seen: { } },
    )
  ).toStrictEqual([
    { x: 3, y: 2, d: D },
    { x: 4, y: 1, d: R },
    { x: 3, y: 0, d: U },
  ])
)

test(
  'validMoves() at 3, 1 gone rrr',
  () => expect(
    validMoves(
      { x: 3, y: 1, ds: [ R, R, R ] },
      { ...city, seen: { } },
    )
  ).toStrictEqual([
    { x: 3, y: 2, d: D },
    { x: 3, y: 0, d: U },
  ])
)
