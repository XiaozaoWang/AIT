// Objects
// : An arbitrary collection of properties and their values
// Analogy in other languages: Dictionary, Hash, Map, Associative Array


// ------------------------------
// Creating an object
const obj = {};
obj.x = 1;
const obj2 = new Object();
const point = {x: 1, y: 2};
// shorthand way (already defined variables)
const x = 1;
const y = 2;
const point2 = {x, y};
console.log(point2); // {x: 1, y: 2} {property: value}


// ------------------------------
// Destructuring object properties
const person = {
    name: 'John',
    age: 20,
    address: {
        street: '123 Main St',
        city: 'New York'
    }
};
const {name, age, address: {city}} = person;
console.log(name, age, city); // John 20 New York
console.log(address); // undefined
const {n, a} = person; // undefined undefined
const {name: n, age: a} = person; 
console.log(n, a); // John 20
// * The variable name while destructuring must match the object property name!!! *


// ------------------------------
// property can contain value / function(then it is called method)
// nearly all javascript values have properties
// string.length, function.name, console.log, etc.

// ------------------------------
// dynamic property names
const propertyName = 'x';
const point3 = {['my_' + propertyName]: 1};
console.log(point3); // {my_x: 1}



// ------------------------------
// Accessing properties
point.x; // 1
point['x']; // 1 (property name is a string)
point3['my_' + propertyName]; // 1 (allows dynamic property names)

// ------------------------------
//casting object to string (this will cause problems)
const obj3 = {x: 1};
console.log(obj3.toString()); // [object Object]
console.log(String(obj3)); // [object Object]


// ------------------------------
// Dot notation vs bracket notation
// [Dot] You have to know the property name and use it *directly* with the dot notation.
// [Bracket] The string or expression inside the brackets is evaluated, 
// and its result is used as the property name.
const x = 100;
const point = {x, y:100, z: 101};
for (const prop in point) {
     console.log(prop, typeof(prop), point[prop], point.prop)
} // point.prop is undefined because prop is not a known property.
console.log(point.x); // works because x is a valid identifier
const p = "x";
console.log(point.p); // undefined
console.log(point[p]); // 100


// ------------------------------
// Object.entries()
const point4 = {x:100, y:101, z: 102};
Object.entries(point4); // [['x', 100], ['y', 101], ['z', 102]]

// ------------------------------
// Wrong. to iterate over arrays, you cannot use "in"
for (const e in Object.entries(point4)) {
    console.log(e)
} // WRONG!!!!!!

// right. "of"
for (const e of Object.entries(point4)) {
    console.log(e);
} // ['x', 100]\n ['y', 101]\n ['z', 102]

// right. (destructuring)
for (const [prop, val] of Object.entries(point4)) {
    console.log(prop, val);
} // x 100\n y 101\n z 102

// Note that destructuring of arrays is different from objects.
// For objects, the variable name must match the property name.
// For arrays, the variable name doesn't have to match.


// ------------------------------

// another method for iterating through array
const nums = [2,4,6];
nums.forEach(n => console.log(n)); // arrow function
nums.forEach(function(n) { console.log(n)}); // ananymous function
// forEach() will lead to a call-back FUNCTION. (each element is the input)

// callback function through forEach()!!!
function logSquare(n) {
    console.log(n*n)
}
nums.forEach(logSquare()) // wrong, undefined
// Here, it treats logSquare as a function call rather than passing the function itself as a callback.
nums.forEach(logSquare) // right




// ---------------------------------------------------------

// ------------------------------
// Methods
// : A function that is a property of an object

// 1
const obj4 = {};
function f() {
    console.log('f');
}
obj4.log = f;

// 2
const obj5 = {
    log: function() {
        console.log('f')
    },
    log2() {console.log('f2');}, // shorthand (ES6)
};

// 3
const obj6 = {};
obj6.log = function() {
    console.log('f');
}
obj6.sqr = (x) => x*x;

// ------------------------------
// this, different ways of declaring methods
{
const person = {
    first: 'John',
    sayHi: function(target) {console.log(this.first, "says hi to", target)},
    sayBye(target) {
        console.log(this.first, "says bye to", target)
        }
}
person.sayHi('you');
person.sayBye('you');
}

// ------------------------------
// Reading, writing, deleting properties
const obj7 = {};
console.log(obj7.x); // *undefined*
obj7.x = 1;
console.log(obj7.x); // 1
delete obj7.x;
console.log(obj7.x); // undefined

