
const express = require('express');
const router  = express.Router();

module.exports = (dataHelpers) => {

  router.get("/", (req, res) => {
    dataHelpers.getTodo((todo) => {
      if(err){
        res.status(500).json({ error: err.message});
      } else {
        res.json(todo);
      }
    });
  });

  router.post("/", (req, res) => {
    dataHelpers.postTodo(todo, (err) =>{
      if(err){
        res.status(500).json({ error: err.message});
      } else {
        res.status(201).send();
      }
    });
  });

  return router;
}
