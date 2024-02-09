function returnThis() {
	return this;	
}

console.log(returnThis()); // global object
console.log("Is global the same as function? " + (returnThis() === global)); 