const bcrypt = require('bcryptjs');
const pool = require("../../db");
const queries = require("./queries");

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/dashboard");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/users/login");
  }
}

async function registerUser(req, res) {
  let { name, email, password, password2 } = req.body;

  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password should be at least 6 characters" });
  }

  if (password != password2) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.render("register", { errors });
  } else {
    let hashedPassword = await bcrypt.hash(password, 10);

    pool.query(queries.getUserByEmail, [email], (error, results) => {
      if (error) throw error;

      if (results.rows.length > 0) {
        errors.push({ message: "Email already exists." });
        res.render("register", { errors });
      } else {
        pool.query(
          queries.insertUser,
          [name, email, hashedPassword],
          (error, results) => {
            if (error) throw error;
            req.flash("success_message", "You are registered, please log in");
            res.redirect("/users/login");
          }
        );
      }
    });
  }
}

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
  registerUser,
};
