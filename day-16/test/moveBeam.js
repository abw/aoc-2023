import { expect, test } from 'vitest'
import { L, R, U, D, moveBeam } from '../lib.js'

const state = { width: 5, height: 6 }

test(
  'moveBeam() right',
  () => expect( moveBeam( { x: 2, y: 2, d: R }, state ) )
    .toStrictEqual( { x: 3, y: 2, d: R } )
)

test(
  'moveBeam() down',
  () => expect( moveBeam( { x: 2, y: 2, d: D }, state ) )
    .toStrictEqual( { x: 2, y: 3, d: D } )
)

test(
  'moveBeam() left',
  () => expect( moveBeam( { x: 2, y: 2, d: L }, state ) )
    .toStrictEqual( { x: 1, y: 2, d: L } )
)

test(
  'moveBeam() up',
  () => expect( moveBeam( { x: 2, y: 2, d: U }, state ) )
    .toStrictEqual( { x: 2, y: 1, d: U } )
)

test(
  'moveBeam() left and stop',
  () => expect( moveBeam( { x: 0, y: 0, d: L }, state ) )
    .toStrictEqual( { x: 0, y: 0, d: L, stopped: true } )
)

test(
  'moveBeam() right and stop',
  () => expect( moveBeam( { x: 4, y: 0, d: R }, state ) )
    .toStrictEqual( { x: 4, y: 0, d: R, stopped: true } )
)

test(
  'moveBeam() down and stop',
  () => expect( moveBeam( { x: 4, y: 5, d: D }, state ) )
    .toStrictEqual( { x: 4, y: 5, d: D, stopped: true } )
)

test(
  'moveBeam() up and stop',
  () => expect( moveBeam( { x: 4, y: 0, d: U }, state ) )
    .toStrictEqual( { x: 4, y: 0, d: U, stopped: true } )
)
