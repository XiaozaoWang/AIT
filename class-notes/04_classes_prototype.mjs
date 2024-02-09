// /////////////////////////////////////////////////////////////////////////////////

// Prototype

// /////////////////////////////////////////////////////////////////////////////////

// -------------------------------------------
// checking v.s. calling a property
// an empty object
const hat = {}; 
// *printing out* a properties
console.log(hat.toString); // [Function: toString]
// *calling* a method
console.log(hat.toString()); // [object Object]


// -------------------------------------------
// prototype
// a prototype is an object that is used as a fallback source of properties
// objects are basically just a collection of properties
// when an objects gets a request for a property that it doesn't have, 
// the object's prototype is searched for that property
// searching continues up the prototype chain until the property is found or the end of the chain is reached
// the last object (top level) in the chain is [Object.prototype]
// Object.prototype has a prototype of [null]
console.log(Object.getPrototypeOf({})); // [Object: null prototype] {}
console.log(Object.getPrototypeOf(Object.prototype)); // null

// other prototypes:
// *Array.prototype
// *Function.prototype
// String.prototype
// Number.prototype
// Boolean.prototype
// ...

// check descendant
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // true

// type of prototype!!!
console.log(typeof Object.prototype); // object
console.log(typeof Function.prototype); // function


// -------------------------------------------
// checking property
const obj = {
    name: "Xiaozao",
    age: 20
};
const obj2 = {
    name: "xz",
    age: 20
};
console.log('name' in obj); // true (remember the quote)
console.log(Object.hasOwn(obj, 'name')); // true
console.log('toString' in obj); // true
console.log(Object.hasOwn(obj, 'toString')); // false
console.log(Object.hasOwn(Object.prototype, 'toString')); // true



// -------------------------------------------
// object.create
const obj3 = Object.create(obj); // obj is the prototype of obj3, we defined it earlier
console.log(obj3.name); // Xiaozao
console.log(Object.hasOwn(obj3, 'name')); // false
const noProto = Object.create(null); // it's an object with no prototype


// -------------------------------------------
// Modifying the existing prototype (like object, array, etc.)
const nums = [1, 2, 3];
// console.log(nums.first()); // TypeError: nums.first is not a function
Array.prototype.first = function() {
    return this[0];
};
console.log(nums.first()); // 1






// /////////////////////////////////////////////////////////////////////////////////

// Constructor

// /////////////////////////////////////////////////////////////////////////////////

// Definition of a method
// Methods are object properties that are functions
// (a function within the context of an object)

// functions as class methods
// "this dot"
// "this" refers to the object that the method is called on
const cat = {
    nationailty: "American",
}
const dog = {
    nationailty: "American",
    speak: speak,
}

function speak(target) {
    if (this.nationailty === "American") {
        console.log("Meows at", target);
    } else {
        console.log("Miaos at", target);
    }
}

cat.speak = speak; // function speak can be applied to many objects
cat.speak(); // Meow
// speak(); // TypeError: Cannot read property of undefined (not designated to any object)
// but
// call() invoke function with specified this and positional arguments
speak.call(cat, "food"); // Meows at food
// apply() invoke function with specified this and an [array] of arguments
speak.apply(cat, ["food"]); // Meows at food
speak.apply({nationailty: Chinese}, ["food"]); // Meows at food
// bind() returns a new function with specified this and arguments
const boundSpeak = speak.bind({nationailty: Chinese}, "person");
boundSpeak(); // Miaos at person

// function in function?
const counter = {numbers: [1, 2, 3, 4], animal:'owl'};

counter.count = function() {
    this.numbers.forEach(function(n) {
        console.log(n, this.animal + (n > 1 ? 's' : ''));
    });
};
counter.count(); // error: "this" is undefined
// Because the callback function is called as a regular function, not a method of an object

// arrow function?
counter.count = function() {
    this.numbers.forEach(n => {
        console.log(n, this.animal + (n > 1 ? 's' : ''));
    });
};
counter.count(); // 1 owl, 2 owls, 3 owls, 4 owls
// Arrow functions adopt the "this" from the surrounding function
// Remember, arrow functions do not bind this to a new value,
//  and instead gets its this from the enclosing scope

// Summary:
// 1. regular function invocation
    // in ES Modules / strict mode, this is undefined
    // in sloppy mode, this is the global object
// 2. method call
    // this is the object the method was called on
// 3. invoked with call or apply
    // this is the first argument passed in to call or apply
// 4. arrow function
    // this is this from the enclosing context








    
// -------------------------------------------
// Constructor (a *[function]* going with 'new')
// It's a convention to make the first letter of a constructor uppercase to distinguish it from a regular function
// An instance is an *[object]* created by using new
function WereWolf(name) {
    this.name = name;
    this.nationailty = "American";
    // what it does in the background:
    // const this = {};
    // this.name = name; // {name: "Bob"}
    // return this;
}
const w = new WereWolf("Bob"); // We get a returned object
// !!!!! See WereWolf as a constructor, not only a normal function here!!!


