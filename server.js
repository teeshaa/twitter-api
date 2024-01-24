// Import required modules and libraries
const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");

// Import the function to initialize Passport configuration
const initializePassport = require("./passportConfig");

// Import routes from the "users" module
const routes = require("./src/users/routes");

// Create an Express application
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static(__dirname + "/public"));

// Parse incoming request bodies as URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// Configure session middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and use it for session management
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Use express-flash for displaying flash messages
app.use(flash());

// Mount the routes defined in the "users" module
app.use("/", routes);

// Start the server and listen on the specified port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
