import { expect, test } from 'vitest'
import { cubeInBlock } from '../lib.js'

test(
  'cubeInBlock outside',
  () => expect(
    cubeInBlock(
      [10, 11, 12],
      { minx: 10, maxx: 10, miny: 11, maxy: 11, minz: 10, maxz: 11 }
    ),
  ).toBe(false)
)

test(
  'cubeInBlock inside min',
  () => expect(
    cubeInBlock(
      [10, 11, 12],
      { minx: 10, maxx: 10, miny: 11, maxy: 11, minz: 12, maxz: 12 }
    ),
  ).toBe(true)
)

test(
  'cubeInBlock inside max',
  () => expect(
    cubeInBlock(
      [10, 11, 12],
      { minx: 10, maxx: 10, miny: 11, maxy: 11, minz: 10, maxz: 12 }
    ),
  ).toBe(true)
)
