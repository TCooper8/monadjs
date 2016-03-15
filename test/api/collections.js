'use strict'

/*
 * This test will ensure that the collections all share a common API.
 * */

const _ = require('../../src')
const assert = require('assert')
const Array = _.Array
const Option = _.Option
const match = _.match

let apiCompl = obj => {
  assert(typecheck(Object)(obj))


}

describe('Testing Array api', () => {

})
