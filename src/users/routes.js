const express = require("express");
const passport = require("passport");
const {
  checkAuthenticated,
  checkNotAuthenticated,
  registerUser,
} = require("./controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/users/register", checkAuthenticated, (req, res) => {
  res.render("register");
});

router.get("/users/login", checkAuthenticated, (req, res) => {
  res.render("login");
});

router.get("/users/dashboard", checkNotAuthenticated, (req, res) => {
  const userName = req.user ? req.user.name : "Guest";
  res.render("dashboard", { user: userName });
});

router.get("/users/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    req.flash("success_message", "You have logged out");
    res.redirect("/users/login");
  });
});

router.post("/users/register", registerUser);

router.post(
  "/users/login",
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);

module.exports = router;
