import assert from 'node:assert/strict'
import test from 'node:test'

import { scaleTestRefundAmount } from './vtb-sbp-api.js'

test('scales a full business refund to the amount charged by VTB test environment', () => {
  assert.equal(scaleTestRefundAmount(2400, 2400, 100), 100)
})

test('scales a partial business refund proportionally for VTB test environment', () => {
  assert.equal(scaleTestRefundAmount(600, 2400, 100), 25)
})
