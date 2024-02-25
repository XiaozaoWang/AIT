// async: it's like it's been processed in another thread
// sync: the opposite


// this is an async function because setTimeout is async
function delayedShout(s, cb) {
    // ~1.5 to ~3.5 seconds
    const delay = 1000 + Math.random() * 2000;
    setTimeout(
      () => {
        const shout = `${s.toUpperCase()}!!!`
        console.log(shout);
        // cb();
      }, 
      delay
    );
  }

console.log('before');
delayedShout('foo');
console.log('after');
// Result:
// before
// after
// FOO!!! (after ~1.5 to ~3.5 seconds)


// but how can we print sth AFTER the shout?
// adding a CALLBACK func after console.log(shout)

// ------------------------------
// but async causes problems
// const data = get(url);
// parseResult(data);
// Or: readFile
// we can't guarantee that the get() finishes before parseResult() starts

// Solution1: Callbacks inside the async function (but it's messy with endless nesting of callbacks)
// Solution2: Promises
