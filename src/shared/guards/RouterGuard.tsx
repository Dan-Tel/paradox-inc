import { useEffect, useState, type JSX } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getAccessToken } from "../utils/accessToken";
import axios from "axios";
import type { User } from "../../modules/auth/types/user.model";

interface Props {
  children: JSX.Element;
}

interface Response {
  user: User;
}

async function getAuthenticatedUser() {
  const accessToken = getAccessToken();

  try {
    const res = await axios.post<Response>("http://localhost:5000/api/check", {
      accessToken,
    });

    return res.data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    }
  }
}

export function PublicRoutes({ children }: Props) {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function verifyAccessToken() {
      const user = await getAuthenticatedUser();

      if (user) {
        setUserId(user.id);
      }
    }

    verifyAccessToken();
  }, []);

  if (userId) {
    return <Navigate to={`/users/${userId}/tasks`} />;
  }

  return children;
}

export function ProtectedRoutes({ children }: Props) {
  const [userId, setUserId] = useState(useParams().userId);

  useEffect(() => {
    async function verifyAccessToken() {
      const user = await getAuthenticatedUser();

      if (!user) {
        setUserId("");
      }
    }

    verifyAccessToken();
  }, []);

  if (!userId) {
    return <Navigate to={`/register`} />;
  }

  return children;
}
