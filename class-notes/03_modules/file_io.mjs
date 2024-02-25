
// Importing a module
// 1. import someName from 'someModule'
// 2. import { nonDefault } from 'someModule' (foo as bar)
// 3. import someName from './relativePathToFile.js'

// Creating a module
// 1. create a .js or .mjs file.
// 2. add code to that file
// **3. export functions, classes, identifiers / variables

// Execution order
// Imported ES module code will run *before* code in file that it is importing modules.
// import './moduleA.mjs'
// console.log('between')
// import './moduleB.mjs'
// anything in A -> anything in B -> console.log('between')


// import * as m from './myModule.mjs';
// console.log(m.animal); // cat
// m.func1(); // func1  

// import { func1 } from './myModule.mjs';
// func1(); // func1


// file io
import { readFile } from 'fs';
// don't use:
// fs.readFileSync
// fs.promises.readFile

let config;

readFile("./data.json", (error, data) => {
    if (!error) {
        console.log(data['deck']); // undefined
        console.log(data.deck); // undefined
        console.log(data); // <Buffer 7b 0a 20 20 22 64 65 63 6b 22 3a 20 5b 5d 0a 7d>
        console.log(data+''); // 
        config = JSON.parse(data+'');
        console.log(config);
    } else {
        console.log(error);
    }
});




// argv







// ***look at hw1's code***

