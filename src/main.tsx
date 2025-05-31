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
import NotFound from "./shared/pages/NotFound.tsx";
import { ProtectedRoutes, PublicRoutes } from "./shared/guards/RouterGuard.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/register" /> },
  {
    path: "/register",
    element: (
      <PublicRoutes>
        <RegistrationForm />
      </PublicRoutes>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoutes>
        <LoginForm />
      </PublicRoutes>
    ),
  },
  {
    path: "/users/:userId/tasks",
    element: (
      <ProtectedRoutes>
        <TaskList />
      </ProtectedRoutes>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
