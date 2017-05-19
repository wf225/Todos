// let Todos = require("./TodosJson");
let Todos = require("./TodosService");

module.exports = function (app) {

  // RESTful api --------------------------------------------------------------
  // get all todos
  app.get('/api/todos', function (req, res) {
    Todos.getAll((err, result) => {
      if (err) res.send(err);
      return res.status(200).json(result);
    });
  });

  // create a todo
  app.post('/api/todo', function (req, res) {
    let item = req.body
    Todos.add(item, (err, result) => {
      if (err) {
        return res.status(400).json({ message: "Add todo failed: " + err.message });
      }
      return res.status(200).json(result);
    });
  });

  // delete a todo
  app.delete('/api/todo/:id/:title', function (req, res) {
    let id = req.params.id;
    let title = req.params.title;
    Todos.remove(id, title, (err, result) => {
      if (err) {
        return res.status(400).json({ message: "Delete todo failed: " + err });
      }
      return res.status(200).json(result);
    });
  });

  // update a todo
  app.put('/api/todo/:id', function (req, res) {
    let id = req.params.id;
    let todo = req.body
    Todos.update(todo, (err, result) => {
      if (err) {
        return res.status(400).json({ message: "Update todo failed: " + err });
      }
      return res.status(200).json(result);
    });
  });

  // toggle all todos
  app.patch('/api/todos', function (req, res) {
    let isCompleted = req.body.isCompleted;
    Todos.toggleAll(isCompleted, (err, result) => {
      if (err) {
        return res.status(400).json({ message: "Toggle all todo failed: " + err });
      }
      return res.status(200).json(result);
    });
  });

  // delete all completed todos
  app.delete('/api/todos', function (req, res) {
    Todos.removeCompleted((err, result) => {
      if (err) {
        return res.status(400).json({ message: "Remove completed all todo failed: " + err });
      }
      return res.status(200).json(result);
    });
  });

};