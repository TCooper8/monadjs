'use strict'

const core = require('./core')

const failwith = core.failwith

let optionf = undefined

function Some(val) {
  this.get = () => val
}

Some.prototype.isSome = () => true
Some.prototype.isNone = () => false

Some.prototype.map = function(mapping) {
  return optionf.map(mapping)(this)
}

function None() { }

None.prototype.isSome = () => false
None.prototype.isNone = () => true

None.prototype.get = () => failwith(
  'Cannot call get() from None value.'
)

None.prototype.map = function() { return this }

const none = new None()

optionf = val => {
  return val === undefined ? none : new Some(val)
}

optionf.some = val => new Some(val)
optionf.none = none

optionf.bind = binder => option => {
  return option.isNone() ?
    option :
    binder(option.get())
}

optionf.count = option => {
  return option.isNone() ?
    0 :
    1
}

optionf.exists = predicate => option => {
  return option.isNone() ?
    false :
    predicate(option.get())
}

optionf.fold = folder => state => option => {
  return option.isNone() ?
    state :
    folder(state)(option.get())
}

optionf.foldBack = optionf.fold

optionf.every = predicate => option => {
  return option.isNone() ?
    false :
    predicate(option.get())
}

optionf.get = option => {
  return option.get()
}

optionf.isNone = option => option.isNone()

optionf.isSome = option => option.isSome()

optionf.each = action => option => {
  if (option.isSome()) {
    action(option.get())
  }
}

optionf.map = mapping => option => {
  return option.isNone() ?
    option :
    optionf(mapping(option.get()))
}

optionf.flatMap = mapping => option => {
  if (option.isSome()) {
    let res = optionf(mapping(option.get()))

    while (res instanceof Some && res.get() instanceof Some) {
      res = res.get()
    }

    return res
  }

  return option
}

optionf.toArray = option => {
  return option.isNone() ?
    [] :
    [ option.get() ]
}

module.exports = optionf
