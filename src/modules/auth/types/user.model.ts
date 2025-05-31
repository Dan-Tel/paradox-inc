import type { Task } from "../../tasks/types/task.model";

export interface User {
  id: string;
  email: string;
  password: string;
  tasks: Task[];
}
