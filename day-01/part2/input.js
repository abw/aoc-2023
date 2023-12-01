#!/usr/bin/env node
import process from './process.js'

console.log(
  'Output:',
  await process('files/input.txt')
);
