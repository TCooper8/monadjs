'use strict'

function List (head, tail) {
  this.head = head
  this.tail = tail
}

const emptyList = new List()

List.ofArray = array => {
  var i = array.length
  var acc = emptyList

  while (i) {
    acc = new List(array[--i], acc)
  }

  return acc
}

List.map = mapping => list => {
  var acc = []
  var head

  while (list !== emptyList) {
    head = list.head
    list = list.tail

    acc.push(mapping(head))
  }

  return List.ofArray(acc)
}

List.toArray = list => {
  var acc = new Array()
  var head

  while (list !== emptyList) {
    head = list.head
    list = list.tail

    acc.push(head)
  }

  return acc
}

module.exports = List
