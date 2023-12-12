export function parseInput(lines) {
  return lines.map(
    line => {
      const [map, nstr] = line.split(' ')
      const chars  = map.split('')
      const runs   = nstr.split(',').map( n => parseInt(n) )
      return { map, chars, runs }
    }
  )
}

export function memoize(fn) {
  const memo = { }
  return (...args) => {
    const key = JSON.stringify(args)
    return memo[key] ??= fn(...args)
  }
}

export function sum(nums) {
  return nums.reduce(
    (sum, r) => sum + r,
    0
  )
}

export function minCharsForRuns(runs) {
  // total number of all runs, plus gaps between them
  return sum(runs) + runs.length - 1
}

export function analyseLine(line, count, debug) {
  const { map, chars, runs } = line
  debug(`INPUT: ${map}`)
  const result = count(chars, runs)
  debug(`RESULT ${map} => ${result}`)
  return result
}

export function counter(debug) {
  const countPermutations = memoize(
    (chars, runs) => {
      debug(`chars:`, chars.join(''), ` runs:`, runs.join(', '))
      // if there are no more chars then it's OK as long as there aren't any
      // more runs to be accounted for
      if (chars.length === 0) {
        return runs.length === 0
          ? 1
          : 0
      }

      // if we're out of runs then it's OK as long as there aren't any more '#'
      // characters that need to be accounted for
      if (runs.length === 0) {
        return chars.indexOf('#') < 0
          ? 1
          : 0
      }

      // if the number of chars is less than the total number of runs, plus some
      // extra for the gaps, then this isn't a solution
      if (chars.length < minCharsForRuns(runs)) {
        return 0
      }

      // if the first character is '.' then we can skip it
      if (chars[0] === '.') {
        return countPermutations(chars.slice(1), runs)
      }

      // if the first character is '#'...
      if (chars[0] === '#') {
        // ...then this group of chars up to the next '.' must be at least as
        // long as the next run
        const [nextRun, ...moreRuns] = runs
        const prefix = chars.slice(0, nextRun)
        if (prefix.indexOf('.') >= 0) {
          return 0
        }

        // ...and the character immediately after than run must not be '#
        if (chars[nextRun] === '#') {
          return 0
        }

        // ...otherwise we can skip this run and move on
        return countPermutations(chars.slice(nextRun + 1), moreRuns)
      }

      // otherwise the first character is '?' which gives us two possibilities:
      // it could be a '#' or a '.'
      return countPermutations(['#', ...chars.slice(1)], runs)
        +    countPermutations(['.', ...chars.slice(1)], runs)
    }
  )

  return countPermutations
}

