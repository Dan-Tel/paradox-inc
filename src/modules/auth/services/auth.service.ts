import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

interface Response {
  userId: string;
  accessToken: string;
}

interface FormInput {
  email: string;
  password: string;
}

export async function register(user: FormInput) {
  return axios.post<Response>(`${API_BASE_URL}/register`, user);
}

export async function login(user: FormInput) {
  return axios.post<Response>(`${API_BASE_URL}/login`, user);
}
