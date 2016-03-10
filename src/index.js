'use strict'

const _ = require('lodash')
const _Array = [].constructor
const Array = require('./array')
const Core = require('./core')

_.defaults(exports, Core)

exports.fold = type => {
  //if (type === Array || type === _Array) {
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

exports.not = b => !b

exports.compose = (f, g) => function() {
  // Evaluate f and pipe the result to g.
  return f(g.apply(this, arguments))
}

exports.getNested = _.get

exports.isArray = Array.isArray

exports.isFunction = _.isFunction

exports.isString = _.isString
