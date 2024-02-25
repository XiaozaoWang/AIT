
// promise is an object that promises to {return a value} to the "consumer" in the future
// a promise constructor takes one paramter: an executor function,
// which takes two parameters: fulfill and reject,
// and runs either of them.

// fulfill and reject are functions
// fulfill is called when the promise is successful
// reject is called when the promise is unsuccessful

// Three states of a promise:
// 1. pending
// 2. fulfilled
// 3. rejected
 
// View it as a callback function!! It takes paras and returns results.
// And it calls a pre-defined callback function, passing the results into it.
// Just that it can't immediately return the result to you,
// but it will return the result eventually. (or, error)

function getWeather() {
    return new Promise((fulfill, reject) => {
    // the main code that does the job (may take some time)
    console.log("loading weather")
    setTimeout(() => {
        // call either fulfill or reject
        // here, no need for rejecting
        console.log("sth before fulfill")
        fulfill('abc');
        console.log("sth after fulfill") // fulfill/rej is guaranteed to be called at LAST (?)
    }, 2000);
});
}

function getWeatherIcon(weather) {
    return new Promise((fulfill, reject) => {
        console.log("searching icon for", weather);
        setTimeout(() => {
            switch(weather) {
                case 'sunny':
                    fulfill('☀️')
                    break
                case 'cloudy':
                    fulfill('☁️')
                    break
                default:
                    reject("No icon found")
            }
        }, 2000);
    })
}

function onFulfill(data) {
    console.log("found icon: ", data);
}
function onReject(error) {
    console.log("Error message: ", error);
}


// "Consuming Code" (***Must wait for a completed Promise***)
// defines what to do {***after***} successed or failed
// can take two parameter functions: onFulfilled and onRejected,
// or just one parameter: onFulfilled
// or you can use .catch!

getWeather()
    .then(getWeatherIcon)
    .then(onFulfill, onReject)

// getWeather()
//     .then(getWeatherIcon)
//     .then(onFulfill)
//     .catch(onReject)

