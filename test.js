const {HashMap} = require('./function.js')

const test = new HashMap() // or HashMap() if using a factory
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.arr)
console.log(test.length / test.capacity)

test.set('lion', 'goldenLionlah')
test.set('kite', 'kiteLah')
console.log(test.arr)

test.set('moon', 'silver')
console.log(test.arr)

test.set('jacket', 'bluelah')
test.set('moon', 'silverLah')
console.log(test.arr)

console.log(test.get("jacket"))
console.log(test.get("moon"))

console.log(test.has("jacket"))
console.log(test.has("jacket2"))
console.log(test.has("moon"))

test.remove('moon')
test.remove('jacket')
console.log(test.has("moon"))
console.log(test.has("jacket"))

console.log(test.arr)

console.log(test.keys())
console.log(test.values())
console.log(test.entries())

console.log('-------------')
// test.clear()
// console.log(test.arr)






