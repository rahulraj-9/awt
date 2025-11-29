// ================================
// server.js (Refined Angular + Express + MongoDB To-Do App)
// ================================

const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// DATABASE
// ================================
mongoose.connect("mongodb://localhost:27017/todoApp")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Error:", err));

// ================================
// SCHEMAS
// ================================
const User = mongoose.model("User", new mongoose.Schema({
  name: { type: String, unique: true, required: true }
}));

const Task = mongoose.model("Task", new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}));

// ================================
// SERVE FRONTEND
// ================================
app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en" ng-app="todoApp">
<head>
<meta charset="UTF-8">
<title>AngularJS To-Do App</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>

</head>
<body ng-controller="MainController">

<div id="datetime"></div>

<!-- LOGIN SCREEN -->
<div class="container" ng-show="!currentUser">
  <h2>Welcome</h2>
  <select ng-model="selectedUser" ng-options="u for u in users">
    <option value="">-- Choose user --</option>
  </select>
  <input ng-model="newUser" placeholder="New user name">
  <button class="add" ng-click="login()">Login</button>
  <hr>
  <h3>Manage Users</h3>
  <ul>
    <li ng-repeat="u in users">
      {{ u }}
      <span>
        <button class="edit" ng-click="renameUser(u)">Rename</button>
        <button class="delete" ng-click="deleteUser(u)">Delete</button>
      </span>
    </li>
  </ul>
</div>

<!-- MAIN APP -->
<div class="container" ng-show="currentUser">
  <h2>Hello {{ currentUser }}</h2>
  <input ng-model="newTask" placeholder="New task...">
  <button class="add" ng-click="addTask()">Add</button>
  <ul>
    <li ng-repeat="t in tasks">
      <div class="task-info">
        <strong>{{ t.text }}</strong><br>
        <small class="time">{{ t.createdAt | date:'medium' }}</small>
      </div>
      <span>
        <button class="edit" ng-click="editTask(t)">Edit</button>
        <button class="delete" ng-click="removeTask(t)">Delete</button>
      </span>
    </li>
    <li ng-if="tasks.length === 0" class="no-items">No tasks yet.</li>
  </ul>
  <button class="logout" ng-click="logout()">Logout</button>
</div>

<script>
const app = angular.module("todoApp", []);

app.controller("MainController", function($scope, $http) {
  $scope.users = [];
  $scope.tasks = [];
  $scope.currentUser = null;

  function loadUsers() {
    $http.get("/api/users").then(res => $scope.users = res.data);
  }

  function loadTasks() {
    if (!$scope.currentUser) return;
    $http.get("/api/tasks/" + $scope.currentUser).then(res => $scope.tasks = res.data);
  }

  loadUsers();

  $scope.login = function() {
    const name = $scope.selectedUser || $scope.newUser;
    if (!name) return alert("Enter username");
    $http.post("/api/users", { name }).then(() => {
      $scope.currentUser = name;
      $scope.newUser = "";
      loadTasks();
      loadUsers();
    });
  };

  $scope.logout = function() {
    $scope.currentUser = null;
    $scope.tasks = [];
  };

  $scope.addTask = function() {
    if (!$scope.newTask) return;
    $http.post("/api/tasks", { user: $scope.currentUser, text: $scope.newTask })
      .then(() => { $scope.newTask = ""; loadTasks(); });
  };

  $scope.editTask = function(task) {
    const updated = prompt("Edit task:", task.text);
    if (!updated) return;
    $http.post("/api/tasks/edit", { id: task._id, text: updated }).then(loadTasks);
  };

  $scope.removeTask = function(task) {
    $http.post("/api/tasks/delete", { id: task._id }).then(loadTasks);
  };

  $scope.renameUser = function(oldName) {
    const newName = prompt("New name:", oldName);
    if (!newName) return;
    $http.post("/api/users/rename", { oldName, newName }).then(() => {
      if ($scope.currentUser === oldName) $scope.currentUser = newName;
      loadUsers();
      loadTasks();
    });
  };

  $scope.deleteUser = function(name) {
    if (!confirm("Delete user?")) return;
    $http.post("/api/users/delete", { name }).then(() => {
      if ($scope.currentUser === name) $scope.logout();
      loadUsers();
    });
  };
});
</script>

</body>
</html>`);
});

// ================================
// BACKEND API ROUTES
// ================================

// USERS
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users.map(u => u.name));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).send("Name required");
    if (!await User.findOne({ name })) await User.create({ name });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/users/rename", async (req, res) => {
  try {
    const { oldName, newName } = req.body;
    if (!oldName || !newName) return res.status(400).send("Invalid names");
    await User.updateOne({ name: oldName }, { name: newName });
    await Task.updateMany({ user: oldName }, { user: newName });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/users/delete", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).send("Name required");
    await User.deleteOne({ name });
    await Task.deleteMany({ user: name });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// TASKS
app.get("/api/tasks/:user", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.user }).lean();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { user, text } = req.body;
    if (!user || !text) return res.status(400).send("Invalid task");
    await Task.create({ user, text });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/tasks/edit", async (req, res) => {
  try {
    const { id, text } = req.body;
    if (!id || !text) return res.status(400).send("Invalid edit");
    await Task.findByIdAndUpdate(id, { text });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/tasks/delete", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).send("Invalid id");
    await Task.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ================================
// START SERVER
// ================================
app.listen(3000, () => console.log("🚀 App running at http://localhost:3000"));
