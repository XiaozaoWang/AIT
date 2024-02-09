// ---------------------------------------------------------

// *** VALUES AND TYPES ***

// ------------------------------
// Values - types in JS (results returned by typeof)

// 5 - int - 'number' in js
// 1.23 - float - 'number' in js
// infinity - 'number' in js
// NaN - 'number' in js
// boolean, string...

// null - 'object'
// undefined - 'undefined'

// {} - set/dict/hash map - 'object'
// [1,2,3] - 'object'
// console - 'object'
// console.log - 'function'
// *** Actually, function is a subtype of object (functions are objects) ***
// they can have properties and methods (function.name)


// !!! All numbers in JS are 64-bit floating point numbers!!!
// Be careful with the floats
// 0.1 + 0.2 = 0.30000000000000004

// ------------------------------
// PRIMITIVE vs object
// primitives (numbers, strings, booleans, null, undefined, NaN) - immutable
// object - mutable





// ---------------------------------------------------------

// *** OPERATORS ***

// --------------------------------
// Numeric operators (converting to number)
// + - * / % **
// (prefix unary) + - 
// (postfix unary) ++ --

// Type coercion RULES: (when numeric operators are applied)
// 1. undefined -> NaN
// 2. null -> 0
// 3. boolean -> 1/0
// 4. string -> number *(NaN if conversion fails)*
// 5. All containing NaN -> NaN
// 6. All containing Infinity -> Infinity
// 7. Object -> Primitive (via valueOf() and toString())

+12; // 12

+undefined; // NaN
undefined+1; // NaN

+null; // 0
null+1; // 1

+true; // 1
+false; // 0
-true; // -1
true+1; // 2

-"12"; // -12
+"12abc"; // NaN (string -> number conversion fails)
5 > '3'; // true (string -> number conversion happens)
'a'>1; // false (string -> number conversion fails)
'a'<1; // false (string -> number conversion fails)
''<1; // true (string -> number conversion happens)

+{}; // NaN

+NaN; // NaN
NaN + 1; // NaN

isNaN('abc'); // true

// --------------------------------
// Comparison (and coercion in the process)

// 1. Equality Operators
// JavaScript will do its best to convert types so that they can be checked for equality
'10' == 10; // true
0 == false; // true
null == undefined; // true

// Strict equality (===) does not do type conversion

// 2. Relational Operators
// see above


// 3. Special cases
NaN === NaN; // false 
NaN == NaN; // false
-2 < NaN; // false
-2 < undefined; // false (undefined -> NaN)
// if one of the operands in comparison is NaN, must return false

null == 0; // false (although null -> 0)
null >= 0; // true
// Comparison operators will convert to a Number on both sides, 
// while == will only do this for specific types




// ------------------------------
// bitwise operators
// Bitwise operators convert (NaN, infinity, null, undefined) to 0
// *** But note that numeric operators do NOT convert them to 0 ***
NaN | 0; // 0
undefined | 1; // 1
// ...

// Bitwise shifting
// 1. left shift (<<)
2 << 3; // 16
// 2. sign-propagating right shift (>>) (arithmetic shift)
8 >> 2; // 2 (00001000 -> 00000010)
-8 >> 2; // -2 (11111000 -> 11111110)
// 3. zero-fill right shift (>>>) (logical shift)
8 >>> 2; // 2 (00001000 -> 00000010)
-8 >>> 2; // 1073741822 (11111000 -> 00111110)


// ------------------------------
// boolean conversion
// falsy values: false, 0, '', null, undefined, NaN
// truthy values: everything else


// ------------------------------
// String operators
// + (concatenation)
'hello' + 'world' // 'helloworld'
'hello' + 1 // 'hello1' (the number is converted to string)
// (Here, it's not NaN because it's not a numeric operator)
// * If either operand is a string, the other operand is converted to a string!!! *


// ------------------------------
// Nullish coalescing operator
// ?? evaluates the expression on its left-hand side
// if the result is nullish (null or undefined), it returns the expression on its right-hand side. 
// If not, the left expression is returned as the overall result.
0 ?? 123; // 0
null ?? 123; // 123


// ------------------------------
// Precedence of Operators

// 1. parentheses
// 2. unary operators like logical NOT, typeof and negative
// 3. the rest of lPEMDAS (number, string operators) - left to right if same precedence
// 4. bitwise shift operators
// 5. comparison operators - left to right
// 6. equality operators - left to right
// 7. remaining logical operators - and, or - left to right
// 8. Other bitwise operators - & ^ | - left to right

// Examples:
5 - 5 || 2; // 2 


// ------------------------------
// Casting
i = Number('123'); // 123
i = Number('123abc'); // NaN

i = new Number('123'); // Number {123} (Don't use this!!)
// You are creating a wrapper object, not a primitive value

// Other ways:
!!'abc'; // true (convert to boolean)
parseInt('123'); // 123 (parseInt() pulls out the essence of the string and converts it to a number)
parseInt('123abc'); // 123
parseInt('abc123'); // NaN
parseInt('FF', 16); // 255 (base 16)
parseInt(123.456); // 123
parseFloat('123.456'); // 123.456




// -----------------------------
// A small note on coercion that involves strings
+'hi'; // NaN (string -> number conversion fails)
'a' - 1; // NaN (string -> number conversion fails)
'a' == 1; // false (string -> number conversion fails)
'1' == 1; // true (string -> number conversion happens)\
'a' > 1; // false (string -> number conversion fails)
'a' + 1; // 'a1' (concatenation happends when either operand is a string)


// Checking
// 1. undefined (also null)
if (x === undefined) {
    // ...
}

// 2. NaN
if (isNaN(x)) {
    // ...
}






