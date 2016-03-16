'use strict'

const Printf = require('./printf')

function Union () {
  let types = Array.prototype.slice.call(arguments)
  let checks = new Array(types.length)

  for (let i = 0; i < types.length; i++) {
    checks[i] = typecheck(types[i])
  }

  let isType = other => {
    if (other === undefined || other === null) {
      return false
    }

    if (!other.prototype || other.prototype.parent !== Union) {
      return false
    }

    for (let i = 0; i < types.length; i++) {
      let check = checks[i]
      let val = other.get(i)

      if (!check(other.get(i))) {
        return false
      }
    }

    return true
  }

  let NewType = function () {
    let values = Array.prototype.slice.call(arguments)

    for (let i = 0; i < values.length; i++) {
      let value = values[i]
      let check = checks[i]
      if (!check(value)) {
        Printf.failwithf('Cannot constructor Union, expected argument %s to be %A, but got %A')
        (i, types[i], value)
      }
    }

    this.get = i => values[i]

    this.toString = () => {
      return [
        '(',
        values.join(', '),
        ')'
      ].join('')
    }

    this.isType = isType

    this.prototype = {}
    this.prototype.parent = Union
  }

  NewType.prototype = { }
  NewType.prototype.parent = Union

  NewType.isType = isType

  return NewType
}

let pipe = (f, g) => function() {
  return g(f.apply(this, arguments))
}

exports.Union = Union

exports.bool = function() { return Boolean.apply(this, arguments) }
exports.int = parseInt
exports.number = function() { return Number.apply(this, arguments) }
exports.object = function() { return Object.apply(this, arguments) }

let typecheck = thing => {
  //console.log('typecheck for %s', thing)
  let origin = thing
  let hasUnionParent = false

  if (!!thing && !!thing.prototype && thing.prototype.parent !== undefined) {
    //console.log('typecheck has parent %s', thing.prototype.parent)
    thing = thing.prototype.parent
    if (thing === Union) {
      hasUnionParent = true
    }
  }

  if (thing === Array) {
    return o => Array.isArray(o)
  }
  else if (hasUnionParent) {
    return origin.isType
  }
  else if (thing === Union) {
    //console.log('Typecheck for union')
    return o => !!o && !!o.prototype && o.prototype.parent === Union
  }
  else if (thing === Boolean) {
    return o => typeof o === 'boolean'
  }
  else if (thing === Buffer) {
    return Buffer.isBuffer
  }
  else if (thing === String) {
    return o => typeof o === 'string'
  }
  else if (thing === Number) {
    return o => typeof o === 'number'
  }
  else if (thing === Date) {
    return o => !!o && o.constructor === Date
  }
  else if (thing === Error) {
    return o => !!o && o.constructor === Error
  }
  else if (thing === Object) {
    return o => !!o && o.constructor === Object
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
  else if (thing === RegExp) {
    return o => !!o && o.constructor === RegExp
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
  else {
    return o => !!o && (o instanceof thing || o.constructor === thing)
  }
}

exports.isArray = typecheck(Array)

exports.isBoolean = typecheck(Boolean)

exports.isString = typecheck(String)

exports.isBuffer = typecheck(Buffer)

exports.isDate = typecheck(Date)

exports.isError = typecheck(Error)

exports.isFunction = typecheck(Function)

exports.isNull = typecheck(null)

exports.isNumber = typecheck(Number)

exports.isObject = typecheck(Object)

exports.isPlainObject = typecheck

exports.typecheck = typecheck

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
