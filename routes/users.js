"use strict";

const express = require('express');
const router = express.Router();

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
              res.json(results);
            });
        })
    }
  });

  router.post("/", (req, res) => {
    if (req.session.username) {
      const user = req.session.username;
      knex
        .select("id")
        .from("users")
        .where("username", user)
        .then((result) => {
          knex('todos')
            .insert([{ name: req.body.name }, { category: req.body.category }, { user_id: user }])
        });

    }
  })

  router.delete("/item/:itemID", (req) => {
    const itemID = Number(req.params.itemID);
    knex('todos')
      .where('id', itemID)
      .del()
      .then(() => {
      }).catch((error) => {
        console.error(error);
      })
  });

  // User profiles
  router.post("/profile/:username/changename", (req, res) => {
    const username = req.session.username;
    const newUsername = req.body.newUsername;

  });
  router.post("/profile/:username/personalise", (req, res) => {
    const username = req.session.username;

  })

router.post("/profile/:username/delete", (req, res) => {
  const username = req.session.username;
  if (req.body.deleteRequest === "Delete Account") {
    console.log(username, 'attemted to delete their account!')
    res.status(423).send("SECURITY ALERT: Action Blocked - Please try again in 24 hours");
    return;
  }
  res.status(406).send('ERROR: You must enter "Delete Account" in the text box to delete your account')
})

return router;
}
