import { range } from '@abw/badger-utils'

export function parseInput(blocks) {
  return blocks.map(
    block => block.split('\n')
  )
}

export function reflection(map, n, debugData) {
  return yReflection(map, debugData)
    || xReflection(map, debugData)
    || noReflection(map, n)
}

export function yReflection(block, debugData) {
  for (let y of range(1, block.length - 1)) {
    const maxLines = Math.min(y, block.length - y)
    const before = block.slice(y-maxLines, y)
    const after  = block.slice(y, y + maxLines).reverse()
    debugData(`y: ${y} `, { before, after })
    if (yLinesEqual(before, after)) {
      debugData(`y reflection at ${y}`, { before, after })
      return y * 100
    }
  }
}

export function xReflection(block, debugData) {
  const block0 = block[0]
  for (let x of range(1, block0.length - 1)) {
    const maxLines = Math.min(x, block0.length - x)
    const before = block.map(
      line => line.slice(x-maxLines, x)
    )
    const after = block.map(
      line => line.slice(x, x + maxLines).split('').reverse().join('')
    )
    debugData(`x: ${x} `, { before, after })
    if (xLinesEqual(before, after)) {
      debugData(`x reflection at ${x}`, { before, after })
      return x
    }
  }
}

export function yLinesEqual(lines1, lines2) {
  for (let i = 0; i < lines1.length; i++) {
    if (! lineEqual(lines1[i], lines2[i])) {
      return false
    }
  }
  return true
}

export function lineEqual(line1, line2) {
  for (let i = 0; i < line1.length; i++) {
    if (line1[i] !== line2[i]) {
      return false
    }
  }
  return true
}

export function xLinesEqual(lines1, lines2) {
  for (let i = 0; i < lines1.length; i++) {
    if (lines1[i] !== lines2[i]) {
      return false
    }
  }
  return true
}

export function noReflection(map, n) {
  console.log(`!! no reflection in map ${n}: `, map.join('\n'))
  return 0
}