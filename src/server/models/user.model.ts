import type { Task } from "./task.model";

export interface User {
  id: string;
  email: string;
  password: string;
  tasks: Task[];
}
