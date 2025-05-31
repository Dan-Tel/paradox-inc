import type { Task } from "../models/task.model";
import type { User } from "../models/user.model";

export class DB {
  private static instance: DB;
  private users: User[] = [];

  static getInstance() {
    if (!DB.instance) {
      DB.instance = new DB();
    }

    return DB.instance;
  }

  getUserById(userId: string) {
    return this.users.find((u) => u.id === userId);
  }

  findUser(email: string) {
    return this.users.find((u) => u.email == email);
  }

  addUser(user: User) {
    this.users.push(user);
  }

  getTasks(userId: string) {
    const user = this.getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user.tasks;
  }

  addTask(userId: string, task: Task) {
    const user = this.getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.tasks.push(task);
  }

  deleteTask(userId: string, taskId: string) {
    const user = this.getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.tasks = user.tasks.filter((t) => t.id !== taskId);
  }

  updateTask(userId: string, taskId: string, updatedTask: Task) {
    const user = this.getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.tasks = user.tasks.map((t) => (t.id === taskId ? updatedTask : t));
  }
}
