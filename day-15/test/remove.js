import { expect, test } from 'vitest'
import { removeLensFromBox } from '../lib.js'

test(
  'removeLensFromBox() 1',
  () => expect(
    removeLensFromBox(
      'b',
      [{ lens: 'a' }, null, { lens: 'b' }, null, null, { lens: 'c' }, null, { lens: 'd' }, null],
      2
    )
  )
    .toStrictEqual(
      [{ lens: 'a' }, { lens: 'c' }, { lens: 'd' }]
    )
)
test(
  'removeLensFromBox() 1',
  () => expect(
    removeLensFromBox(
      'c',
      [{ lens: 'a' }, null, { lens: 'b' }, null, null, { lens: 'c' }, null, { lens: 'd' }, null],
      2
    )
  )
    .toStrictEqual(
      [{ lens: 'a' }, null, { lens: 'b' }, { lens: 'd' }]
    )
)
/*
test(
  'removeLensFromBox() 1',
  () => expect(
    removeLensFromBox()
    .toBe(52)
  )
)
*/