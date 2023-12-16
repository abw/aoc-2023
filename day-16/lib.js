export const U = 'u'
export const D = 'd'
export const L = 'l'
export const R = 'r'
export const V = [U, D]
export const H = [L, R]

export const mirrorType = {
  // when encountering a horizontal mirror, a beam travelling north is split
  // into two beams travelling east and west, no entry implies it carries on
  // unchanged
  '-': {
    u: H,
    d: H,
    l: [L],
    r: [R],
  },
  '|': {
    l: V,
    r: V,
    u: [U],
    d: [D]
  },
  '/': {
    u: [R],
    d: [L],
    l: [D],
    r: [U]
  },
  '\\': {
    u: [L],
    d: [R],
    l: [U],
    r: [D]
  }
}

export const movement = {
  u: { x:  0, y: -1 },
  d: { x:  0, y:  1 },
  l: { x: -1, y:  0 },
  r: { x:  1, y:  0 },
}

export const beamDir = {
  l: '<',
  r: '>',
  u: '^',
  d: 'V'
}

export function parseInput(lines) {
  return lines.map(
    line => line
      .split('')
      .map(
        char => ({ char, mirror: mirrorType[char], beams: { } })
      )
  )
}

export function moveBeam(beam, state) {
  const move = movement[beam.d]
  const newx = beam.x + move.x
  const newy = beam.y + move.y
  if (newx < 0 || newx >= state.width || newy < 0 || newy >= state.height) {
    beam.stopped = true
    return beam
  }
  beam.x = newx
  beam.y = newy
  return beam
}

export function beamStep(beam, state) {
  const cell = state.layout[beam.y][beam.x]

  if (cell.mirror) {
    // console.log(`mirror at ${beam.x}, ${beam.y}:`, cell.mirror)
    const dirs = cell.mirror[beam.d]
    return dirs.map(
      d => moveBeam({ ...beam, d }, state)
    )
  }
  else {
    // console.log(`no mirror at ${beam.x}, ${beam.y}: `, state.layout)
    return [moveBeam(beam, state)]
  }
}

export function traceBeams(state) {
  const beams = state.beams
    .flatMap(
      // update beam, possibly splitting into multiple beams
      beam => beamStep(beam, state)
    )
    .filter(
      // ignore any beams that we've already got in the map going in this
      // direction
      beam => ! state.layout[beam.y][beam.x].beams[beam.d]
    )
    .map(
      // add beams to the map
      beam => {
        state.layout[beam.y][beam.x].beams[beam.d] = { ...beam }
        return beam
      }
    )

  // continue until we've traced all beams
  state.debug(beams.length, 'beams')
  state.debugData('beams:', beams)

  return beams.length
    ? traceBeams({ ...state, beams })
    : state
}

export function energizedCount(layout) {
  return layout
    .flatMap(
      row => row.map( cell => Object.keys(cell.beams).length ? 1 : 0 )
    )
    .reduce(
      (sum, n) => sum + n,
      0
    )
}

export function energizedLayout(layout) {
  return beamLayout(
    layout,
    cell => Object.keys(cell.beams).length
      ? '#'
      : '.'
  )
}

export function beamLayout(layout, showCell=beamCell) {
  return layout.map(
    row => row
      .map(showCell)
      .join('')
  ).join('\n')
}

export function beamCell(cell) {
  const dirs = Object.keys(cell.beams)
  if (cell.mirror) {
    return cell.char
  }
  if (dirs.length === 0) {
    return '.'
  }
  if (dirs.length === 1) {
    return beamDir[dirs[0]]
  }
  return dirs.length
}

export function energizedBeamLayout(beam, layout, debug, debugData) {
  const width  = layout[0].length
  const height = layout.length
  const beams  = [beam]

  // mark the starting point
  layout[beam.y][beam.x].beams.r = { ...beam }

  const state  = traceBeams({
    layout, width, height, beams, debug, debugData
  })

  debug(`Starting beam:`, beam)
  debug(`Beam layout\n` + beamLayout(state.layout))
  debug(`Energized layout\n` + energizedLayout(state.layout))
  return energizedCount(state.layout)
}