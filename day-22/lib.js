import { doNothing, range } from '@abw/badger-utils'

export const sortMinZ = (a, b) => a.minz - b.minz

export function parseInput(lines) {
  return lines.map(parseLine)
}

export function parseLine(line, n) {
  const [from, to] = line
    .split('~')
    .map(
      xyz => {
        const [x, y, z] = xyz.split(',').map(Number)
        return { x, y, z }
      }
    )
  const x = to.x - from.x
  const y = to.y - from.y
  const z = to.z - from.z
  const d = x ? 'x' : y ? 'y' : z ? 'z' : 0
  const minx = Math.min(to.x, from.x)
  const maxx = Math.max(to.x, from.x)
  const miny = Math.min(to.y, from.y)
  const maxy = Math.max(to.y, from.y)
  const minz = Math.min(to.z, from.z)
  const maxz = Math.max(to.z, from.z)
  return { n, from, to, x, y, z, d, minx, maxx, miny, maxy, minz, maxz }
}

export function blockRange(block, dz=0) {
  return range(block.from.x, block.to.x).flatMap(
    x => range(block.from.y, block.to.y).flatMap(
      y => range(block.from.z, block.to.z).map(
        z => [x, y, z + dz]
      )
    )
  )
}

export function cubeInBlock([x, y, z], block) {
  return x >= block.minx && x <= block.maxx
    &&   y >= block.miny && y <= block.maxy
    &&   z >= block.minz && z <= block.maxz
}

export function spaceBeneathBlock(block, blocks) {
  if (block.minz === 1) {
    return false
  }

  // find all the cubes one lower than the current block
  // NOTE: there's some duplication here for vertically oriented blocks
  const cubesBeneath = blockRange(block, -1)

  // We can ignore any blocks that have a minz >= the maxz for the block
  // and also ignore the block itself.  We also ignore any blocks that have
  // the hidden flag set
  const mayBeLower = blocks.filter(
    candidate => candidate.n !== block.n
      && candidate.minz < block.maxz
      && ! candidate.hidden
  )

  // if any of the candidate blocks that are beneath the block intersect with
  // one of the cubes that the block would occupy if it went down by 1, then
  // the block can't move down.
  return ! mayBeLower.find(
    candidate => cubesBeneath.find(
      cube => cubeInBlock(cube, candidate)
    )
  )
}

export function shakaWhenTheBlocksFell(blocks, debug=doNothing) {
  const queue = [...blocks].sort(sortMinZ)
  let movement = 0
  queue.forEach(
    block => {
      while (spaceBeneathBlock(block, blocks)) {
        movement++
        debug(`Moving down block ${block.n}`)
        moveBlockDown(block)
      }
    }
  )
  return movement
}

export function wouldAnyBlocksFall(block, blocks) {
  const queue = [...blocks].sort(sortMinZ)
  block.hidden = true
  const fall = queue.find(
    block => spaceBeneathBlock(block, blocks)
  )
  block.hidden = false
  return fall
}

export function whichBlocksWouldFall(block, blocks) {
  const queue = [...blocks].sort(sortMinZ)
  block.hidden = true
  const fall = queue.filter(
    block => spaceBeneathBlock(block, blocks)
  )
  block.hidden = false
  return fall
}

export function moveBlockDown(block, n=1) {
  block.from.z -= n
  block.to.z -= n
  block.minz -= n
  block.maxz -= n
}

