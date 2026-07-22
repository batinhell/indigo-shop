import assert from 'node:assert/strict'
import test from 'node:test'

import { getSitePaymentStatusMeta } from './site-payment-status.js'

test('shows a full refund instead of falling back to awaiting payment', () => {
  assert.deepEqual(getSitePaymentStatusMeta('refunded'), {
    label: 'Возврат',
    tone: 'secondary',
    group: 'finished'
  })
})

test('shows a partial refund as a finished payment state', () => {
  assert.deepEqual(getSitePaymentStatusMeta('partially_refunded'), {
    label: 'Частичный возврат',
    tone: 'secondary',
    group: 'finished'
  })
})
