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
        console.log(config.deck);
    }
});
