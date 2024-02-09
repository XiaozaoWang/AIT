// --------------------------------------------
// Defining a function
// 1. function declaration
function add(a,b) {
    return a + b;
}

// 2. function expression ( = function(){} )
const add = function(a,b) {
    return a + b;
}
console.log(add(1,2)); // 3
// As the name suggests, a function expression is an expression!
function f() {
    return function(n) { 
        return n + n; 
    };
}
f()(3); // 6
// "f()" returns a function, and then we call that function with 3 as an argument.

// 3. arrow function
const add = (a,b) => {
    return a + b;
}

const inc = x => x + 1;
console.log(inc(99));


// ----------------------------
// Function return
// If no return, *undefined* is returned


// ----------------------------
// Optional arguments
// p.s. if f(a,b) is called with insufficient arguments, the missings are undefined

// 1. rest parameters (choose this over no.2!)
// use the rest operator for indefinite number of arguments

// 2. Arguments object (also for indefinite number of arguments)
const f = function() {
    console.log("number of args " + arguments.length);
    for (let i = 0, j = arguments.length; i < j; i++) {
        console.log(arguments[i]);
        console.log(typeof(arguments)); // object, not an array
    }
};
f(1, 2, 3); // 1, 2, 3

// 3. default parameters
// A brand new object is created every time the function is called.
function extraSauce(condiments = []) {
	condiments.push('ketchup');
	console.log(condiments);
}
extraSauce() // ['ketchup']
extraSauce() // still just ['ketchup']

// look at this e.g.
function foo(a, b = 'it me!', c) {
	console.log(a, b, c);
}
foo(1)        // 1 'it me!' undefined
foo(1, 2)     // 1 2 undefined
foo(1, 2, 3)  // 1 2 3
foo(1, undefined, 3)  // 1 'it me!' 3 (The value, undefined, is what actually triggers the default value)
// So in foo(1,2), what is actually passed in is (1,2,undefined).




// ----------------------------
// Closure
// A closure gives you access to an outer function's scope from an inner function,
// even after the outer function has finished executing. (returned)
let gimmeFunction = function() {
	let a = "I'm in here!";
	return function() {
		console.log(a);
	}
}
let myFunction = gimmeFunction();
myFunction(); // I'm in here!


function makeAdder(a1) {
    return function(a2) {
        return a1 + a2;
    }
}

let addTwo = makeAdder(2);
console.log(addTwo(5)); // 7




// ----------------------------
// Complicated examples

// 1. map()
// It iterates through an array and applies a function to each element.
// It returns a "transformed" array.
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map((number) => {
  return number * number;
});
console.log(squaredNumbers);
// Output: [1, 4, 9, 16, 25]

// Exercise: write a high-order mapping function




// 2. Functions as arguments
const callTwice = function(f) {
	f();
	f();
};

const g = function() {
	console.log("nobody's home!");
};
callTwice(g);
// Output:
// nobody's home!\n nobody's home!


// 3.
let g = 7;
function f() {
    g = 5;
    function g() {}
}
f();
console.log(g);
// Output: 7
// Explanation:
// The function g is hoisted to the top of the function f,
// the assignment g = 5 inside the f function refers to the g function declaration that was hoisted, 
// not the outer variable g.

// A testing snippet:
let g = 7;
function f() {
    console.log(typeof(g),g);
    g = 5;
    function g() {}
    console.log(typeof(g),g);
}
f();
console.log(g);
// Output:
// function [Function: g]
// number 5
// 7
