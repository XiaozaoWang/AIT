// ORM vs ODM
// ORM: Object Relational Mapper
// ODM: Object Document Mapper (Mongoose!)
// What they do:
// map objects in your application to their counterparts in your database (tables, collections)
// (allow easier access to the database)

// Concepts:
// Schema: analogous to a table / collection
// Model: a constructor for creating objects
// Object: a single row / document


import './config.mjs';

// npm install mongoose --save
import mongoose from 'mongoose';
mongoose.connect(process.env.DSN);

// Schema is a blueprint for a model
const CatSchema = new mongoose.Schema({
    name: String,
    lives: Number,
    color: String
});

// model returns a constructor
const Cat = mongoose.model('Cat', CatSchema);

/*
const c = new Cat({name: 'Fluffy', lives: 9, color: 'white'});
const result = await c.save();
console.log(c.save()); // Promise (pending)
console.log(result); // the data
*/

const cats = await Cat.find();
console.log(cats);

// app.get('/cats', async (req, res) => {
//     const cats = await Cat.find();
//     res.render('cats', {cats});
// });