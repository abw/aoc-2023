import { expect, test } from 'vitest'
import { L, R, U, D, beamStep, parseInput } from '../lib.js'

test(
  'beamStep() right',
  () => expect(
    beamStep(
      { x: 0, y: 0, d: R },
      { width: 5, height: 6, layout: parseInput(['.']) }
    )
  )
    .toStrictEqual([
      { x: 1, y: 0, d: R }
    ])
)

test(
  'beamStep() right up',
  () => expect(
    beamStep(
      { x: 0, y: 0, d: R },
      { width: 5, height: 6, layout: parseInput(['/']) }
    )
  )
    .toStrictEqual([
      { x: 0, y: 0, d: U, stopped: true }
    ])
)

test(
  'beamStep() right down',
  () => expect(
    beamStep(
      { x: 0, y: 0, d: R },
      { width: 5, height: 6, layout: parseInput(['\\']) }
    )
  )
    .toStrictEqual([
      { x: 0, y: 1, d: D }
    ])
)

test(
  'beamStep() right vertical',
  () => expect(
    beamStep(
      { x: 0, y: 0, d: R },
      { width: 5, height: 6, layout: parseInput(['|']) }
    )
  )
    .toStrictEqual([
      { x: 0, y: 0, d: U, stopped: true },
      { x: 0, y: 1, d: D }
    ])
)

test(
  'beamStep() right horizontal',
  () => expect(
    beamStep(
      { x: 0, y: 0, d: R },
      { width: 5, height: 6, layout: parseInput(['-']) }
    )
  )
    .toStrictEqual([
      { x: 1, y: 0, d: R },
    ])
)

test(
  'beamStep() left down',
  () => expect(
    beamStep(
      { x: 0, y: 0, d: L },
      { width: 5, height: 6, layout: parseInput(['/']) }
    )
  )
    .toStrictEqual([
      { x: 0, y: 1, d: D }
    ])
)

test(
  'beamStep() left up',
  () => expect(
    beamStep(
      { x: 0, y: 0, d: L },
      { width: 5, height: 6, layout: parseInput(['\\']) }
    )
  )
    .toStrictEqual([
      { x: 0, y: 0, d: U, stopped: true }
    ])
)
