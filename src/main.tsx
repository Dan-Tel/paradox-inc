import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import "./index.css";

import RegistrationForm from "./modules/auth/components/RegistrationForm.tsx";
import LoginForm from "./modules/auth/components/LoginForm.tsx";
import TaskList from "./modules/tasks/components/TaskList.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/register" /> },
  {
    path: "/register",
    element: <RegistrationForm />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/users/:userId/tasks",
    element: <TaskList />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
