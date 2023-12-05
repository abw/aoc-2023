# Advent of Code 2023

These are my solutions to the Advent of Code for 2023

https://adventofcode.com/2023

Solutions are written in Javascript.

To play along at home you'll need to have [Node.js](https://nodejs.org/)
installed.

Then install the dependencies using your favourite package manager.

```bash
# Either...
$ npm install

# ...or...
$ yarn install

# ...or
$ pnpm install
```

The puzzles for each day are in the directories named `day-NN`.  Each of those
directories has a `part1.js` and `part2.js` file.

```bash
$ cd day-01
$ ./part1.js
```

By default the code will process the `file/input.txt` file in the same
directory, hopefully giving the correct answer for the puzzle.

The `-e` (or `--example`) option will run the code using the
`files/example.txt` input.

```bash
$ ./part1.js -e
```

Some of the puzzle have additional debugging which can be enabled with the
`-d` (or `--debugging`) option.

```bash
$ ./part1.js -d
```

The `-h` (or `--help`) option shows help summarising the above options, in
case you didn't read this fine manual.

# Author

Andy Wardley, December 2023
