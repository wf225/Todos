let Todos = require("./Todos");

module.exports = function (app) {

  // RESTful api --------------------------------------------------------------

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
  app.delete('/api/todo/:todoId', function (req, res) {
    let todo_id = req.params.todoId;
    Todos.remove(todo_id, (err, result) => {
      if (err) {
        return res.status(400).send({ message: "Delete todo failed: " + err });
      }
      return res.end(result);
    });
  });

  // update a todo
  app.put('/api/todo/:todoId', function (req, res) {
    let todo_id = req.params.todoId;
    let todo = req.body
    Todos.update(todo, (err, result) => {
      if (err) {
        return res.status(400).send({ message: "Update todo failed: " + err });
      }
      return res.end(result);
    });
  });

  // toggle all todos
  app.put('/api/todos', function (req, res) {
    let checked = req.body.checked;
    Todos.toggleAll(checked, (err, result) => {
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