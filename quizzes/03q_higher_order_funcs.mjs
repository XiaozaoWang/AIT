// 1. (Example)
function compose(f, g) {
    const h = function(x) {
        console.log("composing");
        f(g(x)); 
    };
    return h;
}
const frankenstein = compose(console.log, Math.sqrt);
frankenstein(9);




// 2. (Example)
function cachify(f) {
    const cache = {};
    return function(x) {
        if(cache.hasOwnProperty(x)) {
            console.log('cache hit');
            return cache[x];
        } else {
            const res = f(x);
            cache[x] = res;
            console.log('updated cache');
            return res;
        }
    };
}
const cachedSqrt = cachify(Math.sqrt);
cachedSqrt(16);
cachedSqrt(9);
cachedSqrt(16);



// 3. (Example) (Finding the minimum value in an array)
const nums = [-3, -2, 2, 3, 4];
const x = nums.filter((n) => n % 2 === 0).reduce((res, n) => n < res ? n : res, Infinity);
console.log(x);


// 4. (Example) (built-in reduce)
const stringy = ['1', '10', '100'];
const reducedResult = stringy.reduce(secret, 1);
console.log(reducedResult); // 8
function secret(product, ele) {
    return product * parseInt(ele, 2);
}