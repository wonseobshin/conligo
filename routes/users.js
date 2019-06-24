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

  router.delete("/item/:itemID", (req, res) => {
    const itemID = Number(req.params.itemID);
    knex('todos')
      .where('id', itemID)
      .del()
      .then(() => {
        res.status(202).json({});
      }).catch((error) => {
        console.error(error);
      })
  });

  router.put("/item/:itemID", (req, res) => {
    const itemID = req.params.itemID;
    const newCategory = req.body.newCategory;
    knex('todos')
      .where({ id: itemID })
      .update({ category: newCategory })
      .then(() => {
        console.log(`${itemID} category changed to ${newCategory}`)
        res.status(202).json({});
      })
  });

  // User profiles
  router.post("/profile/:username/editprofile", (req, res) => {
    const username = req.session.username;
    let newUsername = false;
    let newProfilePic = false;
    if (req.body.newUsername) {
      newUsername = req.body.newUsername;
    }
    if (req.body.newProfilePic) {
      newProfilePic = req.body.newProfilePic;
    }
    if (newUsername && newProfilePic) {
      knex
      knex('users')
        .where({ username: username })
        .update({ username: newUsername })
        .update({ profile_pic: newProfilePic })
        .then(() => {
          res.redirect("/profile")
        });
    }
    if (newUsername) {
      knex
      knex('users')
        .where({ username: username })
        .update({ username: newUsername })
        .then(() => {
          res.redirect("/profile")
        });
    }
    if (newProfilePic) {
      knex
      knex('users')
        .where({ username: username })
        .update({ profile_pic: newProfilePic })
        .then(() => {
          res.redirect("/profile")
        });
    }
  })

  router.post("/profile/:username/personalise", (req, res) => {
    const username = req.session.username;
    let newBackground = req.body.newBackground;

    knex('users')
      .where({ username: username })
      .update({ background_pic: newBackground })
      .then(() => {
        res.redirect("/profile")
      });

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
