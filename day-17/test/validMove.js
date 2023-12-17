import { expect, test } from 'vitest'
import { L, R, U, D, validMove } from '../lib.js'

const city = { width: 5, height: 6 }

test(
  'validMove() left at x=0',
  () => expect(
    validMove(
      L,
      { x: 0, y: 0 },
      city
    )
  ).toBe(null)
)

test(
  'validMove() up at y=0',
  () => expect(
    validMove(
      U,
      { x: 0, y: 0 },
      city
    )
  ).toBe(null)
)

test(
  'validMove() right at x=4',
  () => expect(
    validMove(
      R,
      { x: 4, y: 0 },
      city
    )
  ).toBe(null)
)

test(
  'validMove() down at y=5',
  () => expect(
    validMove(
      D,
      { x: 0, y: 5 },
      city
    )
  ).toBe(null)
)

test(
  'validMove() left',
  () => expect(
    validMove(
      L,
      { x: 1, y: 2 },
      city
    )
  ).toStrictEqual({ x: 0, y: 2, d: L })
)

test(
  'validMove() right',
  () => expect(
    validMove(
      R,
      { x: 1, y: 2 },
      city
    )
  ).toStrictEqual({ x: 2, y: 2, d: R })
)

test(
  'validMove() up',
  () => expect(
    validMove(
      U,
      { x: 1, y: 2 },
      city
    )
  ).toStrictEqual({ x: 1, y: 1, d: U })
)

test(
  'validMove() down',
  () => expect(
    validMove(
      D,
      { x: 1, y: 2 },
      city
    )
  ).toStrictEqual({ x: 1, y: 3, d: D })
)
