const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const User = require("./models/user"); 
const Todo = require("./models/todo"); // Ensure you create this model below

const app = express();
const PORT = 3000;
const url = "mongodb://localhost:27017/todo_app";

mongoose.connect(url)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// Middleware to check if user is logged in
function isAuthenticated(req, res, next) {
    if (req.session.username) {
        return next();
    }
    // If client is accessing API, respond with 401
    if (req.originalUrl.startsWith('/todos')) {
        return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    // Otherwise, redirect HTML page requests
    res.redirect("/login.html");
}

// Global Middleware
app.use((req, res, next) => {
    console.log(`  ${req.method} ${req.url}`);
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public")); // Static files served from /public
app.use(
    session({
        secret: "secretkey",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 600000 } 
    })
);

// --- AUTHENTICATION ROUTES ---

// Registration
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userExist = await User.findOne({ username });
        if (userExist) {
            return res.json({ success: false, message: "Username already exists." });
        }
        const hash = await bcrypt.hash(password, 10);
        await User.create({ username, password: hash });
        console.log("✔ User registered:", username);
        // Success: Redirect to login page
        res.json({ success: true, redirect: "/login.html" }); 
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." });
    }
});

// Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.json({ success: false, message: "Invalid username." });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.json({ success: false, message: "Wrong password." });
    }

    req.session.username = username;
    console.log(" Login success:", username);
    // Success: Redirect to protected page
    res.json({ success: true, redirect: "/todolist" });
});

// Logout
app.get("/logout", (req, res) => {
    console.log(" User logged out:", req.session.username);
    req.session.destroy();
    res.redirect("/login.html");
});

// --- TO-DO CRUD ROUTES ---

// To-Do protected page (serves the HTML file)
app.get("/todolist", isAuthenticated, (req, res) => {
    console.log(" Opening To-Do List page:", req.session.username);
    // Correctly serves the dedicated todolist.html file
    res.sendFile(path.join(__dirname, "public", "todolist.html")); 
});

// GET Todos
app.get('/todos', isAuthenticated, async (req, res) => {
    const user = await User.findOne({ username: req.session.username });
    if (!user) return res.json([]); 
    try {
        const todos = await Todo.find({ userId: user._id });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch todos." });
    }
});

// ADD Todo
app.post('/todos', isAuthenticated, async (req, res) => {
    const user = await User.findOne({ username: req.session.username });
    try {
        const newTodo = new Todo({ text: req.body.text, userId: user._id, done: false });
        await newTodo.save();
        res.json({ success: true, todo: newTodo });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add todo." });
    }
});

// TOGGLE Todo status
app.post('/todos/toggle', isAuthenticated, async (req, res) => {
    const { id } = req.body;
    try {
        const todo = await Todo.findById(id);
        if (todo) {
            todo.done = !todo.done;
            await todo.save();
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to toggle status." });
    }
});

// DELETE Todo
app.post('/todos/delete', isAuthenticated, async (req, res) => {
    const { id } = req.body;
    try {
        await Todo.findByIdAndDelete(id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete todo." });
    }
});


// Fallback route handler (redirects root to login)
app.get("/", (req, res) => res.redirect("/login.html"));

// Start Server
app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});