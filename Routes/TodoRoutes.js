const { addTodo, GetTodos, UpdateTodo, DeleteTodo, CompletedTodos }=require("../Controllers/TodoControllers")
const router = require("express").Router();

router.post('/add-todo', addTodo)
router.get("/tasks", GetTodos)
router.put("/tasks/:id", UpdateTodo)
router.delete("/tasks/:id", DeleteTodo)
router.get("/completed",CompletedTodos)
module.exports= router;