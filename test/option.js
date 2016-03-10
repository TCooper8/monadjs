'use strict'

const Option = require('../src/option')
const assert = require('assert')

describe('Testing Try methods.', () => {
  it('Should test successful.', () => {
    assert.deepEqual(
      Option(5).get(),
      5
    )

    assert.deepEqual(
      Option(undefined),
      Option.none
    )

    assert.deepEqual(
      Option.map(i => i * i)(Option(5)).get(),
      25
    )
  })
})
