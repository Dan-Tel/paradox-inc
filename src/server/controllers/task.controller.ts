import type { Request, Response } from "express";
import { DB } from "../db/db";

const db = DB.getInstance();

export async function getTasksByUserId(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    res.json({ tasks: db.getTasks(userId) });
  } catch {
    return res.status(400).json({ message: "Failed to get tasks" });
  }
}

export async function addTask(req: Request, res: Response) {
  try {
    const { userId, task } = req.body;
    db.addTask(userId, task);
    res.json({ message: "Task added" });
  } catch {
    return res.status(400).json({ message: "Failed to add task" });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const { userId, taskId } = req.params;
    db.deleteTask(userId, taskId);
    res.json({ message: "Task deleted" });
  } catch {
    return res.status(400).json({ message: "Failed to delete task" });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const { task } = req.body;
    const { userId, taskId } = req.params;
    db.updateTask(userId, taskId, task);
    res.json({ message: "Task updated" });
  } catch {
    return res.status(400).json({ message: "Failed to update task" });
  }
}
