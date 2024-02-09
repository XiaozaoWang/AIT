console.log('start')
import {readFile} from 'fs';

const handleRead = (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data+'!!!'); // turn hex into readable
    }
};
readFile('./data.json', handleRead);
console.log('end')

// the data will be printed after 'end'
// because the readFile() is asynchronous