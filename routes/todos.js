
const express = require('express');
const router = express.Router();

module.exports = (dataHelpers) => {
  router.get("/", function (req, res) {
    dataHelpers.getTodo((todo) => {
      res.json(todo);
    });
  });

  router.post("/", function (req, res) {
    console.log(req.body)
    const todo = req.body.todo;
    console.log(todo);
    dataHelpers.postTodo(todo, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        console.log("HEREME");
        res.status(201).send();
      }
    });
  });

  return router;
}
