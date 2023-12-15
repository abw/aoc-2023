#!/usr/bin/env node
import { run } from '../lib/run.js'
import { addLensToBox, focussingPowers, parseCode, parseInput, removeLensFromBox } from './lib.js'

await run(
  { day: 15, part: 2, lines: true },
  ({ lines, debug, debugData }) => {
    debugData('lines:', lines)

    const codes = parseInput(lines)
    debugData('codes:', codes)

    const ops = codes.map(parseCode)
    debugData('ops:', ops)

    let boxes = new Array(256)

    ops.forEach(
      ({ code, lens, box, op, flen }) => {
        if (op === '-') {
          removeLensFromBox(lens, boxes[box])
        }
        else {
          boxes[box] = addLensToBox(lens, flen, boxes[box])
        }
        debug(`After "${code}":\n` + showBoxes(boxes))
      }
    )

    const powers = focussingPowers(boxes, debug)
    debugData(`powers: `, powers)

    return Object
      .values(powers)
      .reduce(
        (sum, power) => sum + power,
        0
      )
  }
)

function showBoxes(boxes) {
  return boxes
    .filter( Boolean )
    .filter( box => box.length )
    .map(
      (box, n) => `Box ${n}: ${boxContents(box)}`
    )
    .join('\n')
}

function boxContents(box) {
  return box
    .map(
      ({ lens, flen }) => `[${lens} ${flen}]`
    )
}

