'use strict'

let Printf = require('../src/core/printf')
let util = require('util')

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

let testLogFormat = () => {
  let f = () => {
    let format = '%s %i %x %j %j %j'

    let f = util.format
    let g = Printf.sprintf(format)

    let n = 100000

    console.log(f(format, 'hi', 5, 117, { id: 8 }, { name: 'bob' }, { log: 5 }))
    console.log(g('hi', 'hello', 117, { id: 8 }, { name: 'bob' }, { log: 5 }))


    console.log('util.format')
    timefn(() => util.format(format, 'hi', 5, 117, { id: 8 }, { name: 'bob' }, { log: 5 }))(n)

    console.log('printf')
    timefn(() => g('hi', 'hello', 117, { id: 8 }, { name: 'bob' }, { log: 5 }))(n)
  }

  f()
}

timefn(testLogFormat)(1)
