"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const cookieSession = require('cookie-session')

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');


app.use(cookieSession({
  name: 'session',
  keys: ['compile'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
///
const dataHelpers = require("./dataHelpers/apiCalls")(knex);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

function getImages(username, callback) {
  dataHelpers.getImages(username, callback)
}

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  const templateVars = {
    username: null,
    profilePic: "/images/dp.png"
  }
  if (req.session.username) {
    templateVars.username = req.session.username;
    getImages(req.session.username, (images) => {
      if (images.profile_pic) {
        templateVars.profilePic = images.profile_pic;
      }
      if (images.background_pic) {
        templateVars.background = images.background_pic;
      }
      res.render("index", templateVars);
    });
    return;
  }
  res.redirect("/login");

});
///FOR POSTING AND GETTING TODOS
// app.post("/todos", (req, res) => {
//   res.redirect("/todos");
// });

// Login Page
app.get("/login", (req, res) => {
  const templateVars = {
    username: null,
    profilePic: "/images/dp.png"
  }
  if (req.session.username) {
    templateVars.username = req.session.username;
    getImages(req.session.username, (images) => {
      if (images.profile_pic) {
        templateVars.profilePic = images.profile_pic;
      }
      if (images.background_pic) {
        templateVars.background = images.background_pic;
      }
      res.render("index", templateVars);
    });
    return;
  }
  res.render("login", templateVars);
});
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  req.session.username = username;
  res.redirect("/");
})
app.post("/register", (req, res) => {
  const username = req.body.username;
  const userData = {
    username: username,
    password: req.body.password,
    firstName: req.body.username,
    lastName: req.body.lName,
    email: req.body.email
  }

  req.session.username = username;
  res.redirect("/");
})

app.get("/logout", (req, res) => {
  delete (req.session.username);
  res.redirect("/");
})
// Profile Page
app.get("/profile", (req, res) => {
  const templateVars = {
    username: null,
    profilePic: "/images/dp.png"
  }
  if (req.session.username) {
    templateVars.username = req.session.username;
    templateVars.username = req.session.username;
    getImages(req.session.username, (images) => {
      if (images.profile_pic) {
        templateVars.profilePic = images.profile_pic;
      }
      if (images.background_pic) {
        templateVars.background = images.background_pic;
      }
      res.render("profile", templateVars);
    });
    return;
  }
  res.redirect("/");
})

app.post("/todos", (req, res) => {
  if (req.body.todo.length < 2 || req.body.todo.length > 40) {
    res.redirect("/");
    return;
  }
  dataHelpers.newtodo(req.body.todo, req.session.username, () => {

    (res.redirect("/"));
  })
})
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
