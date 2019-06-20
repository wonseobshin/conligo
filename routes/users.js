"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    if (req.session.username) {
      const user = req.session.username;
      knex
        .select("id")
        .from("users")
        .where("username", user)
        .then((result) => {
          knex
            .select("*")
            .from("todos")
            .where("user_id", result[0].id)
            .then((results) => {
              console.log(results)
              res.json(results);
          });
        })
    }
  });

  return router;
}