// All constructors have a property named prototype,
// the default value of a constructor's prototype is a plain, empty object that derives from Object.prototype
// every instance created with the constructor will have that object as its actual prototype


// -------------------------------------------
// Don't define methods in the constructor function,
// but define them in the prototype.
// Why? Each instance will have its own copy of the method if it's defined in the constructor,
// but all instances will share the same method if it's defined in the prototype.

WereWolf.prototype.howl = function() {
    console.log("Awooooo");
} // don't use arrow function here, because it won't bind "this" to the instance
w.hasOwnProperty('howl') // false
w.prototype.hasOwnProperty('howl') // true
w.howl(); // Awooooo
// Don't know why "hasOwnProperty" is not working here

// Note: Pay attention to the order here!
// Even if you define the method after you create an instance, the instance will still have immediate access to the method.
// Because the search for the method is done real-time.

// -------------------------------------------
// what if adding a method to the function?
WereWolf.speak = function() {
    console.log("I'm a WereWolf");
};

w.howl(); // Awooooo
w.speak(); // TypeError: w.speak is not a function
WereWolf.speak(); // I'm a WereWolf (It will work strangely as a method inside a function)
WereWolf.howl(); // TypeError: WereWolf.howl is not a function

// what if adding a method to the instance?
w.speak = function() {
    console.log("I'm a WereWolf");
};
w.speak(); // I'm a WereWolf
// But you will have to add the method to every instance, which is not efficient.
console.log(Object.hasOwn(w, 'speak')); // true
console.log(Object.hasOwn(WereWolf.prototype, 'speak')); // false
console.log(Object.hasOwn(WereWolf.prototype, 'howl')); // true
// Doesn't have anything called "w.prototype"!!!
// Actually, sth.prototype is not that much used??


// Inheritance
// 1. create a new constructor
function SpaceWereWolf() {
    // call the old constructor (like super in Java)
    WereWolf.call(this, "Bob"); // Just remember.... T-T
}
// 2. set the prototype of the new constructor to the prototype of the old constructor
SpaceWereWolf.prototype = Object.create(WereWolf.prototype);
// Set the constructor T-T Rly confusing
SpaceWerewolf.prototype.constructor = SpaceWerewolf;
// 3. Create a new instance of the new constructor
const s = new SpaceWereWolf();
// So it inherits the methods from the constructor's prototype and the properties from the constructor!
s.howl(); // Awooooo
console.log(s.name); // Bob (.) not sure


// -------------------------------------------
// All object's have a property named constructor.
// Constructor is the function that was used to create the instance's prototype.
const a = [];
console.log(a.constructor); // [Function: Array]
console.log(a instanceof Array); // true

// -------------------------------------------
// An example on Prototypes slides


// /////////////////////////////////////////////////////////////////////////////////

// Classes

// /////////////////////////////////////////////////////////////////////////////////

// Classes are constructors with a more convenient syntax (introduced in ES6)
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak(thing) {
        console.log(this.name, "says", thing);
    }
}

const w1 = new Animal("Bob");
console.log(Object.hasOwn(w1, 'name')); // true
console.log(Object.hasOwn(w1, 'speak')); // false (it's in the prototype)
// but if you define it in the constructor, it will be in the object!!!!!!! 



// -------------------------------------------
// extends
class Dog extends Animal {
    constructor(name) {
        super(name);
        this.gender = 'b';
    }
}
const d = new Dog("Bob");
d.speak("hello"); // Bob says hello
d.gender; // b







// /////////////////////////////////////////////////////////////////////////////////
// exercise
const obj10 = {
    prefix: "hello",
    people: ["Alice", "Bob", "Charlie"],
    print() {
        this.people.forEach(function(name) {
            // console.log(this.prefix, name); // in the callback, 'this' will be undefined
            // callbacks are called as regular functions
            // even if that callback is a method of an object!!!
        });
    } // 'this' will refer to obj10
}

obj10.print();
// hwo to fix: 1. bind 2. arrow function
const obj11 = {
    prefix: "hello",
    people: ["Alice", "Bob", "Charlie"],
    print() {
        this.people.forEach((name) => {
            console.log(this.prefix, name);
        });
    }
}
obj11.print(); // hello Alice, hello Bob, hello Charlie


// -------------------------------------------
// Arrow function notes:
const cat = {
    sound: 'meow',
    meow: () => {console.log(this.sound);}
};
cat.meow(); // undefined
// Arrow functions do not bind a new value of this.


// alerts window object (essentially global):
button.addEventListener('click', () => {alert(this)});

// alerts button element:
button.addEventListener('click', function()  {alert(this)});