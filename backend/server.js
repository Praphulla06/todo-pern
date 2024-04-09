import express from "express";
import { config } from "dotenv";
import pool from "./database.js";

const app = express();
const PORT = process.env.PORT || 5000;

config();
app.use(express.json());

app.post("/", async (req, res) => {
  const tasks = req.body;
  if (!Array.isArray(tasks) || !tasks.length)
    return res.status(400).json({ error: "No tasks provided" });
  try {
    for (const task of tasks) {
      const { task_name, task_description } = task;
      const newTask = await pool.query(
        "INSERT INTO todo_task (task_name, task_description) VALUES ($1, $2) RETURNING *",
        [task_name, task_description]
      );
    }
    res.status(200).json({ message: "Added Task" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error occurred while creating new tasks!" });
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productExists = await pool.query(
      "SELECT * FROM todo_task WHERE task_id = $1",
      [id]
    );
    if (!productExists.rows.length)
      return res.status(404).json({ error: "Task Not Found" });
    const task = await pool.query(
      "SELECT * FROM todo_task WHERE task_id = $1",
      [id]
    );
    res.status(200).json(task.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/", async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM todo_task");
    res.status(200).json(allTasks.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error" });
  }
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const tasks = req.body;
  if (!Array.isArray(tasks) || tasks.length === 0)
    return res.status(400).json({ error: "No tasks provided" });
  try {
    for (const task of tasks) {
      const { task_name, task_description } = tasks;
      const taskExists = await pool.query(
        "SELECT * FROM todo_task WHERE task_id = $1",
        [id]
      );
      if (!taskExists.rows.length)
        return res.status(404).json({ error: "Task Not Found" });
      const editedTask = await pool.query(
        "UPDATE todo_task SET (task_name, task_description) = ($1, $2) WHERE task_id = $3 RETURNING *",
        [task_name, task_description, id]
      );
      res.status(200).json({ message: "Task Updated!" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Task Failed To Update!" });
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productExists = await pool.query(
      "SELECT * FROM todo_task WHERE task_id = $1",
      [id]
    );
    if (!productExists.rows.length)
      return res.status(400).json({ error: "Task Does Not Exist" });
    const deletedTask = await pool.query(
      "DELETE FROM todo_task WHERE task_id = $1 RETURNING *",
      [id]
    );
    res.status(200).json({ message: "Task Deleted Successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error Deleting Task" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
