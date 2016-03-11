'use strict'

const assert = require('assert')
const _ = require('../src')
//const Array = _.Array

describe('Testing monadjs methods.', () => {
  it('Should map over the array.', () => {
    assert.deepEqual(
      _.map(Array)(i => i * 2)([1, 2]),
      [2, 4]
    )
  })
})
