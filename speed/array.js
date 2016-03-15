'use strict'

//const Array = require('../src/array')
const Monad = require('../src/index')
const _ = require('lodash')
const assert = require('assert')

let timef = f => {
  var ti = new Date()
  f()
  var tf = new Date()

  return (tf - ti) / 1000.0
}

let timefAvg = f => n => {
  let add = (a, b) => a + b

  let sum = Monad
    .fold(Array)
    (add)
    (0)
    (Monad.map(Array)(() => timef(f))(_.range(n)))

  return sum
}

let testFilter = () => {

  let f = () => {
    let length = 5000000
    let ls = new Array(length)
    let limit = length / 2

    let filter = i => i < limit

    _.each(_.range(length), i => ls[i] = i)

    let n = 100

    let f = () => _.filter(ls, filter)

    let _g = Monad.Array.filter(filter)
    let g = () => _g(ls, limit)
    //let g = () => Monad.Array.filter(filter)(ls, 0)

    assert.deepEqual(f(), g())

    printfn('lodash = %s')(timefAvg(f)(n))
    printfn('monadjs = %s')(timefAvg(g)(n))
  }

  timefAvg(f)(1)
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
    //let ls = 'hello world!'

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

testFilter()
