import express from "express";
import { config } from "dotenv";
import pool from "./database.js";

const app = express();
const PORT = process.env.PORT || 5000;

config();

app.get("/", (req, res) => {
  res.send("This is a Todo-App!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
