function logExecutionTime(f) {
	return function(arg) {
		console.time('function timing');
		const val = f(arg);
		console.timeEnd('function timing');
		return val; 
	};
}

function wasteTime(limit) { for(let i=0;i < limit; i++) { }}
wasteTime = logExecutionTime(wasteTime);
wasteTime(5000000);