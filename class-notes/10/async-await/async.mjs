
// still have to wrok with Promise!!!

// 1. async/await only affects Promise receiver
// 2. you can convert an ordinary function to an async function (async function returns a Promise)
// 3. error handling with try/catch

function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve('some data');
            reject('some error');
        }, 1000);
    })
}

async function main() {
    try {
        // onSuccess();
        const result = await getData();
        console.log(result);
    } catch (error) {
        // onFailure();
        console.error('ERROR:', error);
    }

}

main();

// convert an ordinary function to an async function

const me = {
    async sayHello() {
        return "Hello!";
    }
}

console.log(me.sayHello())
me.sayHello().then(console.log);



