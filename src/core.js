'use strict'

const Array = require('./array')
const util = require('util')

exports.failwith = msg => {
  throw new Error(msg)
}

console.dir(Array)

let mapObjectToJson = Array.map(o => {
  if (typeof o === 'object') {
    return JSON.stringify(o).replace(/\"/g, ' ')
  }
  return o
})

exports.printfn = function() {
  if (arguments.length === 0) {
    console.log()
  }
  else if (arguments.length === 1) {
    console.log(arguments[0])
  }
  else {
    let format = arguments[0]
    let args = Array.prototype.slice.call(arguments)

    args = mapObjectToJson(args)
    format = format.replace(/%j/g, '%s')

    console.log.apply(null, args)
  }
}

exports.sprintf = function() {
  return util.format.apply(this, arguments)
}
