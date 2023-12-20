// https://stackoverflow.com/questions/31302054/how-to-find-the-least-common-multiple-of-a-range-of-numbers
export function leastCommonMultiple(a, b) {
  return (a * b) / greatestCommonDivisor(a, b)
}

export function greatestCommonDivisor(a, b) {
  const remainder = a % b
  if (remainder === 0) return b
  return greatestCommonDivisor(b, remainder)
}
