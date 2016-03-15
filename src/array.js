'use strict'

const Option = require('./option')
const Core = require('./core')

const IArray = [].constructor

function Array() {
  return IArray.apply(this, arguments)
}

Array.prototype = IArray.prototype
Array.prototype.parent = IArray
Array.constructor = IArray

let filter = (array, predicate, precache) => {
  precache || (precache = 0)
  var i = -1,
      j = -1,
      length = array.length,
      acc = new array.constructor(precache)

  while (++i < length) {
    var elem = array[i]
    if (predicate(elem)) {
      acc[++j] = elem
    }
  }

  if (j < precache - 1) {
    return acc.slice(0, j + 1)
  }

  return acc
}

Array.filter = predicate => (array, precache) => {
  if (!Core.isArray(array)) {
    throw new Error('Expected array')
  }

  precache || (precache = array.length / 2)
  var i = -1,
      j = -1,
      length = array.length,
      acc = new array.constructor(precache)

  while (++i < 100000) {

  }
  i = -1

  while (++i < length) {
    var elem = array[i]
    if (predicate(elem)) {
      acc[++j] = elem
    }
  }

  if (j < precache - 1) {
    return acc.slice(0, j + 1)
  }

  return acc
}

Array.find = predicate => array => {
  var i = -1
  var length = array.length
  var elem

  while (++i < length) {
    elem = array[i]
    if (predicate(elem)) {
      return Option.some(elem)
    }
  }

  return Option.none
}

Array.findIndex = predicate => array => {
  var i = -1
  var length = array.length
  var elem

  while (++i < length) {
    elem = array[i]
    if (predicate(elem)) {
      return i
    }
  }

  return -1
}

Array.fold = folder => state => array => {
  if (!Array.isArray(array)) {
    throw new Error('Expected array')
  }

  var i = -1
  var length = array.length
  var acc = state

  var elem

  while (++i < length) {
    elem = array[i]
    acc = folder(acc, elem)
  }

  return acc
}

Array.isArray = o => {
  return IArray.isArray(o)
}

let doMap = (array, mapping) => {
  var i = -1
  var length = array.length
  var acc = new array.constructor(length)

  while (++i < length) {
    acc[i] = mapping(array[i])
  }

  return acc
}

Array.map = mapping => array => {
  //var mapping = _mapping
  var i = -1
  var length = array.length
  var acc = new array.constructor(length)

  while (++i < length) {
    acc[i] = mapping(array[i])
  }

  return acc
}

//Array.map = mapping => array => {
//  return doMap(array, mapping)
//}

module.exports = Array
