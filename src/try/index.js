'use strict'

let successf
let failuref
let tryf

let failwith = msg => {
  throw new Error(msg)
}

function Success (val) {
  this.get = () => val
}

Success.prototype.getExn = () => {
  failwith('Cannot call .getExn() from Success value.')
}

Success.prototype.isSuccess = () => true
Success.prototype.isFailure = () => false

Success.prototype.map = function(fn) {
  return tryf(() => fn(this.get()))
}

Success.prototype.flatMap = function(fn) {
  let res = tryf(() => fn(this.get()))

  if (res.isSuccess) {
    return res.get()
  }
  return res
}

function Failure (exn) {
  this.getExn = () => exn
}

Failure.prototype.get = () => {
  failwith('Cannot call .get() from Failure value.')
}

Failure.prototype.isSuccess = () => false
Failure.prototype.isFailure = () => true

Failure.prototype.map = function() {
  return this
}

Failure.prototype.flatMap = function() {
  return this
}

successf = v => new Success(v)
failuref = v => new Failure(v)

tryf = fn => {
  try {
    return successf(fn())
  }
  catch (err) {
    return failuref(err)
  }
}

tryf.map = fn => {
  return _try => _try.map(fn)
}

tryf.flatMap = fn => {
  return _try => _try.flatMap(fn)
}

tryf.success = successf

tryf.failure = failuref

module.exports = tryf
