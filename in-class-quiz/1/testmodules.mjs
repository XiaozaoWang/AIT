
// import {fileToObject} from './modules.mjs';
import {readFile} from 'fs';


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

function fileToObject(propsFileName, valuesFileName, callback) {
    readFile(propsFileName, 'utf-8', (err1, data1) => {
        if (!err1) {
            const propsArr = data1.trim().split("\r\n");
            readFile(valuesFileName, 'utf-8', (err2, data2) => {
                if (!err2) {
                    const valuesArr = data2.trim().split("\r\n");
                    // console.log(propsArr)
                    const reduceFn = (acc, ele, i) => {
                        console.log(acc, ele, i, valuesArr[i])
                        acc[ele] = valuesArr[i];
                        return acc;
                    }
                    const obj = propsArr.reduce(reduceFn, {});
                    callback(obj);
                } else {console.log(err2)}
            });
        } else {console.log(err1)}
    });
}



fileToObject('props.txt', 'values.txt', console.log);