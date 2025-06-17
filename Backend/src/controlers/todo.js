const Todo = require("../models/Todo");

// add a new task
const addNewTask = async (req, res) => {
  const {
    title,
    description,
    status,
    priority
  } = req.body;

  try {
const isAlreadyExist = await Todo.findOne({title})
if(isAlreadyExist) return res.status(400).json({message: "can not add duplicate task!"})

    const todo = new Todo({
      title,
      description,
      status,
      priority,
      userId : req.user?.userId
    });
    const newTaks = await todo.save();
    res.status(201).json({ message: "task added success", newTaks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getTask = async (req, res) => {
  const {status,priority,createdAt} = req.query

  const filter = { userId: req.user?.userId };

  if (status) {
    filter.status = status; // add status filter if provided
  }
  if (priority) {
    filter.priority = priority; // add priority filter if provided
  }
  if (createdAt) {
    filter.createdAt = createdAt; // add createdAt filter if provided
  }

  try {
    const yourTasks = await Todo.find(filter);

    res.json({ yourTasks});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// edit task
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.userId;
  try {
    const task = await Todo.findOneAndUpdate(
      { _id: taskId, userId },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task Not found" });
    res
      .status(201)
      .json({ message: "task updated success", updatedTask: task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

// delete task
const removeTask = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.userId;

  try {
    const task = await Todo.findOneAndDelete({ _id: taskId, userId });
    if (!task) return res.status(404).json({ message: "Task Not found" });
    res
      .status(201)
      .json({ message: "task removed success", removedTask: task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};
module.exports = { addNewTask, getTask, updateTask, removeTask };
