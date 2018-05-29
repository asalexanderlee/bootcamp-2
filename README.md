# Databases

In this exercise, you'll learn how to use nonSQL databases. You'll create a database for a todo list application and then learn how to interact with it using four different technologies.

## Pre-reading:

0. [What is a database?](https://searchsqlserver.techtarget.com/definition/database)
1. [What is MongoDB](https://www.youtube.com/watch?v=EE8ZTQxa0AM)

## Release 0

Use the MongoDB shell to write and read from the database.

* Start your MongoDB server: `mongod`
* In a new tab, enter into the MongoDB shell: `mongo`
* Enter into a new database called todoApp: `use todoApp`
* Enter into a new collection called todos.
* Insert one todo document into the todos collection.

```javascript
Todo = {
  description: String,
  completedOn: Date,
  createdOn: Date
};
```

* Now, create a new collection called users.
* Insert one user document into the users collection.

```javascript
User = {
  firstName: String,
  lastName: String,
  userName: String,
  email: String
};
```

* Query the database for all todos.
* Exit the shell.

For this exercise, you may find this documentation helpful. https://docs.mongodb.com/manual/mongo/

## Release 1

* Use MongoDB Compass to connect to your database instance and find the documents you created in Release 0.
* Add a few more todos using the Compass interface.

## Release 2

MongoDB has a driver for NodeJS that allows you to use Javascript to query the MongoDB server. Use npm to install it.

https://github.com/mongodb/node-mongodb-native

Your task is to create a script that seeds 100 users and 20,000 unique tasks to the database.

It may be helpful to use a tool like Faker.js to stub your data. https://github.com/marak/Faker.js/

## Release 3

In the future, we'll allow our users to add real tasks to the database. But that can be scary! What if we have a user who is out to get us? What if they try to crash our app by adding tasks to our todo list that are millions of characters long? How do we stop them!?

This is where ODMs (Object Document Mappers) come in. ODMs allow us to define rules about the objects that we write to our database. We can typecast, define maximum field lengths, and add all sorts of other enforcements. Our ODM of choice, is [Mongoose](http://mongoosejs.com/). Install it with npm and then use it to:

* Define a model for todos.
* Define a model for users
* Add a type and maxlength for every field.
* On your User model, write a function that seeds 100 users to the database.
* On your Todo model, write a function that seeds 20000 unique tasks to the database.
* Try to insert objects into your models that violate one of your model constraints.

## Release 4
_this is an optional release, but is very, very good practice._

Write a todo application that runs in the terminal. It should do the following: 

* Query the database and return an ordered list of all oustanding todos. 
* Allow users to insert new todos. (Write the todo to the database and refresh the console.)
* Allow users to delete todos from the list by typing the number of the todo. (Remove the todo from the database by id and refresh the console.)
