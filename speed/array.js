'use strict'

//const Array = require('../src/array')
const Monad = require('../src/index')
const _ = require('lodash')
const assert = require('assert')

let timefn = f => n => {
  let ti = new Date()
  var i = -1
  while (++i < n) {
    f()
  }

  let tf = new Date()
  let dt = (tf - ti) / 1000.0

  console.log('%s in %ss', n, dt)
}

let testFilter = () => {

  let f = () => {
    let length = 100000
    let ls = new Int32Array(length)
    let limit = length / 2

    let filter = i => i > 1

    _.each(_.range(length), i => ls[i] = i)

    let f = Array.filter(filter)
    let n = 10

    assert.deepEqual(f(ls), _.filter(ls, filter))

    console.log('\nlodash:')
    timefn(() => _.filter(ls, filter))(n)
    console.log('\nmonadjs:')
    timefn(() => f(ls))(n)
  }

  console.log('Testing filter')
  timefn(f)(2)
  console.log('')
}

let testFind = () => {
  let f = () => {
    let length = 1000000
    let ls = _.range(length)
    let key = ls[length - 1]

    let predicate = i => i === key

    let f = Array.find(predicate)
    let n = 100

    assert.deepEqual(f(ls).get(), _.find(ls, predicate))

    console.log('\nlodash:')
    timefn(() => _.find(ls, predicate))(n)
    console.log('\nmonadjs:')
    timefn(() => f(ls))(n)
  }

  console.log('Testing find')
  timefn(f)(10)
  console.log('')
}

let testFold = () => {
  let f = () => {
    let length = 1000000
    let ls = _.range(length)

    let state = 1337
    let folderf = acc => i => acc + i
    let folderg = (acc, i) => acc + i

    //let f = Array.fold(folderg)(state)
    let f = Monad.fold(Array)(folderg)(state)
    let n = 100

    assert.deepEqual(
      f(ls),
      _.reduce(ls, folderg, state)
    )

    console.log('\nlodash:')
    timefn(() => _.reduce(ls, folderg, state))(n)
    console.log('\nmonadjs:')
    timefn(() => f(ls))(n)
  }

  console.log('Testing fold')
  timefn(f)(10)
  console.log('')
}

testFold()
