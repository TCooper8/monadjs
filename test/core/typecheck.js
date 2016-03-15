'use strict'

const assert = require('assert')
const _ = require('../../src')

const Core = _.Core
const Array = _.Array

let primitives = {
  'Array': [
    [],
    [ 1, 2, 3 ]
  ],
  '_Array': [
    [],
    [ 1, 2, 3 ]
  ],
  'Boolean': [
    true, false
  ],
  'Buffer': [
    new Buffer(5)
  ],
  'Date': [
    new Date()
  ],
  'Error': [
    new Error()
  ],
  'Function': [
    () => 5,
    function () { }
  ],
  'Map': [
    new Map()
  ],
  'NotObject': [
    new (function F() { })
  ],
  'null': [
    null
  ],
  'Number': [
    1,
    5.5
  ],
  'Object': [
    {},
    { name: 'bob' }
  ],
  'RegExp': [
    new RegExp('j'),
    /j/g
  ],
  'Set': [
    new Set()
  ],
  'String': [
    'hello'
  ],
  'undefined': [
    undefined
  ],
  'WeakMap': [
    new WeakMap()
  ],
  'WeakSet': [
    new WeakSet()
  ]
}

let typeFns = {
  'Array': [].constructor,
  '_Array': Array,
  'Boolean': Boolean,
  'Buffer': Buffer,
  'Date': Date,
  'Error': Error,
  'Function': Function,
  'Map': Map,
  'null': null,
  'Number': Number,
  'Object': Object,
  'RegExp': RegExp,
  'Set': Set,
  'String': String,
  'undefined': undefined,
  'WeakMap': WeakMap,
  'WeakSet': WeakSet
}

let check = (typeKey, unions) => {
  unions || (unions = [])

  let keys = Object.keys(primitives)

  let type = typeFns[typeKey]

  if (typeKey === 'null') {
    assert(type === null, 'Expected type mapping to be null')
  }
  else if (typeKey === 'undefined') {
    assert(type === undefined, 'Expected type mapping to be undefined')
  }
  else {
    assert(!!type, sprintf('Type mapping in test is not defined for %s')(typeKey))
  }

  describe(sprintf('Testing type %s.')(typeKey), () => {
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]
      let values = primitives[key]

      if (key === typeKey || unions.find(k => k === key)) {
        _.map(Array)(val => {
          it(sprintf('Should typecheck true for %s from %A')(typeKey, val), () => {
            assert(typecheck(type)(val), sprintf('Type %s should have been true for %A')(typeKey, val))
          })
        })(values)
      }
      else {
        _.map(Array)(val => {
          it(sprintf('Should typecheck false for %s from %A')(typeKey, val), () => {
            assert(typecheck(type)(val) === false)
          })
        })(values)
      }
    }
  })
}

check('Array', [ '_Array' ])
check('_Array', [ 'Array' ])
check('Boolean')
check('Buffer')
check('Date')
check('Error')
check('Function')
check('Map')
check('null')
check('Number')
check('Object')
check('RegExp')
check('Set')
check('String')
check('undefined')
check('WeakMap')
check('WeakSet')

describe('Testing custom type checking.', () => {
  it('Should typecheck true for this custom type, and false for all others', () => {
    function F() { }

    primitives['F'] = [
      new F()
    ]
    primitives['NotF'] = [
      new (function F() { })
    ]

    typeFns['F'] = F

    check('F')
  })
})
