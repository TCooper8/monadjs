'use strict'

const Array = require('../array')
const Option = require('../option')
const Core = require('../core')

function Match() {
  let ruleChain = []
  let methodChain = []

  let self = val => {
    var length = ruleChain.length
    var i = -1
    var rule
    var method
    var res

    while (++i < length) {
      rule = ruleChain[i]
      method = methodChain[i]
      res = rule(val)

      if (res.isSome()) {
        return method(res.get())
      }
    }

    failwith('Unable to match value to expression')
  }

  self.equals = expect => {
    let rule = value => {
      return expect === value ?
        Option.some(expect) :
        Option.none
    }

    return mapping => {
      ruleChain.push(rule)
      methodChain.push(mapping)

      return self
    }
  }

  self.type = _type => {
    let predicate = value => {
      return typecheck(_type)(value) ?
        Option.some(value) : Option.none
    }

    return mapping => {
      ruleChain.push(predicate)
      methodChain.push(mapping)

      return self
    }
  }

  self.has = key => {
    let rule = obj => {
      let res = obj[key]

      if (res !== undefined) {
        return Option(obj)
      }
      return Option.none
    }

    return mapping => {
      ruleChain.push(rule)
      methodChain.push(mapping)

      return self
    }
  }

  self.get = key => {
    let rule = obj => {
      let res = obj[key]

      if (res !== undefined) {
        return Option(res)
      }
      return Option.none
    }

    return mapping => {
      ruleChain.push(rule)
      methodChain.push(mapping)

      return self
    }
  }

  self.any = mapping => {
    ruleChain.push(o => Option.some(o))
    methodChain.push(mapping)

    return self
  }

  return self
}

module.exports = () => new Match()
