const express = require("express");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

router.get("/", authenticate, async (req, res) => {
  const tasks = await Task.getTasksByUser(req.userId);
  res.json(tasks);
});

router.post("/", authenticate, async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.createTask(title, description, req.userId);
  res.json(task);
});

router.put("/:id", authenticate, async (req, res) => {
  const task = await Task.updateTask(req.params.id, req.body);
  res.json(task);
});

router.delete("/:id", authenticate, async (req, res) => {
  await Task.deleteTask(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
