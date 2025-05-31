import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { type SubmitHandler, useForm } from "react-hook-form";
import { setAccessToken } from "../../../shared/utils/accessToken";
import * as authService from "../services/auth.service";

import styles from "./LoginForm.module.css";

interface FormInput {
  email: string;
  password: string;
}

function LoginForm() {
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormInput> = async (user) => {
    try {
      const res = await authService.login(user);

      const userId = res.data.userId;
      const accessToken = res.data.accessToken;

      setAccessToken(accessToken);

      navigate(`/users/${userId}/tasks`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setFormError(error.response?.data.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Login</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.wrapper}>
          <label>Email:</label>
          <input
            className={styles.input}
            type="text"
            placeholder="you@example.com"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <p className={styles.error}>Invalid email</p>}
        </div>

        <div className={styles.wrapper}>
          <label>Password:</label>
          <input
            className={styles.input}
            type="text"
            placeholder="at_most_20_chars"
            {...register("password", {
              required: true,
              maxLength: 20,
            })}
          />
          {errors.password && <p className={styles.error}>Invalid password</p>}
        </div>

        <button className={styles.submit}>Submit</button>
      </form>

      <p className={styles.error}>{formError}</p>

      <Link className={styles.link} to="/register">
        Go to registration
      </Link>
    </div>
  );
}

export default LoginForm;
