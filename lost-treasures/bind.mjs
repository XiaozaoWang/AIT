// With the bind() method, an object can borrow a method from another object.

const person = {
    firstName:"John",
    lastName: "Doe",
    fullName: function () {
      return this.firstName + " " + this.lastName;
    }
  }
  
  const member = {
    firstName:"Hege",
    lastName: "Nilsen",
  }
  
  let fullName = person.fullName.bind(member);


// 
const handleConnect = (sock) => { 
sock.on('data', handleData.bind(null, sock));
}

function handleData(sock, data) {
  // Your code logic here
}

/*
The bind() method is a built-in JavaScript function that is used to create a new function with a specified this value and a fixed set of arguments. It takes two parameters: the value to be bound to this, and the arguments to be passed to the function when called.

In the code above, handleData.bind(null, sock) creates a new function that is bound to null as the this value and has sock as the first argument. The null value is used because in this case, we don't need to specify a particular this value for the function.

When the 'data' event occurs on the sock object, the bound function is invoked with two arguments: sock (the value we bound using bind()) and data (the data passed by the event). The sock argument is passed explicitly, while the data argument is passed automatically by the event system.

So, essentially, the bind() method allows you to create a new function that "binds" a specific value to one or more of its arguments. In this case, it binds the sock value to the first argument of the handleData function, allowing you to access the sock object within the handleData function when the 'data' event occurs.
*/