import { expect, test } from 'vitest'
import { addLensToBox } from '../lib.js'

test(
  'addLensToBox() 1',
  () => expect(
    addLensToBox(
      'b', 100,
      [{ lens: 'a' }, null, { lens: 'b' }, null, null, { lens: 'c' }, null, { lens: 'd' }, null],
      2
    )
  )
    .toStrictEqual(
      [{ lens: 'a' }, null, { lens: 'b', flen: 100 }, null, null, { lens: 'c' }, null, { lens: 'd' }, null],
    )
)
test(
  'addLensToBox() 1',
  () => expect(
    addLensToBox(
      'e', 20,
      [{ lens: 'a' }, null, { lens: 'b' }, null, null, { lens: 'c' }, null, { lens: 'd' }, null],
      2
    )
  )
    .toStrictEqual(
      [{ lens: 'a' }, null, { lens: 'b' }, null, null, { lens: 'c' }, null, { lens: 'd' }, { lens: 'e', flen: 20 }],
    )
)
