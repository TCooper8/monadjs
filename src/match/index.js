'use strict'

const Option = require('../option')

let failwith = msg => {
  throw new Error(msg)
}

let typePredicate = _type => {
  switch (_type) {
  case String:
  case Object:
  case Number:
    return val => {
      if (val === undefined) {
        return Option.none
      }
      else if (val.constructor === _type) {
        return Option(val)
      }
      else {
        return Option.none
      }
    }

  default:
    failwith('Type cannot be resolved')
  }
}

function Match (onSome, onNone) {
  this.onSome = onSome
  this.onNone = onNone
}

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

  self.type = _type => {
    let predicate = typePredicate(_type)

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

let match = () => new Match()

let f = match()
  .type(String)(filename => {
    console.log(filename)
  })
  .type(Number)(i => f('' + i))
  .get('name')(name => f(name))
  .has('name')(obj => f(obj.name))


let g = match()
  .has('name')(match()
    .type(Object)(match()
      .get('name')(match()
        .type(String)(name => {
          console.log('name = %s', name)
        })
        .type(Number)(id => g({ name: '' + id }))
      )
    )
    .any(() => failwith('Expected Object'))
  )
  .any(() => failwith('Expected object to contain name.'))


g({ name: 'bob' })
