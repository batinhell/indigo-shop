import assert from 'node:assert/strict'
import test from 'node:test'

import { serializeJsonValue } from './site-order-jobs.js'

test('serializes a decoded MySQL JSON object before writing it to a JSON column', () => {
  assert.equal(
    serializeJsonValue({ operation: { status: 'wait' } }),
    '{"operation":{"status":"wait"}}'
  )
})

test('keeps an already serialized JSON value unchanged', () => {
  const value = '{"operation":{"status":"done"}}'
  assert.equal(serializeJsonValue(value), value)
})

test('maps an empty payload to SQL null', () => {
  assert.equal(serializeJsonValue(null), null)
})
