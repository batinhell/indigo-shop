import assert from 'node:assert/strict'
import test from 'node:test'

import {
  createRefundItemsSnapshot,
  normalizeSelectedRefundQuantities
} from './vtb-refunds.js'

globalThis.createError = options => Object.assign(new Error(options.message), options)

const orderItems = [{
  id: 10,
  product_id: 23,
  name: 'Флаг',
  description: 'Атлас, 90×135 см',
  quantity: 3,
  unit_price: 2000,
  design_price: 1500,
  total: 7500
}]

test('partial refund is calculated from selected order items, not an arbitrary amount', () => {
  const refunded = new Map()
  const selected = normalizeSelectedRefundQuantities({
    type: 'partial',
    items: [{ orderItemId: 10, quantity: 2 }]
  }, orderItems, refunded)
  const snapshot = createRefundItemsSnapshot(orderItems, selected, refunded)

  assert.deepEqual(snapshot.map(item => ({ kind: item.kind, quantity: item.quantity, total: item.total })), [
    { kind: 'product', quantity: 2, total: 4000 }
  ])
})

test('design service is refunded when the final quantity of an item is returned', () => {
  const refunded = new Map([[10, 2]])
  const selected = normalizeSelectedRefundQuantities({
    type: 'partial',
    items: [{ orderItemId: 10, quantity: 1 }]
  }, orderItems, refunded)
  const snapshot = createRefundItemsSnapshot(orderItems, selected, refunded)

  assert.deepEqual(snapshot.map(item => ({ kind: item.kind, quantity: item.quantity, total: item.total })), [
    { kind: 'product', quantity: 1, total: 2000 },
    { kind: 'design', quantity: 1, total: 1500 }
  ])
})

test('full refund selects only quantities not reserved by earlier refunds', () => {
  const refunded = new Map([[10, 1]])
  const selected = normalizeSelectedRefundQuantities({ type: 'full', items: [] }, orderItems, refunded)

  assert.equal(selected.get(10), 2)
})

test('refund cannot exceed the remaining item quantity', () => {
  const refunded = new Map([[10, 2]])
  const selected = new Map([[10, 2]])

  assert.throws(
    () => createRefundItemsSnapshot(orderItems, selected, refunded),
    error => error.statusCode === 409 && error.statusMessage === 'Refund quantity exceeds available'
  )
})
