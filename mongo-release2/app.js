const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var faker = require("faker/locale/fr");

faker.locale = "fr";

// Connection URL (docs.mongodb.org/manual/reference/connection-string/)
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "todoApp";

// Use connect method to connect to the server
// more info on MongoClient: https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  //we get the connection back -- now we must specify what db we want
  const db = client.db(dbName);

  //wait until we finish inserting users and docs to close the connection
  Promise.all([insertUserDocuments(db), insertTodoDocuments(db)]).then(vals => client.close());
});

// Create fake user data
const insertUserDocuments = function(db) {
  //create array of user objects to save to db
  const users = [];
  for (let i = 0; i < 100; i++) {
    users.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userName: faker.internet.userName(),
      email: faker.internet.email()
    });
  }
  // Get the user collection
  const collection = db.collection("users");
  // Insert user documents, using the array of objects we created above for reference
  collection.insertMany(users, function(err, result) {
    assert.equal(err, null);
    assert.equal(100, result.result.n);
    assert.equal(100, result.ops.length);
    console.log("Inserted 100 user documents into the collection");
  });
};

// Create fake todo data
const insertTodoDocuments = function(db) {
  //create array of todo objects to save to db
  const todos = [];
  for (let i = 0; i < 20000; i++) {
    todos.push({
      description: faker.lorem.sentence(),
      completedOn: faker.date.future(),
      createdOn: faker.date.past()
    });
  }
  // Get the todos collection
  const collection = db.collection("todos");
  // Insert todo documents, using the array of objects we created above for reference
  collection.insertMany(todos, function(err, result) {
    assert.equal(err, null);
    assert.equal(20000, result.result.n);
    assert.equal(20000, result.ops.length);
    console.log("Inserted 20,000 todo documents into the collection");
  });
};
