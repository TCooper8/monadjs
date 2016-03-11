'use strict'

const _ = require('lodash')
const Array = require('./array')
const match = require('./match')
const Core = require('./core')
const Option = require('./option')

exports.Core = Core
_.defaults(exports, Core)

exports.Array = Array
exports.match = match
exports.Option = Option

exports.fold = type => {
  if (type === Array.constructor) {
    return Array.fold
  }
  throw new Error('Unhandled collection type')
}

exports.find = type => {
  if (type === Array.constructor) {
    return Array.find
  }
  throw new Error('Unhandled collection type')
}

exports.filter = type => {
  if (type === Array.constructor) {
    return Array.filter
  }
  throw new Error('Unhandled collection type')
}

exports.map = match()
  .equals(Array)(() => Array.map)
  .equals(Array.prototype.parent)(() => Array.map)
  .any(() => failwith('Unhandled collection type'))
