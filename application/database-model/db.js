const mongodb = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const client = mongodb.MongoClient;
const url = "mongodb+srv://admin:admin@collaborativedb-ccapdev.ck8cf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; // Connected to a Remote Database
const options = { useUnifiedTopology: true };

const collaborativeDB = {

    totalCount: function(collection , callback) {
        client.connect(url , options , function(err , db) {
            if(err) throw err;
            var database = db.db('collaborativeDB');
            database.collection(collection).stats(function(err , stats){
               if(err) throw err;
               db.close();
               return callback(stats);
               
            });
        });

    },

  insertOne: function (collection, doc) {
    client.connect(url, options, function (err, db) {
      if (err) throw err;
      var database = db.db("collaborativeDB");
      database.collection(collection).insertOne(doc, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });
  },

  insertMany: function (collection, doc) {
    client.connect(url, options, function (err, db) {
      if (err) throw err;
      var database = db.db("collaborativeDB");
      database.collection(collection).insertMany(doc, function (err, res) {
        if (err) throw err;
        console.log("Document inserted" + res.insertedCount);
        db.close();
      });
    });
  },

  findOne: function (collection, query, callback) {
    client.connect(url, options, function (err, db) {
      if (err) throw err;
      var database = db.db("collaborativeDB");
      database.collection(collection).findOne(query, function (err, result) {
        if (err) throw err;
        db.close();
        return callback(result);
      });
    });
  },

  findMany: function (
    collection,
    query,
    callback,
    sort = null,
    projection = null
  ) {
    client.connect(url, options, function (err, db) {
      if (err) throw err;
      var database = db.db("collaborativeDB");
      database
        .collection(collection)
        .find(query, { projection: projection })
        .sort(sort)
        .toArray(function (err, result) {
          if (err) throw err;
          db.close();
          callback(result);
        });
    });
  },

  deleteOne: function (collection, filter) {
    client.connect(url, options, function (err, db) {
      if (err) throw err;
      var database = db.db("collaborativeDB");
      database.collection(collection).deleteOne(filter, function (err, res) {
        if (err) throw err;
        console.log("1 document deleted");
        db.close();
      });
    });
  },

  deleteMany: function (collection, filter) {
    client.connect(url, options, function (err, db) {
      if (err) throw err;
      var database = db.db("collaborativeDB");
      database.collection(collection).deleteMany(filter, function (err, res) {
        if (err) throw err;
        console.log("Document deleted :" + res.deletedCount);
        db.close();
      });
    });
  },

  updateOne: function (collection, filter, update) {
    client.connect(url, options, function (err, db) {
      if (err) throw err;
      var database = db.db("collaborativeDB");
      database.collection(collection);
      database
        .collection(collection)
        .updateOne(filter, update, function (err, res) {
          if (err) throw err;
          console.log("1 Document updated");
          db.close();
        });
    });
  },

  updateMany: function (collection, filter, update) {
    client.connect(url, options, function (err, db) {
      if (err) throw err;
      var database = db.db("collaborativeDB");
      database.collection(collection);
      database
        .collection(collection)
        .updateMany(filter, update, function (err, res) {
          if (err) throw err;
          console.log("Document updated :" + res.modifiedCount);
          db.close();
        });
    });
  },
};

module.exports = collaborativeDB;
