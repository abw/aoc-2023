import { range } from '@abw/badger-utils'

export function parseInput(lines) {
  return lines
    .map( line => line.split('') )
}

export function cloneMap(map) {
  return [
    ...map
      .map( line => [...line] )
  ]
}

export function mapText(map) {
  return map
    .map( line => line.join('') )
    .join('\n')
}

export function rollMapNorth(map) {
  const rolled = cloneMap(map)
  const height = rolled.length
  const rocks  = [ ]

  rolled.forEach(
    (line, y) => {
      line.forEach(
        (cell, x) => {
          if (cell === '#') {
            return
          }
          if (cell === '.') {
            // find the next O south of this point that isn't blocked by a
            // rock and move it to this position
            for (let dy = y + 1; dy < height; dy++) {
              const target = rolled[dy][x]
              if (target === '#') {
                // blocked by a cube
                return
              }
              if (target === 'O') {
                // found a rolling rock which we can move north to this cell
                rolled[y][x] = target
                rolled[dy][x] = '.'
                rocks.push([y, x])
                return
              }
            }
          }
          if (cell === 'O') {
            rocks.push([y, x])
          }
        }
      )
    }
  )
  return { rolled, rocks }
}

export function rotateTheBoard(map) {
  // That's numberwang, let's rotate the board! (clockwise)
  const height = map.length
  const width  = map[0].length
  return range(0, width - 1).map(
    x => range(height - 1, 0).map(
      y => map[y][x]
    )
  )
}

export function spinCycle(map) {
  let m = map
  for (let d = 0; d < 4; d++) {
    m = rollMapNorth(m).rolled
    m = rotateTheBoard(m)
  }
  return m
}