// !!
obj7.p1 = 1; // correct
obj7[p1] = 1; // ReferenceError: p1 is not defined
obj7['p1'] = 1; // correct



// ------------------------------
// determine if a property exists
const obj8 = {x: 1};

// 1: Object.hasOwn()
console.log(Object.hasOwn(obj8, 'x')); // true (remember to use quotes!)
console.log(Object.hasOwn(obj8, 'y')); // false
// 2: in operator
console.log('x' in obj8); // true
console.log('y' in obj8); // false



// ------------------------------
// mutability
// 1. object is mutable
// 2. primitive *values* are immutable
// why: when you change the value of a variable, 
// you are creating a new value and assigning it to the variable
// but not changing the value itself


// ------------------------------
// *** copying objects ***
// !!!!
const a = {foo:1, bar:2};
const b = a;
b.foo = 1.1;
b.baz = 3;
console.log(a); // {foo: 1.1, bar: 2, baz: 3}
// a and b are references to the same object.

// shallow copy
const c = Object.assign({}, a);
// what does object.assign do?
// 1. create a new object
// 2. copy all properties from a to the new object
// 3. return the new object
c.foo = 1.2;
c.baz = 4;
console.log(a); // {foo: 1.1, bar: 2, baz: 3}
console.log(c); // {foo: 1.2, bar: 2, baz: 4}
// drawback: only copies properties at the top level
// if the property is an object, it will copy the reference
// analogy in python: copying a list of lists


// ------------------------------
// looping over properties
// 1. for...in
const obj9 = {};
for (let i = 0; i < 5; i ++) {
    obj9["p" + i] = i;
} // !!!! you cannot use 'const' here!!! i needs to be mutable
console.log(obj9); // {p0: 0, p1: 1, p2: 2, p3: 3, p4: 4}
for (const p in obj9) {
    console.log(p); // p0, p1, p2, p3, p4
    console.log(obj9[p]); // 0, 1, 2, 3, 4
}

// 2. Object.entries()
for (const [prop, val] of Object.entries(obj9)) {
    console.log(prop + ": " + val);
}

    
// ------------------------------
// chaining
// Exersise: method getData() returns an array, 
// and we want to pop the last element of the returned array using chaining
const arr = [1, 2, 3];
const obj10 = {
    getData() {
        return arr;
    }
}
const result = obj10.getData().pop(); // 3
arr; // [1, 2]


// Copying object *properties*
// 1. Object.assign()   (shallow copy)
const A = {x: 1};
const B = {y: 2};
// Object.assign(target, source1, source2, ...)
const C = Object.assign({}, A); // C > {x: 1}
const D = Object.assign(B, C); // D > {y: 2, x: 1}

// 2. spread operator (shallow copy)
const E = {...D, z:3}; // {y: 2, x: 1, z: 3}   
// **Can also be used for concatenating two objects/arrays

// 3. JSON.parse(JSON.stringify()) (deep copy)
const F = JSON.parse(JSON.stringify(E)); // {y: 2, x: 1, z: 3}

// stringify(value) - returns a JSON string representation of the value passed in
// parse(text) - returns an object created from the supplied JSON text
// e.g.
const obj11 = {x: 1, y: 2};
const json = JSON.stringify(obj11); // '{"x":1,"y":2}'
const obj12 = JSON.parse(json); // {x: 1, y: 2}


// ---------------------------------------------------------
// The [rest] and [spread] operators

// ------------------------------
// rest operator
// : gathers all remaining arguments into an *array*

// 1. function parameters (captures multiple function arguments as an array)
const add = (...args) => {
    console.log(args);
}
add(1,2,3,4,5); // [1,2,3,4,5]

// 2. destructuring (captures remaining elements in an array into a new array)
const numbers = [1, 2, 3, 4, 5];
const [a, b, c, d, e] = numbers; // a > 1, b > 2, c > 3, d > 4, e > 5
const [first, second, ...rest] = numbers;
console.log(first); // Output: 1
console.log(second); // Output: 2
console.log(rest); // Output: [3, 4, 5]

// ------------------------------
// spread operator
// : expands an array into individual elements
const numbers = [1, 2, 3];
const newArray = [...numbers, 4, 5];
console.log(newArray); // Output: [1, 2, 3, 4, 5]

// Example
const arr = ['100', 2];
parseInt(...arr); // 100