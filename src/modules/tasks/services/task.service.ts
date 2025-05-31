import axios from "axios";
import type { Task } from "../types/task.model";
import { getAccessToken } from "../../../shared/utils/accessToken";

const API_BASE_URL = "http://localhost:5000/api";

interface Response {
  tasks: Task[];
}

function authHeader() {
  const token = getAccessToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function getTasks(userId: string) {
  return axios.get<Response>(
    `${API_BASE_URL}/users/${userId}/tasks`,
    authHeader()
  );
}

export async function addTask(userId: string, task: Task) {
  return axios.post(
    `${API_BASE_URL}/users/${userId}/tasks`,
    {
      userId,
      task,
    },
    authHeader()
  );
}

export async function deleteTask(userId: string, taskId: string) {
  return axios.delete(
    `${API_BASE_URL}/users/${userId}/tasks/${taskId}`,
    authHeader()
  );
}

export async function updateTask(userId: string, task: Task) {
  return axios.put(
    `${API_BASE_URL}/users/${userId}/tasks/${task.id}`,
    {
      task,
    },
    authHeader()
  );
}
