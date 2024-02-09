// --------------------------------------------------------------
// Object destructuring

const obj = {foo:'bar', baz:'qux'};
const {foo, baz} = obj;
console.log(baz); // qux

const {A, B} = obj;
console.log(a); // undefined

const {foo: f, baz: b} = obj;
console.log(f); // bar



// --------------------------------------------------------------
// An object cannot have property names that contain a space.
// 



// --------------------------------------------------------------
const arr1 = new Array('hello world'); 
console.log(arr1); // [ 'hello world' ]

// In python, list.extend()
// my_list = [1, 2, 3]
// my_string = "Hello"
// my_list.extend(list(my_string))
// my_list; // [1, 2, 3, 'H', 'e', 'l', 'l', 'o']


// --------------------------------------------------------------
const arr = [1, 2, 3];
arr.foo = 4;
console.log(arr.foo); // 4
// because arrays are also objects

