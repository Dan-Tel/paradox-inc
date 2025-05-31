import { type SubmitHandler, useForm } from "react-hook-form";

import styles from "./TaskItem.module.css";

import type { Task } from "../types/task.model";

interface Props {
  task: Task;
  editingMode: boolean;
  handleDeleteTask: (taskId: string) => void;
  handleSaveTask: (task: Task) => void;
  handleEditTask: (taskId: string) => void;
}

interface FormInput {
  status: "todo" | "in progress" | "done";
  title: string;
  description: string;
}

function TaskItem({
  task,
  editingMode,
  handleDeleteTask,
  handleSaveTask,
  handleEditTask,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormInput>({
    mode: "onChange",
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (newTask) => {
    handleSaveTask({
      ...task,
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      updatedAt: new Date().toString(),
    });
  };

  const { title, description } = getValues();

  return (
    <li className={styles["task-item"]}>
      {editingMode ? (
        <>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <select
              {...register("status")}
              className={styles.status}
              defaultValue={task.status}
            >
              <option value="todo">Todo</option>
              <option value="in progress">In progress</option>
              <option value="done">Done</option>
            </select>

            <div className={styles.content}>
              <input
                className={styles.title}
                type="text"
                placeholder="Title"
                {...register("title", { required: true })}
              />
              <textarea
                className={styles.description}
                placeholder="Description"
                {...register("description", { required: true })}
              />
              {Object.keys(errors).length !== 0 && (
                <p className={styles.error}>Inputs mustn't be empty!</p>
              )}
            </div>

            <button className={styles.save}>Save</button>
          </form>

          <button
            className={styles.delete}
            onClick={() => handleDeleteTask(task.id)}
          >
            x
          </button>
        </>
      ) : (
        <>
          <p className={styles.status}>{task.status}</p>

          <div className={styles.content}>
            <h4 className={styles.title}>{title}</h4>
            <p className={styles.description}>{description}</p>
          </div>

          <button
            className={styles.edit}
            onClick={() => handleEditTask(task.id)}
          >
            Edit
          </button>

          <button
            className={styles.delete}
            onClick={() => handleDeleteTask(task.id)}
          >
            x
          </button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
