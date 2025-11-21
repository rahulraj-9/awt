const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const User = require("./models/user");

const app = express();
const PORT = 3000;
const url = "mongodb://localhost:27017/todo_app";

mongoose.connect(url)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// Middleware
app.use((req, res, next) => {
  console.log(`  ${req.method} ${req.url}`);
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.get("/", (req, res) => res.redirect("/login.html"));

// Registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userExist = await User.findOne({ username });

  if (userExist) {
    console.log("❗ Registration failed → user exists");
    return res.send("User already exists! <a href='/register.html'>Try again</a>");
  }

  const hash = await bcrypt.hash(password, 10);
  await User.create({ username, password: hash });

  console.log("✔ User registered:", username);
  res.redirect("/login.html");
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    console.log(" Login failed → username not found");
    return res.send("Invalid username. <a href='/login.html'>Try again</a>");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    console.log(" Login failed → wrong password");
    return res.send("Wrong password. <a href='/login.html'>Try again</a>");
  }

  req.session.username = username;
  console.log(" Login success:", username);
  res.redirect("/todolist");
});

// To-Do page (protected route)
app.get("/todolist", (req, res) => {
  if (!req.session.username) return res.redirect("/login.html");
  console.log(" Opening To-Do List page:", req.session.username);
  res.sendFile(__dirname + "/public/todolist.html");
});

// Logout
app.get("/logout", (req, res) => {
  console.log(" User logged out:", req.session.username);
  req.session.destroy();
  res.redirect("/login.html");
});

// Start Server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
  console.log(` Login page:  http://localhost:${PORT}/login.html`);
  console.log(` Register page: http://localhost:${PORT}/register.html`);
  console.log(` To-Do List page: http://localhost:${PORT}/todolist`);
});
