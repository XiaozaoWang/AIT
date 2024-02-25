// simple example of a promise that is immediately fulfilled

const p = new Promise(function(fulfill, reject) {
    fulfill('Success!');
});

p.then(function(val) {
    console.log(val);
})

// Result:
// Success!