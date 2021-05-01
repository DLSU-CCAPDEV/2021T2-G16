const mongodb = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const client = mongodb.MongoClient; // connecting to db
const url = process.env.DB_URL; // getting url of db
const options = {useUnifiedTopology: true}; // needed for mongo db

const collaborativeDB = {

    // Insert One Document in DB
    insertOne: function(collection, doc) {
        client.connect(url , options , function(err , db) {
            if(err) throw err;
            var database = db.db('database'); // accessing database putting it in a var
            database.collection(collection).insertOne(doc , function(err, res){ // collection = table , inserting document to the collection (insertOne())
                if(err) throw err; // just checks for error
                console.log('1 document inserted');
                db.close(); // closing connection
            });
        });

    },

    // Insert Many Documents in DB
    insertMany: function(collection, doc) {
        client.connect(url , options , function(err , db) {
            if(err) throw err;
            var database = db.db('database'); // accessing database putting it in a var
            database.collection(collection).insertMany(doc , function(err, res){ // collection = table , inserting document to the collection (insertOne())
                if(err) throw err; // just checks for error
                console.log('Document inserted' + res.insertedCount); // Number of Inserted
                db.close(); // closing connection
            });
        });

    },

    // Retrieving OneOperation for DB
    findOne: function(collection , query , callback) {
        client.connect(url, options , function(err, db){
            if(err) throw err;
            var database = db.db('database');
            database.collection(collection).findOne(query , function(err , result){
                if(err) throw err;
                db.close();
                return callback(result);
            });
        });

    },

    // Retrieving many
    findMany: function(collection , query , sort=null , projection = null) {
        client.connect(url, options , function(err, db){
            if(err) throw err;
            var database = db.db('database');
            database.collection(collection)
            .find(query,{projection : projection}) // projection = specific
            .sort(sort).toArray(function(err , result){
                if(err) throw err;
                console.log(result);
                db.close();
            });
        });

    },

    deleteOne: function(collection , filter) {
        client.connect(url, options , function(err, db){
            if(err) throw err;
            var database = db.db('database');
            database.collection(collection)
            .deleteOne(filter ,function(err , res){
                if(err) throw err;
                console.log('1 document deleted');
                db.close();
            });
        });

    },

    deleteMany: function(collection , filter) {
        client.connect(url, options , function(err, db){
            if(err) throw err;
            var database = db.db('database');
            database.collection(collection)
            .deleteMany(filter ,function(err , res){
                if(err) throw err;
                console.log('Document deleted :' + res.deletedCount);
                db.close();
            });
        });

    },

    updateOne: function(collection , filter , update) {
        client.connect(url , options , function(err , db) {
            if(err) throw err;
            var database = db.db('database');
            database.collection(collection)
            database.collection(collection).updateOne(filter , update , function(err , res){
                if(err) throw err;
                console.log('1 Document updated');
                db.close();
            });
        });

    },

    updateMany: function(collection , filter , update) {
        client.connect(url , options , function(err , db) {
            if(err) throw err;
            var database = db.db('database');
            database.collection(collection)
            database.collection(collection).updateMany(filter , update , function(err , res){
                if(err) throw err;
                console.log('Document updated :' + res.modifiedCount);
                db.close();
            });
        });
    }
}

module.exports = collaborativeDB;