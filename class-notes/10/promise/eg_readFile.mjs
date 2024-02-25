// convert callback to promise
import {readFile} from 'fs';

//readFile
const myReadFile = fileName => {
    return new Promise((resolve, reject) => {
        readFile(fileName, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

// console.log('before')
// myReadFile('../MongoDB/.env').then(console.log).catch(console.log);
// console.log('after')

// async-await version
// async implicitly returns a promise!!
// await waits for a promise!!
// ****await can only be used inside an async function**** (??????)
const main = async () => {
    const data = await myReadFile('../MongoDB/.env');
    console.log('DATA:', data);
}

await main(); // pauses the execution of the program until main() is done
console.log('after main') // will run after main() is done