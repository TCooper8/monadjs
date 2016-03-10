'use strict'

const Try = require('../src/try')
const assert = require('assert')

describe('Testing Try methods.', () => {
  it('Should test successful.', () => {
    assert.deepEqual(
      Try(() => 5).get(),
      5
    )
    assert.deepEqual(
      Try(() => 5).get(),
      Try.success(5).get()
    )

    assert.deepEqual(
      Try(() => { throw 5 }).getExn(),
      5
    )
  })
})
