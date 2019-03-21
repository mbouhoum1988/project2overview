var db = require("../models");
var path = require("path");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/index.html"));
  });

  app.get("/recipeSearch", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/recipesearch.html"));
  });

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/login.html"));
  });

  app.get("/register", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/signup.html"));
  });

  app.get("*", function(req, res) {
    res.redirect("/");
  });

  app.post("/api/food", function(req, res) {
    db.Example.create({
      text: req.body.text,
      description: req.body.description
    }).then(function(addfood) {
      res.json(addfood);
    });
  });
};
