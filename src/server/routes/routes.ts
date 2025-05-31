import type { RequestHandler } from "express";
import { Router } from "express";
export const router = Router();

import { register, login, check } from "../controllers/auth.controller";
import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
} from "../controllers/task.controller";

router.post("/register", register as unknown as RequestHandler);
router.post("/login", login as unknown as RequestHandler);
router.post("/check", check as unknown as RequestHandler);
router.get("/users/:userId/tasks", getTasks as unknown as RequestHandler);
router.post("/users/:userId/tasks", addTask as unknown as RequestHandler);
router.delete(
  "/users/:userId/tasks/:taskId",
  deleteTask as unknown as RequestHandler
);
router.put(
  "/users/:userId/tasks/:taskId",
  updateTask as unknown as RequestHandler
);
