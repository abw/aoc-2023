import { expect, test } from 'vitest'
import { blockRange } from '../lib.js'

test(
  'blockRange 0',
  () => expect(
    blockRange({
      from: { x: 9, y: 10, z: 11 },
      to:   { x: 9, y: 10, z: 11 }
    }),
  ).toStrictEqual([
    [9, 10, 11]
  ])
)

test(
  'blockRange 1x',
  () => expect(
    blockRange({
      from: { x: 10, y: 20, z: 30 },
      to:   { x: 11, y: 20, z: 30 }
    }),
  ).toStrictEqual([
    [10, 20, 30],
    [11, 20, 30]
  ])
)

test(
  'blockRange 1y',
  () => expect(
    blockRange({
      from: { x: 10, y: 20, z: 30 },
      to:   { x: 10, y: 21, z: 30 }
    }),
  ).toStrictEqual([
    [10, 20, 30],
    [10, 21, 30]
  ])
)

test(
  'blockRange 1z',
  () => expect(
    blockRange({
      from: { x: 10, y: 20, z: 30 },
      to:   { x: 10, y: 20, z: 31 }
    }),
  ).toStrictEqual([
    [10, 20, 30],
    [10, 20, 31]
  ])
)

test(
  'blockRange 3x',
  () => expect(
    blockRange({
      from: { x: 10, y: 20, z: 30 },
      to:   { x: 12, y: 20, z: 30 }
    }),
  ).toStrictEqual([
    [10, 20, 30],
    [11, 20, 30],
    [12, 20, 30],
  ])
)

test(
  'blockRange 2x 3z',
  () => expect(
    blockRange({
      from: { x: 10, y: 20, z: 30 },
      to:   { x: 10, y: 22, z: 33 }
    }),
  ).toStrictEqual([
    [10, 20, 30],
    [10, 20, 31],
    [10, 20, 32],
    [10, 20, 33],
    [10, 21, 30],
    [10, 21, 31],
    [10, 21, 32],
    [10, 21, 33],
    [10, 22, 30],
    [10, 22, 31],
    [10, 22, 32],
    [10, 22, 33],
  ])
)

test(
  'blockRange 1z - 1',
  () => expect(
    blockRange({
      from: { x: 10, y: 20, z: 30 },
      to:   { x: 10, y: 20, z: 31 }
    }, -1),
  ).toStrictEqual([
    [10, 20, 29],
    [10, 20, 30]
  ])
)
