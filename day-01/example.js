#!/usr/bin/env node
import process from './process.js'

console.log(
  'Example output:',
  await process('files/example.txt')
);
