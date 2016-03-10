'use strict'

const Option = require('./option')

const IArray = [].constructor
function Array() {
  return new IArray.apply(this, arguments)
}

Array.prototype = IArray.prototype
Array.prototype.parent = IArray
Array.constructor = IArray

Array.filter = predicate => array => {
  var i = -1, j = -1
  var length = array.length
  var acc = new array.constructor(length)
  var elem

  while (++i < length) {
    elem = array[i]
    if (predicate(elem)) {
      acc[++j] = elem
    }
  }

  if (j !== length - 1) {
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

Array.map = mapping => array => {
  var i = -1
  var length = array.length
  var acc = new array.constructor(length)

  while (++i < length) {
    acc[i] = mapping(array[i])
  }

  return acc
}

module.exports = Array
