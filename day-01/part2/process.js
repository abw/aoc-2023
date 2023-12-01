import { file } from '@abw/badger-filesystem'

const numberMap = {
  one:    1,
  two:    2,
  three:  3,
  four:   4,
  five:   5,
  six:    6,
  seven:  7,
  eight:  8,
  nine:   9,
}

const matches = [
  ...Object.keys(numberMap),
  ...Object.values(numberMap)
].join('|')

const firstNumberRegex = new RegExp(
  `^.*?(${matches})`
)

const lastNumberRegex = new RegExp(
  `^.*?(${reverseString(matches)}).*?$`
)

export async function process(filename) {
  const text = await file(filename).read()
  return text
    .split('\n')                            // split into lines
    .filter( line => line.length )          // discard blank lines
    .map( line => firstAndLastDigit(line) ) // grok number
    .reduce(                                // sum numbers on all lines
      (sum, n) => sum + n,
      0
    )
}

function firstAndLastDigit(line) {
  // This is tricky because a string line '...oneight...' must be interpreted
  // as '...1ight...' when finding the first digit and '...on8...' when
  // finding the last.  So we have to search forwards for the first digit and
  // backwards for the last.  Getting the first one is easy, but getting the
  // last is harder because the regex engine will find the first match (e.g.
  // 'one') and then skip over those characters.  So we use the "sexeger"
  // technique (reversed "regexes") and search backwards in the reversed
  // string to match the reversed search terms.  That can be useful in the
  // real world because regexes can have poor performance finding the last
  // item in a string due to excessive backtracking.  It's often quicker to
  // reverse a string, search it, then reverse the result.
  const matchFirst = line.match(firstNumberRegex)
    || fail('Failed to match first digit in ${line}')
  const first = numberMap[matchFirst[1]] || matchFirst[1]

  const matchLast = reverseString(line).match(lastNumberRegex)
    || fail('Failed to match last digit in ${line}')
  const found = reverseString(matchLast[1])
  const last = numberMap[found] || found

  return parseInt(`${first}${last}`)
}

function reverseString(string) {
  return string.split('').reverse().join('')
}

export default process