import { useEffect, useState } from "react";
import { deleteAccessToken } from "../../../shared/utils/accessToken";
import { useNavigate, useParams } from "react-router-dom";
import { type SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import type { Task } from "../types/task.model";
import TaskItem from "./TaskItem";
import * as taskService from "../services/task.service";

import styles from "./TaskList.module.css";

interface FormInput {
  title: string;
  description: string;
}

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterBy, setFilterBy] = useState("any");
  const [editingId, setEditingId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { userId = "" } = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onChange",
  });

  useEffect(() => {
    handleGetTasks();
  }, [userId]);

  const onSubmit: SubmitHandler<FormInput> = (newTask) => {
    handleAddTask(newTask.title, newTask.description);
  };

  function handleLogout() {
    deleteAccessToken();
    navigate("/registration");
  }

  async function handleGetTasks() {
    setIsLoading(true);

    try {
      const res = await taskService.getTasks(userId);
      setTasks(res.data.tasks);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
      handleLogout();
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddTask(title: string, description: string) {
    const task: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: "todo",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };

    try {
      await taskService.addTask(userId, task);
      await handleGetTasks();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
    }
  }

  async function handleDeleteTask(taskId: string) {
    setEditingId("");

    try {
      await taskService.deleteTask(userId, taskId);
      await handleGetTasks();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
    }
  }

  async function handleSaveTask(task: Task) {
    setEditingId("");

    try {
      await taskService.updateTask(userId, task);
      await handleGetTasks();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
    }
  }

  function handleEditTask(taskId: string) {
    setEditingId(taskId);
  }

  function getFilteredTask() {
    return tasks.filter((t) => t.status === filterBy || filterBy === "any");
  }

  const loadingMessage = isLoading ? <h4>Loading...</h4> : null;
  const tasksEmptyMessage =
    getFilteredTask().length === 0 && !loadingMessage ? (
      <h4>No tasks yet :(</h4>
    ) : null;
  const filterOptions = !loadingMessage ? (
    <div>
      Filter by status :
      <select
        className={styles.filter}
        value={filterBy}
        onChange={(e) => setFilterBy(e.target.value)}
      >
        <option value="any">Any</option>
        <option value="todo">Todo</option>
        <option value="in progress">In progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  ) : null;
  const tasksList =
    !tasksEmptyMessage && !loadingMessage ? (
      <ul className={styles["task-list"]}>
        {getFilteredTask().map((t) => (
          <TaskItem
            key={t.id}
            task={t}
            editingMode={t.id === editingId}
            handleDeleteTask={handleDeleteTask}
            handleSaveTask={handleSaveTask}
            handleEditTask={handleEditTask}
          />
        ))}
      </ul>
    ) : null;

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h3>Something new for today?</h3>

        <label>Title</label>
        <input type="text" {...register("title", { required: true })} />

        <label>Description</label>
        <textarea {...register("description", { required: true })} />

        <button className={styles.add}>Add task</button>

        {Object.keys(errors).length !== 0 && (
          <p className={styles.error}>Inputs mustn't be empty!</p>
        )}
      </form>

      <h3>Task List</h3>
      {loadingMessage}
      {filterOptions}
      {tasksEmptyMessage}
      {tasksList}

      <button className={styles.logout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default TaskList;
