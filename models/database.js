// let MongoClient = require('mongodb').MongoClient;
let dburl = "mongodb://127.0.0.1:27017/"
let database = "registrationFormHeruko"
let db_options = {}
module.exports.mongoGet = function(table, query, usercheck, user, callback) {

    let MongoClient;
    MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(dburl, db_options, function(err, client) {
        if (err) {
            return console.log(err);
        }
        let db = client.db(database);
        const collection = db.collection(table);
        collection.find(query).toArray(function(err_coll, items) {
            client.close();
            return callback(items);

        });
    });

};

module.exports.mongoInsert = function(table, query, callback) {

    let MongoClient;
    MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(dburl, db_options, function(err, client) {
        if (err) {
            return console.log(err);
        }
        let db = client.db(database);
        const collection = db.collection(table);
        collection.find(query).toArray(function(err_coll, items) {
            client.close();
            return callback(items);

        });
    });

};

module.exports.mongo_insert_callback = function( tablename, data, callback) {

    const MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(dburl, db_options, function(err, client) {
        if (err) {
            return console.dir(err);
        }
        let db = client.db(database);
        const collection = db.collection(tablename);
        collection.insert(data, function(err_coll) {
            if (err_coll) {
                //console.log(error);
                client.close();
                return callback({ 'Error': 'Failed to insert' + err_coll });

            } else {
                client.close();
                return callback({ 'result': 'Successfully inserted' });


            }
        });
    });
};