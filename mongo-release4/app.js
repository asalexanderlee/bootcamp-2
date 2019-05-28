/*
Application that allows user to get outstanding todos, insert todos, and delete todos.

Get all todos: npm run getTodos
Insert todos: npm run addTodo todoObject
Delete todos: npm run deleteTodo todoId

Any todos that have not been completed will have completedOn: null
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Todo schema
const TodoSchema = new Schema({
  description: { type: String, maxlength: 500 },
  createdOn: Date,
  completedOn: Date
});

// Create Todo model based off of schema
const Todo = mongoose.model("Todo", TodoSchema);

mongoose.connect("mongodb://localhost:27017/todoApp", { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db
  .once("open", () => {
    // Perform given function
    const funcToCall = process.argv[2];
    const param = process.argv[3];
    switch (funcToCall) {
      case "getOpenTodos":
        getOpenTodos();
        break;
      case "addTodo":
        addTodo(param);
        break;
      case "deleteTodo":
        deleteTodo(param);
        break;
    }
  })
  .then(() => mongoose.connection.close());

// Return list of outstanding todos (ordered by date)
function getOpenTodos() {
  Todo.find({ completedOn: null })
    .sort({ createdOn: 1 })
    .then(todos => todos.map(todo => console.log(todo)))
    .catch(err => console.log(err));
}

// Insert a new todo
function addTodo(desc) {
  const todo = new Todo({ description: desc, createdOn: Date(), completedOn: null });
  todo.save((err, doc) => {
    if (err) console.error(err);
    console.log("Successfully added todo.\n", doc);
  });
}

// Delete todo by id
function deleteTodo(id) {
  Todo.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
    .then(resp => console.log("Successfully deleted todo.\n", resp))
    .catch(err => console.log(err));
}
