#!/usr/bin/env node
import { fail } from '@abw/badger-utils'

export function parseSeeds(line) {
  const seedStrs = [
    ...line
      .split(/: /)[1]
      .matchAll(/(\d+)/g)
  ]
  return seedStrs.map(
    ([,n]) => parseInt(n)
  )
}

export function buildMap(blocks) {
  const maps = blocks.map(parseBlock)
  return maps
    .reduce(
      (transition, map) => {
        transition[map.mapFrom] = map
        return transition
      },
      { }
    )
}

export function parseBlock(block) {
  const lines = block.split('\n')
  const match = lines
    .shift()
    .match(/(\w+?)-to-(\w+?) map/)
    || fail(`cannot parse block: ${block}`)
  const [, mapFrom, mapTo] = match
  const map = lines
    .map(
      line => {
        const [destStart, srcStart, rangeLength] =
          [ ...line.matchAll(/(\d+)/g) ]
            .map(
              ([, str]) => parseInt(str)
            )
        const destEnd = destStart + rangeLength - 1
        const srcEnd  = srcStart + rangeLength - 1
        return {
          destStart, destEnd,
          srcStart, srcEnd,
          rangeLength
        }
      }
    )
  return { mapFrom, mapTo, map }
}

export function findLocation(seedNo, transition) {
  let mapFrom  = 'seed'
  let mapValue = seedNo
  while (mapFrom !== 'location') {
    [mapFrom, mapValue] = transitionValue(mapFrom, mapValue, transition)
  }
  return mapValue
}

export function transitionValue(mapFrom, srcValue, transition) {
  const map     = transition[mapFrom] || fail(`No transition for ${mapFrom}`)
  const mapTo   = map.mapTo
  const value   = mapValue(srcValue, map.map)
  // console.log(`${mapFrom} ${srcValue} maps to ${mapTo} ${value}`)
  return [mapTo, value]
}

export function mapValue(mapFrom, maps) {
  for (let range of maps) {
    if (mapFrom >= range.srcStart && mapFrom <= range.srcEnd) {
      const delta = mapFrom - range.srcStart
      return range.destStart + delta
    }
  }
  return mapFrom
}

