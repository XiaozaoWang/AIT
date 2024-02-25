import {readFile} from 'fs';


// nested is the best solution for non-sync case here
export function fileToObject(propsFileName, valuesFileName, callback) {
    readFile(propsFileName, 'utf-8', (err1, data1) => {
        if (!err1) {
            const propsArr = data1.trim().split("\r\n");
            readFile(valuesFileName, 'utf-8', (err2, data2) => {
                if (!err2) {
                    const valuesArr = data2.trim().split("\r\n");
                    // console.log(propsArr)
                    const reduceFn = (acc, ele, i) => {
                        // console.log(acc, ele, i, valuesArr[i])
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