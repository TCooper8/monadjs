'use strict'

const Printf = require('./printf')

let pipe = (f, g) => function() {
  return g(f.apply(this, arguments))
}

exports.bool = function() { return Boolean.apply(this, arguments) }
exports.int = parseInt
exports.number = function() { return Number.apply(this, arguments) }
exports.object = function() { return Object.apply(this, arguments) }

exports.typecheck = thing => {
  if (thing === String) {
    return o => {
      return typeof o === 'string'
    }
  }
  else if (thing === Number) {
    return o => {
      return typeof o === 'number'
    }
  }
  else if (thing === Boolean) {
    return o => {
      return typeof o === 'boolean'
    }
  }
  else if (thing === Object) {
    return o => {
      return typeof o === 'object'
    }
  }
  else if (thing === Function) {
    return o => typeof o === 'function'
  }
  else if (thing === undefined) {
    return o => o === undefined
  }
  else if (thing === null) {
    return o => o === null
  }
  else if (thing === Array) {
    return o => Array.isArray(o)
  }
  else if (thing === Set) {
    return o => o instanceof Set
  }
  else if (thing === WeakSet) {
    return o => o instanceof WeakSet
  }
  else if (thing === Map) {
    return o => o instanceof Map
  }
  else if (thing === WeakMap) {
    return o => o instanceof WeakMap
  }
  else if (thing === Int8Array) {
    return o => o instanceof Int8Array
  }
  else if (thing === Uint8Array) {
    return o => o instanceof Uint8Array
  }
  else if (thing === Uint8ClampedArray) {
    return o => o instanceof Uint8ClampedArray
  }
  else if (thing === Int16Array) {
    return o => o instanceof Int16Array
  }
  else if (thing === Uint16Array) {
    return o => o instanceof Uint16Array
  }
  else if (thing === Int32Array) {
    return o => o instanceof Int32Array
  }
  else if (thing === Uint32Array) {
    return o => o instanceof Uint32Array
  }
  else if (thing === Float32Array) {
    return o => o instanceof Float32Array
  }
  else if (thing === Float64Array) {
    return o => o instanceof Float64Array
  }

  Printf.failwithf(
    'Unmapped type check for %s'
  )(thing)
}

exports.pipe = pipe

exports.not = b => !b

exports.Printf = Printf

;() => {
  let keys = Object.keys(Printf)
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    exports[key] = Printf[key]
  }
}()

;() => {
  let keys = Object.keys(exports)
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    global[key] = exports[key]
  }
}()
