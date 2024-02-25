
## Where do we store data?
- app.js: in the memory (will lose data when the server restarts)
- file system
- cloud (S3, firebase, etc)
- database 
    - relational (SQL) (more rigid requirements)
    - non-relational (NoSQL)
        - document store (MongoDB)
        - key-value store (Redis)
        - column store
        - graph store

## MongoDB
- like a document store 
    - (a single record in Monge is a document)
    - a document is a JSON-like (BSON) object (key-value pairs)
- noSQL
- query language is JavaScript

### Phrases:
- document: a single object or record (like a row in a relational database)
- collection: a group of documents (like tables in a relational database)

### Installation and use
* mongosh (mongo shell) (client)
    - show dbs: show all databases
    - use someDatabaseName: switch to a database (create one)
    - db.createCollection("someCollectionName"): create a collection
    - db.dropDatabase(): delete the current database
    - db.someCollectionName.insertOne({name: "someName"}): insert a document into a collection (basically an object)
* mongoose
    * module that serves a s mongodb client
    * odm = object document mapper
    * turns docs into actual js onjects
    * enforces

### using mongoDB

