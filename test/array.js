'use strict'

const Array = require('../src/array')
const assert = require('assert')

describe('Testing array methods.', () => {
  it('Should test type correctly', () => {
    assert(Array.isArray([]))
    assert(Array.isArray(new Array()))
    assert(Array.isArray(Array()))
  })

  it('Should filter the array propertly', () => {
    let a = [1, 1, 2, 2]
    assert.deepEqual(
      Array.filter(i => i === 2)(a),
      [2, 2]
    )
  })

  it('Should find from the array.', () => {
    let a = [1, 2, 3, 4]
    assert.deepEqual(
      Array.find(i => i === 4)(a).get(),
      4
    )

    assert.deepEqual(
      Array.find(i => i === 5)(a).isNone(),
      true
    )
  })

  it('Should find index from the array.', () => {
    let a = [1, 2, 3, 4]
    assert.deepEqual(
      Array.findIndex(i => i === 4)(a),
      3
    )

    assert.deepEqual(
      Array.findIndex(i => i === 5)(a),
      -1
    )
  })

  it('Should fold correctly', () => {
    let a = [ 'b', 'c' ]
    assert.deepEqual(
      Array.fold((a, b) => a + b)('a')(a),
      'abc'
    )
  })
})
