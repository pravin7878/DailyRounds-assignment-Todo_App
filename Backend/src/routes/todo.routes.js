const express = require("express");
const {
  addNewTask,
  getTask,
  updateTask,
  removeTask,
} = require("../controlers/todo");
const { auth } = require("../middelware/auth");

const todoRouter = express.Router()

// add a new task
todoRouter.post("/" ,auth, addNewTask)

// get authenticated user Task 
todoRouter.get("/" ,auth, getTask)


// edit a task
todoRouter.patch("/:taskId" ,auth, updateTask)

// remove task
todoRouter.delete("/:taskId", auth, removeTask);

module.exports = todoRouter