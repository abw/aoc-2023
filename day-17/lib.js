import { hasValue, splitHash, splitList } from '@abw/badger-utils'

export const D   = 'd'
export const L   = 'l'
export const R   = 'r'
export const U   = 'u'
export const ANY = 'any'
export const directions = [D, L, R, U]

export const turns = {
  u:   splitList('l r u'),
  d:   splitList('d l r'),
  r:   splitList('d r u'),
  l:   splitList('d l u'),
  any: splitList('d l r u'),
}
export const exclude = {
  uuu: splitHash('u'),
  ddd: splitHash('d'),
  lll: splitHash('l'),
  rrr: splitHash('r'),
}

export const movement = {
  u: { x:  0, y: -1 },
  d: { x:  0, y:  1 },
  l: { x: -1, y:  0 },
  r: { x:  1, y:  0 },
}

export const moves = [
  { dx:  0, dy: -1 },
  { dx:  0, dy:  1 },
  { dx: -1, dy:  0 },
  { dx:  1, dy:  0 },
]

export function parseInput(lines) {
  return lines
    .map(
      line => line
        .split('')
        .map(
          i => parseInt(i)
        )
    )
}

export function dijkstraCity(city) {
  const seen = { }
  const queue = [
    { x: 0, y: 0, dx: 0, dy: 0, steps: 0, loss: 0 }
  ]

  while (queue.length) {
    const { x, y, dx, dy, steps, loss } = queue.shift()

    // ignore nodes we've already seen
    const key = `${x},${y},${dx},${dy},${steps}`
    if (seen[key]) {
      continue;
    }
    seen[key] = true

    if (steps < 3 && dx != 0 && dy != 0) {
      const nextx = x + dx
      const nexty = y + dy
      if (city.inbounds(nextx, nexty)) {
        queue.push({
          x: nextx, y: nexty, dx, dy,
          steps: steps + 1,
          loss: loss + city.blocks[nexty][nextx]
        })
      }
    }

    for (let move of moves) {
      // ignore movement in the same direction
      if (move.dx === dx && move.dy === dy) continue
      // ignore movement in the opposite vertical direction
      if (move.dx === dx && move.dy === -dy) continue
      // ignore movement in the opposite horizontal direction
      if (move.dy === dy && move.dx === -dx) continue;
      const nextx = x + move.dx
      const nexty = y + move.dy
      if (city.inbounds(nextx, nexty)) {
        queue.push({
          x: nextx, y: nexty,
          dx: move.dx, dy: move.dy,
          steps: 1,
          loss: loss + city.blocks[nexty][nextx]
        })
      }
    }
  }
}

export function validMoves(crucible, city) {
  // current direction of crucible (or 'any' for first move)
  const d = crucible.ds.at(-1) || ANY
  // last 3 directions taken
  const last3 = crucible.ds.slice(-3).join('')
  // possible exclusion list from last 3 moves (e.g. uuu excludes going u)
  const excl = exclude[last3] || { }

  return turns[d]
    .filter( d => ! excl[d] )
    .map( d => validMove(d, crucible, city) )
    .filter(hasValue)
    .filter(
      // ignore any moves that take us back to a square we've already been
      // to, travelling in the same direction
      move => {
        const key = [move.x, move.y, move.d].join(',')
        const seen = city.seen ||= { }
        if (seen[key]) {
          return false
        }
        else {
          seen[key] = true
          return true
        }
      }
    )
}

export function validMove(d, crucible, city) {
  const move = movement[d]
  const x    = crucible.x + move.x
  const y    = crucible.y + move.y
  return (x >= 0 && x < city.width && y >= 0 && y < city.height )
    ? { x, y, d }
    : null
}

export function moveCrucible(move, crucible, city) {
  // move looks like this:
  //   { x: 1, y: 0, d: R },
  // crucible looks like this:
  //   { x: 0, y: 0, ds: [ ], loss: 0 },
  // should return:
  //   { x: 1, y: 0, ds: [R], loss: n },
  const { x, y, d } = move
  const loss = crucible.loss + city.blocks[y][x]
  return {
    x, y, loss,
    ds: [...crucible.ds, d]
  }
}

export function makeValidMoves(crucible, city) {
  return validMoves(crucible, city)
    .map(
      move => moveCrucible(move, crucible, city)
    )
}

export function bestPath(crucible, city) {
  const memos    = { }
  const bestMove = (crucible, city) => {
    // console.log(`best path at ${crucible.x},${crucible.y} => ${crucible.ds.at(-1) || ANY}`)

    // if the crucible is at the bottom right corner then we have a path
    if (crucible.x === city.width - 1 && crucible.y === city.height - 1) {
      console.log(`AT END with loss ${crucible.loss}`)
      return crucible
    }
    const key = [
      crucible.x,
      crucible.y,
      crucible.ds.slice(-3).join('')
    ].join(',')

    //if (memos[key]) {
    //  return memos[key]
    //}

    // otherwise examine all possible moves and pick the best
    return memos[key] ||= makeValidMoves(crucible, city)
      .map(
        crucible => bestMove(crucible, city)
      )
      .reduce(
        (best, move) => move.loss < best.loss
          ? move
          : best,
        { loss: Infinity }
      )
      /*
      .map(
        moves => {
          // console.log(`validMoves: `, moves)
          return moves
        }
      )
      .map(
        crucible => bestMove(crucible, city)
      )
      */
      /*
      .filter(hasValue)

    if (moves.length) {
      const best = moves
        .reduce(
          (best, move) => move.loss < best.loss
            ? move
            : best
        )
      memos[key] = best
      return best
    }
    return null
      */
  }

  return bestMove(crucible, city)
}