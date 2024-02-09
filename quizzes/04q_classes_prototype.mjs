
// 1.
// What does 'this' refer to when you invoke a function by using the
// keyword, new (that is, use a function as a constructor)? For example:

const obj = {x: 123, foo: foo};
function foo() {
    console.log(this);
}
const f = new foo(); // new -> 'this' is an empty object, {}

// Ans: an empty object


// 2.
// What does this refer to when you invoke a function as a method (that is, 
// you call a function from an object)? For example:

const o = obj.foo(); // 'this' is the object that the function was called on

// Ans: the object that the function was 'called on'


// 2.5.
// What does 'this' refer to when you use the call method on a function object

function foo() {
    console.log(this);
}
const obj = {x: 123, foo: foo};
foo.call(obj);

// Ans: an object that this is explicitly set to by the caller



// ***3.
// What is the most complete and correct reason why the code above outputs: 'this is a game'? 
// Assume that [[prototype]] means the object that another object is linked to, not the actual prototype property.

// A: Because the object x has an own property called game.
// B: Because the [[prototype]] of TypeA has a property called game.
// C: 'this is a game' is not printed at all!
// D: Because the [[prototype]] of the object x has a property called game.
function TypeA() {
    this.value = 'this is a value';
}
    
TypeA.prototype.game = "this is a game";
const x = new TypeA();
console.log(x.game);

// Ans: D
// Wrong ans: B
// TypeA is a constructor function which returns an object on call with 'new'.
// The prototype of object x is TypeA.prototype (the 'prototype object' of function TypeA).
// It is not the prototype of TypeA itself that has the property game, but the prototype of the object x that has the property game.
// Also, "TypeA.prototype" is not "TypeA's prototype".

// ***Checking:***
console.log(Object.getPrototypeOf(x) === TypeA.prototype);
console.log(Object.getPrototypeOf(TypeA) === Function.prototype);



// 4.
// What is the javascript keyword to check if an [1, 2, 3] was derived from an Array? 
// (or specifically, an object was derived from a constructor?) 
// Fill in the javascript keyword / operator in the blank. 
// Hint: this is not a function - it's binary, infix operator.

// Ans: instanceof



// 5.
// When we call 'toString()' on arrays like [1, 2], 
// the Object.prototype.toString() method is called. 

// A: false. It's the Array.prototype.toString() method that is called.