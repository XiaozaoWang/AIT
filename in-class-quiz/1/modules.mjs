
function fileToObject(propsFileName, valueFileName, callback) {
    let propsData = '';
    readFile(propsFileName, 'utf8', (err, data) => {
        if (!err) {
            propsData = data;
        }
    });
    console.log(propsData);
}

export {fileToObject};