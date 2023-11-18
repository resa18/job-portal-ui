import axios from "axios";

const baseURL = "http://localhost:3000/api"; // Replace with your NodeJS server URL

const api = axios.create({
  baseURL,
});

export const login = (credentials) => api.post("/login", credentials);
export const getJobs = (params) => api.get("/jobs", { params });
export const getJobDetail = (id) => api.get(`/job/${id}`);

export default api;
