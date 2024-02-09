
// ///////////////////////////////////////////////////////////////////////////////////////

// variable declaration methods
// const, let, var

// ///////////////////////////////////////////////////////////////////////////////////////


// ------------------------------
// Declaration
const foo; // !! SyntaxError: Missing initializer in const declaration
let bar; // undefined
var baz; // undefined

// Redeclaration (will cause error for [let] and [const])
let first = 1;
let first = 2; // SyntaxError: Identifier 'first' has already been declared
var s = 1;
var s = 2; // No error


// ------------------------------
// Scope
// [const] and [let] are block-scoped {} , [var] is function-scoped
console.log('out there');
{
   const s = 'in here'; 
}
console.log(s); // ReferenceError: s is not defined

// If declared without [var], [let], [const], it will be global
// (which is not recommended)
// Actually, the interpreter will look up the scope chain 
// until it finds that variable or hits the global scope 
// (at which point it will create it)

// ------------------------------
// Declaration in loop expressions
for(const i = 0; i < 4; i++) {
    console.log(i);
} // TypeError: Assignment to constant variable.

for(let i = 0; i < 10; i++) { 
    const j = i * 2;
    console.log(j);
} // Here, although we seem to redeclare const j in each iteration, 
// It's a new scope each time, so it's OK.


// ------------------------------
// Reassignment
// [const] can't be reassigned a different value after it had been declared
const dontChangeMe = "I told you so";
dontChangeMe = "why not?"; // TypeError: Assignment to constant variable.
// However, if the const declared variable is mutable (e.g. object), it can be mutated anyway.

// [let] and [var] can be reassigned




// ///////////////////////////////////////////////////////////////////////////////////////

// Hoisting, TDZ

// ///////////////////////////////////////////////////////////////////////////////////////

// ------------------------------
// hoisting
// :Js's default behavior of moving declarations to the top (of the current SCOPE) 
// A declaration is a way of telling the interpreter/compiler that a name or identifier exists
// But!!! only declarations are hoisted, not initializations.
f();
var f = function() {
    console.log("TO THE TOP, PLZ!");
} // TypeError: f is not a function
// declaration (var f) is hoisted and initialized as "undefined",
// but reassignment (f = function) is not yet done.
// So, you can't call it as a function.

g(); // ReferenceError: g is not defined

h();
function h() {
    console.log("TO THE TOP, PLZ!");
} // this is OK because function declarations are hoisted



// ------------------------------
// Temporal dead zone
// : the TIME between entering a scope and a variable being DECLARED
// Only [let] and [const] have TDZ!!!!
// [var] is not affected by TDZ (let's see)

{
    console.log(a);
    let a = 1;
} // ReferenceError: Cannot access 'a' before initialization

{
    console.log(a);
    var a = 1;
} // No error, 
// prints "undefined"

// Explanation: 
// [var] is hoisted and automatically initialized to undefined,
// [let/const] are kind of hoisted, but not initialized with any value.
// So, it will throw an error when you try to access it in its TDZ (before they are actually declared)
// [let/const] must be initialized(defined) before accessing it.
// But [var] doesn't have to.

// Also, function hoisting:
// A formally declared function is hoisted *along with its definition*.
// (But function expressions are not hoisted.)



// ///////////////////////////////////////////////////////////////////////////////////////

// Exercises

// ///////////////////////////////////////////////////////////////////////////////////////


// 1.
let x;
console.log(x); // undefined

// 2.
console.log(x);
let x; // ReferenceError: Cannot access 'x' before initialization

// 3.
console.log(x);
var x; // undefined

// 4.
f(5); 
var f = function(x) {
	console.log(x);
} // TypeError: undefined is not a function

// 5.
let g = 7;
function f() {
    g = 5;
    function g() {}
}
f();
console.log(g); // 7
// function g is hoisted and is local to function f
// g = 5 reassigns the local variable g

// 6.
let x = 10;
function f() {
  function g() {
    x = 20; 
  }
  g(); 
}
console.log(x);
f();
console.log(x); // 10, 20 (nearest x is global, so global is changed by x = 20)

// 7.
let x = 10;
function f() {
  let x = 30;
  function g() {
    x = 20; 
  }
  g(); 
}
f();
console.log(x); // 10 (nearest x is local, so global is not changed)