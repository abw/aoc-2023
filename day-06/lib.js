export function parseInput(lines) {
  const [times, distances] = lines.map(
    line => [ ...line.matchAll(/(\d+)/g) ]
      .map( n => parseInt(n) )
  )
  return times.map(
    (time, n) => [time, distances[n]]
  )
}

export function distanceTravelled(totalTime, chargeTime) {
  return chargeTime * (totalTime - chargeTime)
}

