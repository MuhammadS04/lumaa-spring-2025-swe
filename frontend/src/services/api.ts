import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = async (username: string, password: string) => {
  return api.post("/auth/register", { username, password });
};

export const loginUser = async (username: string, password: string) => {
  return api.post("/auth/login", { username, password });
};

export const fetchTasks = async (token: string) => {
  return api.get("/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTask = async (token: string, title: string, description: string) => {
  return api.post("/tasks", { title, description }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTask = async (token: string, id: number, updates: object) => {
  return api.put(`/tasks/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTask = async (token: string, id: number) => {
  return api.delete(`/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
