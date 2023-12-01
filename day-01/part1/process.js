import { file } from '@abw/badger-filesystem'

export async function process(filename) {
  const text = await file(filename).read()
  return text
    .split('\n')                          // split into lines
    .filter( line => line.length )        // discard blank lines
    .map(
      line => line                        // process each line
        .replaceAll(/\D/g, '')            // remove non-digits
        .split('')                        // split into array
        .map( digit => parseInt(digit) )  // convert to integers
    )
    .map(
      nums =>                             // sum digits on each line
        nums[0] * 10 +                    // first digit is tens
        nums.at(-1)                       // last digit is units
    )
    .reduce(                              // sum numbers on all lines
      (sum, n) => sum + n,
      0
    )
}

export default process