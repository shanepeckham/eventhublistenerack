var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://k8orders:QyzzuAhEuCybiGDxI1o0ai4myLE3No3cBQS15n72xBEXIGNBbNnCztmRLLz2FnNSPtJdQzUzumuqwdFY7FKr2w==@k8orders.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';

var insertDocument = function(db, callback) {
db.collection('families').insertOne( {
        "id": "AndersenFamily",
        "lastName": "Andersen",
        "parents": [
            { "firstName": "Thomas" },
            { "firstName": "Mary Kay" }
        ],
        "children": [
            { "firstName": "John", "gender": "male", "grade": 7 }
        ],
        "pets": [
            { "givenName": "Fluffy" }
        ],
        "address": { "country": "USA", "state": "WA", "city": "Seattle" }
    }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the families collection.");
    callback();
});
};

var findFamilies = function(db, callback) {
var cursor =db.collection('families').find( );
var collection= db.collection('families');
result =collection.find().forEach(function(item){
//here item is record. ie. what you have to do with each record.
console.log(item);
})

cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
        console.dir("booboo" + doc);
    } else {
        callback();
    }
});
};

var updateFamilies = function(db, callback) {
db.collection('families').updateOne(
    { "lastName" : "Andersen" },
    {
        $set: { "pets": [
            { "givenName": "Fluffy" },
            { "givenName": "Rocky"}
        ] },
        $currentDate: { "lastModified": true }
    }, function(err, results) {
    console.log(results);
    callback();
});
};

var removeFamilies = function(db, callback) {
db.collection('families').deleteMany(
    { "lastName": "Andersen" },
    function(err, results) {
        console.log(results);
        callback();
    }
);
};

MongoClient.connect(url, function(err, db) {
assert.equal(null, err);
insertDocument(db, function() {
    findFamilies(db, function() {
    updateFamilies(db, function() {
        removeFamilies(db, function() {
        //    db.close();
        });
    });
    });
});
});