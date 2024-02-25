
## Also talked about node http module
- Didn't have time to read
- What is that: 
https://stackoverflow.com/questions/29869999/http-createserver-vs-net-createserver-in-node-js
- Class material: 
https://cs.nyu.edu/courses/spring24/CSCI-UA.0467-001/_site/slides/08/express.html?print-pdf#/

- Better than net module, but still a lot of manual work, that's why we need express (a server-side web framework)



## Web Frameworks
### Server 

wat is a server side web framework?

* library or module
* that implements commonly needed features for web applications (that are developed on the server mainly)
* features:
    * routing
    * access to request and response
    * serving static files
    * templating
    * middleware
    * database access
    * security
        * csrf tokens
        * escaping sql and nosql queries
        * others...
    * authentication
    * sessions
    * cookies
    * forms

1. monolithic
    * implement all of the above features
    * opinionated on how to layout project 
    * even moar features... django automatically creates an "admin" interface
    * rails generates scaffolding
    * examples
        * ruby - rails
        * python - django
        * php - laravel
2. micro
    * implement only a core set of features
    * everything else is integrated by u (u pick which auth lib, u pick which db module u want to use)
    * u also can make ur own project layout
    * examples
        * ruby - sinatra
        * python - flask, fastapi
        * node.js - express


### Client
* He didn't say


## Express (Express 4)
* Built on top of node and node's http module
* Need to install with npm! (npm install express --save)
* Features: (extends and warps the features in our self-made servers)
    * response.sendFile
    * response.redirect
    * request.ip
    * So on.....