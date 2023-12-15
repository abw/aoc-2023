import { fail } from '@abw/badger-utils'

export function parseInput(lines) {
  return lines.flatMap(
    line => line.split(',')
  )
}

export function parseCode(code) {
  const [, lens, op, flen] = code.match(/(.*?)([-=])(\d+)?/)
    || fail(`Cannot parse code: ${code}`)
  const box = hash(lens)
  return { code, lens, box, op, flen }
}

export function hash(input) {
  let value = 0
  for (let i = 0; i < input.length; i++) {
    const ascii = input.charCodeAt(i)
    value += ascii
    value = (value * 17) % 256
  }
  return value
}

export function removeLensFromBox(lens, box=[]) {
  // console.log(`removeLensFromBox ${lens} box:`, box)
  // If the operation character is a dash (-), go to the relevant box...
  const index = box.findIndex(
    item => item && item.lens === lens
  )

  if (index >= 0) {
    // ...and remove the lens with the given label if it is present in the box.
    box.splice(index, 1)
    // Then, move any remaining lenses as far forward in the box as they can go
    // without changing their order, filling any space made by removing the
    // indicated lens.
    return shiftLensesForwards(box, index)
  }
  // (If no lens in that box has the given label, nothing happens.)
  return box
}

export function shiftLensesForwards(box, start) {
  let newBox = box.slice(0, start)
  let rest = box.slice(start)
  while (newBox.length && ! newBox.at(-1)) {
    newBox.pop()
  }
  while (rest.length) {
    const item = rest.shift()
    if (item) {
      newBox.push(item)
    }
  }
  return newBox
}

export function addLensToBox(lens, flen, box=[]) {
  // console.log(`addLensToBox(${lens}, ${flen}, %o)`, box)

  // If the operation character is an equals sign (=), it will be followed by
  // a number indicating the focal length of the lens that needs to go into
  // the relevant box; There are two possible situations:
  const index = box.findIndex(
    item => item && item.lens === lens
  )
  // If there is already a lens in the box with the same label, replace the
  // old lens with the new lens: remove the old lens and put the new lens in
  // its place, not moving any other lenses in the box.
  if (index >= 0) {
    box[index] = { lens, flen }
    return box
  }
  // If there is not already a lens in the box with the same label, add the
  // lens to the box immediately behind any lenses already in the box. Don't
  // move any of the other lenses when you do this. If there aren't any
  // lenses in the box, the new lens goes all the way to the front of the box.
  const last = box.findLastIndex(Boolean)
  if (last >= 0) {
    box[last + 1] = { lens, flen }
  }
  else {
    box[0] = { lens, flen }
  }
  return box
}

export function focussingPowers(boxes, debug) {
  const powers = { }
  boxes.forEach(
    (box, i) => {
      if (box) {
        box.forEach(
          ({ lens, flen }, j) => {
            debug(`${lens}: ${i + 1} * ${j + 1} * ${flen}`)
            powers[lens] = (i + 1) * (j + 1) * flen
          }
        )
      }
    }
  )
  return powers
}