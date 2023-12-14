export function memoize(fn) {
  const memo = { }
  return (...args) => {
    const key = JSON.stringify(args)
    return memo[key] ??= fn(...args)
  }
}
