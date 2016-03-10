'use strict'

const _ = require('lodash')
const Array = require('./array')
const Core = require('./core')

exports.Core = Core
_.defaults(exports, Core)

exports.Array = Array

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

exports.map = type => {
  if (type === Array.constructor) {
    return Array.map
  }
  throw new Error('Unhandled collection type')
}
