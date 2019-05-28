const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const assert = require("assert");
var faker = require("faker");

/* -------------------------------- SCHEMAS --------------------------------- */

//define Todo schema
const TodoSchema = new Schema({
  description: { type: String, maxlength: 1000 },
  createdOn: Date,
  completedOn: Date
});

//initialize Todo model based on given schema
const Todo = mongoose.model("Todo", TodoSchema);

//define User schema
const UserSchema = new Schema({
  firstName: { type: String, maxlength: 100 },
  lastName: { type: String, maxlength: 100 },
  userName: { type: String, maxlength: 100 },
  email: { type: String, maxlength: 100 }
});

//initialize User model based on given schema
const User = mongoose.model("User", UserSchema);

console.log("created todo and user models");

/* -------------------------- MONGO CONNECTION -------------------------------*/

// Connection URL
mongoose.connect("mongodb://localhost:27017/todoApp");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db
  .once("open", function() {
    // Create fake user data
    insertFakeUsers(db);
    // Create fake todo data
    insertFakeTodos(db);
  })
  .then(() => mongoose.connection.close());

function insertFakeUsers(db) {
  //create user objects to push to db (follow schema structure)
  console.log("inserting fake users...");
  const users = [];
  for (let i = 0; i < 100; i++) {
    users.push(
      new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        userName: faker.internet.userName(),
        email: faker.internet.email()
      })
    );
  }
  //push objects to User collection
  User.insertMany(users, (err, docs) => {
    if (err) console.log(err);
    else console.log("Seeded 100 user documents");
  });
}
function insertFakeTodos(db) {
  //create todo objects to push to db (follow schema structure)
  console.log("inserting fake todos...");
  const todos = [];
  for (let i = 0; i < 20000; i++) {
    todos.push(
      new Todo({
        description: faker.lorem.sentence(),
        completedOn: faker.date.future(),
        createdOn: faker.date.past()
      })
    );
  }
  //push objects to User collection
  Todo.insertMany(todos, (err, docs) => {
    if (err) console.log(err);
    else console.log("Seeded 20,000 todo documents");
  });
}
