// let Todos = require("./TodosJson");
let Todos = require("./TodosDb");

module.exports = function (app) {

  // RESTful api --------------------------------------------------------------
  app.get('/', function (req, res) {
    res.send('Hello World!');
  });

  // get all todos
  app.get('/api/todos', function (req, res) {
    Todos.getAll((err, result) => {
      if (err) res.send(err);
      return res.end(result);
    });
  });

  // create a todo
  app.post('/api/todos', function (req, res) {
    let item = req.body
    Todos.add(item, (err, result) => {
      if (err) {
        return res.status(400).send({ message: "Add todo failed: " + err.message });
      }
      return res.end(result);
    });
  });

  // delete a todo
  app.delete('/api/todo/:id/:title', function (req, res) {
    let id = req.params.id;
    let title = req.params.title;
    Todos.remove(id, title, (err, result) => {
      if (err) {
        return res.status(400).send({ message: "Delete todo failed: " + err });
      }
      return res.end(result);
    });
  });

  // update a todo
  app.put('/api/todo/:id', function (req, res) {
    let id = req.params.id;
    let todo = req.body
    Todos.update(todo, (err, result) => {
      if (err) {
        return res.status(400).send({ message: "Update todo failed: " + err });
      }
      return res.end(result);
    });
  });

  // toggle all todos
  app.patch('/api/todos', function (req, res) {
    let isCompleted = req.body.isCompleted;
    Todos.toggleAll(isCompleted, (err, result) => {
      if (err) {
        return res.status(400).send({ message: "Toggle all todo failed: " + err });
      }
      return res.end(result);
    });
  });

  // delete all completed todos
  app.delete('/api/todos', function (req, res) {
    Todos.removeCompleted((err, result) => {
      if (err) {
        return res.status(400).send({ message: "Remove completed all todo failed: " + err });
      }
      return res.end(result);
    });
  });

};