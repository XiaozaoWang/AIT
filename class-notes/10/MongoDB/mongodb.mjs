
import './config.mjs';
console.log(process.env.DSN); // mongodb://localhost

import {MongoClient} from 'mongodb';

const client = new MongoClient(process.env.DSN)
const db = client.db('ait-sp24')
const snakesCol = db.collection('snakes')
// snakesCol.insertOne({name: 'cobra', venomous: true})
const s = await snakesCol.findOne()
console.log(s)

// go to the extension and see the database!
