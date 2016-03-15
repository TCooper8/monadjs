'use strict'

const _ = require('lodash')
const assert = require('assert')
const Monad = require('../src')

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

let testTypecheck = () => {

  let f = () => {
    let length = 1000000
    let ls = new Int32Array(length)

    _.each(_.range(length), i => ls[i] = i)

    let n = 100

    let _g = Monad.Array.map(_.isNumber)

    let f = () => _.map(ls, _.isNumber)
    let g = () => _g(ls)

    assert.deepEqual(
      f(),
      g()
    )

    printfn('lodash = %s')(timefAvg(f)(n))
    printfn('monadjs = %s')(timefAvg(g)(n))

    //console.log('\nmonadjs:')
    //timefn(g)(n)

    //console.log('\nlodash:')
    //timefn(f)(n)
  }

  console.log('Testing filter')
  timefAvg(f)(1)
  console.log('')
}

testTypecheck()
