import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import "./index.css";

import RegistrationForm from "./modules/auth/components/RegistrationForm.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/register" /> },
  {
    path: "/register",
    element: <RegistrationForm />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
