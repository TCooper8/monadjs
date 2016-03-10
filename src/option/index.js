'use strict'

let somef
let optionf

let failwith = msg => {
  throw new Error(msg)
}

function Some (val) {
  this.get = () => val
}

Some.prototype.isSome = () => true
Some.prototype.isNone = () => false

Some.prototype.map = function(fn) {
  return optionf(fn(this.get()))
}

Some.prototype.flatMap = function(fn) {
  let res = optionf(fn(this.get()))

  if (res.isSome) {
    return res.get()
  }

  return res
}

function None () {}

None.prototype.get = () => {
  failwith('Cannot call .get() from None value.')
}

None.prototype.isSome = () => false
None.prototype.isNone = () => true

None.prototype.map = function() {
  return this
}

None.prototype.flatMap = function() {
  return this
}

somef = v => new Some(v)
const none = new None()

optionf = v => {
  if (v === undefined) {
    return none
  }
  else {
    return new Some(v)
  }
}

optionf.map = fn => option => {
  return option.map(fn)
}

optionf.flatMap = fn => option => {
  return option.flatMap(fn)
}

optionf.some = somef
optionf.none = none

module.exports = optionf
