import { expect, test } from 'vitest'
import { hash } from '../lib.js'

test(
  'hash(HASH)',
  () => expect(hash('HASH')).toBe(52)
)