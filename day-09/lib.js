export function parseInput(lines) {
  return lines.map(
    line => [
      ...line.matchAll(/(-?\d+)/g)
    ].map( i => parseInt(i) )
  )
}

export function diffs(history) {
  return history
    .slice(1)
    .map(
      (value, n) => value - history[n]
    )
}

export function sum(numbers) {
  return numbers.reduce(
    (sum, n) => sum + n
  )
}