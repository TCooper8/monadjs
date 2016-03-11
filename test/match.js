'use strict'

const assert = require('assert')
const match = require('../src/match')

describe('Testing match methods.', () => {
  it('Should match types correctly.', () => {
    let f = match()
      .type(Number)(i => i)
      .type(String)(s => s)
      .type(Array)(a => a)

    assert.deepEqual(f(5), 5)
    assert.deepEqual(f('hi'), 'hi')
    assert.deepEqual(f([]), [])
  })

  it('Should match has property', () => {
    let f = match()
      .has('name')(obj => obj.name)

    assert.deepEqual(f({ name: 'bob' }), 'bob')
  })

  it('Should match get property.', () => {
    let f = match()
      .get('name')(name => name)

    assert.deepEqual(f({ name: 'bob' }), 'bob')
  })

  it('Should match wildcard.', () => {
    let f = match()
      .any(i => i)

    assert.deepEqual(f(undefined), undefined)
    assert.deepEqual(f(5), 5)
  })
})
