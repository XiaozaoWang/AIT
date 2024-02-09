// --------------------------------------------
// Higher-order functions (that's a way of abstraction!)
// 1. takes a function as an argument
// 2. returns a function as a result
// 3. both


// ----------------------------
// Examples
// 1.
// Our own-implemented forEach() function (A simple example of abstraction)
const evens = [2,4,6];
const odds = [1,3,5];

function myForEach(arr, callbackFunc) {
    for (let i = 0; i < arr.length; i++) {
        callbackFunc(arr[i]);
    }
}
myForEach(evens, ele => console.log(ele * 2)); // 4, 8, 12
myForEach(odds, ele => console.log(ele)); // 1, 3, 5


// 2.
// map function
function map(arr, transform) {
	const transformed = [];
	arr.forEach(function(element) {
		transformed.push(transform(element));
	});
	return transformed;
}
const result = map(['hello', 'hey', 'hi'], function(greeting) {return greeting + '!!'});
console.log(result);



// 3.
// Filtering function
function myFilter(arr, filterFunc) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (filterFunc(arr[i])) {
            result.push(arr[i]);
        }
    }
    return result;
}

const nums = [1,2,3,4,5,6,7,8,9,10];
const result = myFilter(nums, n => n % 2 === 1); // the "test function" should return a boolean
console.log(result); // [1, 3, 5, 7, 9]

// 4.
// e.g. reduce function
// reduce(): take an array and return a single value
function myReduce(arr, reduceFunc, initVal) {
    let result = initVal; // this result is revisit-able
    for (let i = 0; i < arr.length; i++) {
        // the reduce function should take in two arguments: accumulator and current element
        // and return the new accumulator
        result = reduceFunc(result, arr[i], i); // the third argument is for potential use
    }
    return result;
}

const arr = [2,3,4];
console.log(myReduce(arr, (acc, ele) => acc + ele, 0)); // 9 // only use two arguments
// array -> object {a: 1, b: 2, c: 3}
const arr2 = ['a', 'b', 'c'];
console.log(myReduce(arr2, (obj, ele, idx) => {
    obj[ele] = idx;
    return obj;
}, {})); // {a: 0, b: 1, c: 2}

// Exercise: Find the minimum value in an array using reduce
const numbers = [-5, -2, -1, -10, -3];
console.log(reduce(numbers, function(accum, ele) {
  if(accum < ele) {
    return accum;
  } else {
    return ele; 
  }
}, numbers[0]));


// ----------------------------
// Already-existing js methods: map(), filter(), reduce()
// They are like an outer function that takes different callback functions to do different things.
// They do NOT mutate the original array.
const result2 = nums.filter(n => n > 5); // [6, 7, 8, 9, 10] (returns those who passed the test)
const result3 = nums.map(n => n * 2); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
const result4 = nums.reduce((acc, ele) => acc + ele, 0); // 55



// ----------------------------
// Chaining
const animals = ['cat', 'dog', 'elephant', 'bird'];
const newAnimals = animals
                   .filter(animal => animal.length >= 4)
                   .map(animal => animal.toUpperCase());
console.log(newAnimals); // ['ELEPHANT', 'BIRD']







// ----------------------------
// Decorators
// : A function that modifies another function
// Takes in old function as argument, returns new function
// The new function usually mimics the old function, but with some extra features
// Usage: 
// 1. add timing functionality
// 2. add debug
// 3. Memoization (caching return values)

// e.g. 1: decorating an existing function
const debug = oldFn => {
    const debuggedFn = (...arg) => {
        // Adding new functionality
        console.log('the args are', arg);
        // Input and output the old function
        const result = oldFn(...arg);
        return result;
    }
    return debuggedFn;
}
const debuggedParseInt = debug(parseInt);
console.log(debuggedParseInt('100')); // 100
console.log(debuggedParseInt('100', 2));  // 4

// e.g. 2: decorating a newly-defined function
const increase = x => x + 1;
const newIncrease = debug(increase);
console.log(newIncrease(99)); // 100
// in one line
console.log(debug(increase)(99)); // 100
// debug(increase) returns a function with new functionality


// cache
// check if the result is already in the cache (reduce time consumption)
const cachify = fn => {
    // firstly, create a "dictionary"
    const cache = {};
    // Secondly, define and return the new function
    const cachedFn = (...args) => {
        console.log(cache);
        const k = JSON.stringify(args);
        if (Object.hasOwn(cache, k)) {
            console.log('cache hit', k);
            return cache[k];
        } else {
            console.log('cache miss, resort to old func');
            const ret = fn(...args);
            cache[k] = ret;
            return ret;
        }
    }
    return cachedFn;
}

const cachedParseInt = cachify(parseInt);
console.log(cachedParseInt('100',2)); // cache miss, 4
console.log(cachedParseInt('10',2)); // cache miss, 2
console.log(cachedParseInt('100',2));  // cache hit, 4









// //////////////////////////////////////////////////////////

// Functions as objects

// //////////////////////////////////////////////////////////

// Methods on Function objects
// 1. call() - calls a function with given this and individual arguments

// 2. apply() - calls a function with given this and an array of arguments

// 3. bind() - returns a new function with given this and arguments
// ??
