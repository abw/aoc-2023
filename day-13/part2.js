#!/usr/bin/env node
import { run } from '../lib/run.js'
import { doNothing, range } from '@abw/badger-utils'
import { noReflection, parseInput, xLinesEqual, yLinesEqual } from './lib.js'

await run(
  { day: 13, part: 2, blocks: true },
  ({ blocks, debugData }) => {
    debugData('blocks:', blocks)

    const maps = parseInput(blocks)
    debugData('maps:', maps)

    return maps
      .map(
        (map, n) => smudgedReflection(map, n, debugData)
      )
      .reduce(
        (sum, n) => sum + n,
        0
      )
  }
)

export function smudgedReflection(map, n, debugData) {
  const originallyReflects = yReflection(map, false, doNothing)
    || xReflection(map, false, doNothing)

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      const copy = [...map]
      const line = copy[y].split('')
      line[x] = line[x] === '.' ? '#' : '.'
      copy[y] = line.join('')
      debugData('smudged at', { x, y })
      debugData('copy:', copy)

      const reflects = yReflection(copy, originallyReflects, debugData)
        || xReflection(copy, originallyReflects, debugData)

      if (reflects) {
        debugData(`map ${n} reflects with smudge at ${x},${y}: `, reflects)
        return reflects
      }
    }
  }
  return noReflection(map, n)
}

export function yReflection(block, exclude, debugData) {
  for (let y of range(1, block.length - 1)) {
    const maxLines = Math.min(y, block.length - y)
    const before = block.slice(y-maxLines, y)
    const after  = block.slice(y, y + maxLines).reverse()
    debugData(`y: ${y} `, { before, after })
    if (yLinesEqual(before, after) && y * 100 !== exclude) {
      debugData(`y reflection at ${y}`, { before, after })
      return y * 100
    }
  }
}

export function xReflection(block, exclude, debugData) {
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
    if (xLinesEqual(before, after) && x !== exclude) {
      debugData(`x reflection at ${x}`, { before, after })
      return x
    }
  }
}
