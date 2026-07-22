import assert from 'node:assert/strict'
import test from 'node:test'

import { serializeJsonValue } from './fiscal-receipts.js'

test('serializes a decoded refund items snapshot before writing it to MySQL JSON', () => {
  assert.equal(
    serializeJsonValue([{ kind: 'product', orderItemId: 46, quantity: 1 }]),
    '[{"kind":"product","orderItemId":46,"quantity":1}]'
  )
})

test('keeps an already serialized refund snapshot unchanged', () => {
  const snapshot = '[{"kind":"product"}]'
  assert.equal(serializeJsonValue(snapshot), snapshot)
})
