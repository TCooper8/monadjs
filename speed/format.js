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
    let format = '%s %s %x %j %j %j'
    let args = [ 'hi', 5, 117, { id: 8 }, { name: 'bob' }, { log: 5 } ]

    let f = Printf.sprintf(format)
    let gArgs = [ format ].concat(args)

    let n = 1000000

    console.log(util.format.apply(null, gArgs))
    Printf.printfn(format).apply(null, args)

    console.log('console')
    timefn(() => util.format.apply(null, gArgs))(n)
    console.log('printf')
    timefn(() => f.apply(null, args))(n)
  }

  f()
}

timefn(testLogFormat)(10)
