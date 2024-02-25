

import { fileToObject } from './modules.mjs';

fileToObject('props.txt', 'values.txt', console.log);


// function fileToObject(propsFileName, valuesFileName, callback) {
//     let propsArr;
//     let valuesArr;
//     const receiveProps = function(data) {
//         console.log(data);
//         propsArr = data.trim().split("\r\n");

//     }
//     const receiveValues = function(data) {
//         valuesArr = data.trim().split("\r\n");
//     }
//     console.log(propsArr);


//     readFile(propsFileName, 'utf-8', (err, data) => {
//         if (!err) {
//             receiveProps(data);
//         } else {console.log(err)}
//     });

//     readFile(valuesFileName, 'utf-8', (err, data) => {
//         if (!err) {
//             receiveValues(data);
//         } else {console.log(err)}
//     });

// }






