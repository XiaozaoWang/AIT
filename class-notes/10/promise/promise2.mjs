import {readFile} from 'fs';

// console.log('Before readFile');
// readFile('./notes.md', 'utf-8', (err, data) => {
//     console.log(data);
//     console.log('After readFile');
// });

// promise 1
const p1 = new Promise((fulfill, reject) => {
    fulfill(1);
})

// promise 2
// (p1.then(onFulfill): called from p1, returns a Promise to p2)
const p2 = p1.then((data) => {
    console.log(data);
    return new Promise((fulfill, reject) => {
        fulfill(data + 1);
    })
})

// AMAZING... It doesn't return a promise, but still works.
// WHY?????? Because!!!!
// then() returns a {{{Promise}}}! (that allows chaining)
// SO it will identify if you are not returning a Promise,
// and wrap it with Promise
// const p2 = p1.then((data) => {
//     console.log(data);
//     return data + 1;
// })

console.log(p2)
p2.then((data) => {console.log(data)});
// result:
// 1
// 2
