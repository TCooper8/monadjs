'use strict'

const util = require('util')

const fboolTok = '%b'
const fstrTok = '%s'
const fintTok = '%i'
const fnumTok = '%d'
const fobjTok = '%j'

let isWhitespace = char => {
  return false
    || char === ' '
    || char === '\t'
    || char === '\n'
    || char === '\r'
}

let genArgRuleFromFormat = (tok, ruleIndex) => {
  switch (tok) {
  case fintTok:
    return args => {
      let arg = args[ruleIndex]
      return parseInt(arg).toString()
    }

  case fobjTok:
    return args => {
      let obj = args[ruleIndex]
      return JSON.stringify(obj).replace(/\"/g, ' ')
    }

  case fboolTok:
  case fstrTok:
  case fnumTok:
    return args => {
      let arg = args[ruleIndex]
      return arg.toString()
    }

  default:
    throw new Error(util.format(
      'InvalidFormat: %s is an invalid format token.',
      tok
    ))
  }
}

let genFormatFn = (rules, endFormatIndex) => function() {
  let acc = new Array(rules.length)
  // Just run all of the rules with arguments as a parameter.
  for (let i = 0; i < rules.length; i++) {
    acc[i] = rules[i](arguments)
  }

  if (arguments.length > endFormatIndex) {
    let rest = Array.prototype.slice.call(arguments, endFormatIndex)

    return acc.join('') + ' ' + rest.join(' ')
  }
  return acc.join('')
}

function StringFormat (format) {
  // Run through the format and tear out the pieces.
  let acc = ''
  let ruleAcc = []
  let argIndex = -1

  for (let i = 0; i < format.length; i++) {
    let c = format[i]
    if (c === '%') {
      // Start of a sequence, add the acc to the rule.
      let seq = '' + acc
      acc = ''

      ruleAcc.push(() => {
        return seq
      })

      // Start of a format token.
      // This will increment the argIndex.
      c = format[++i]
      if (c === undefined) {
        throw new Error(util.format(
          'InvalidFormat: Expected format token after %:%s',
          i - 1
        ))
      }

      ruleAcc.push(genArgRuleFromFormat('%' + c, ++argIndex))
    }
    else {
      acc += c
    }
  }

  // Add the rest of the format string to the formatter.
  ruleAcc.push(() => {
    return acc
  })

  return genFormatFn(ruleAcc, ++argIndex)
}

let format = StringFormat('info = %j and name = %s')

let formatf = fn => format => {
  let formatter = StringFormat(format)

  return function () {
    return fn.call(this, formatter.apply(this, arguments))
  }
}

/*
 *  formatf: (string -> 'a) -> format<'T> -> 'T
 *  Pipes the result of a formatted string to a function.
 * */
exports.formatf = formatf

/*
 * Prints formatted output to stderr.
 * */
exports.eprintfn = formatf(console.error)

/*
 *  Printfs to a string buffer and raises an exception with the given result.
 * */
exports.failwithf = formatf(msg => {
  throw new Error(msg)
})

exports.failwith = function() {
  let err = Error.apply(this, arguments)
  throw err
}

exports.printfn = formatf(console.log)

exports.sprintf = formatf(msg => msg)
