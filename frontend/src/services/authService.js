import { apiClient } from "./api.js";

export const authService = {
  signup: async (payload) => {
    const { data } = await apiClient.post("/api/auth/register", payload);
    return data;
  },
  login: async (payload) => {
    const { data } = await apiClient.post("/api/auth/login", payload);
    return data;
  },
  forgotPassword: async (payload) => {
    const { data } = await apiClient.post("/api/auth/forgot-password", payload);
    return data;
  },
  resetPassword: async (payload) => {
    const { data } = await apiClient.post("/api/auth/reset-password", payload);
    return data;
  },
  me: async () => {
    const { data } = await apiClient.get("/api/auth/me");
    return data;
  },
  listUsers: async () => {
    const { data } = await apiClient.get("/api/auth/admin/users");
    return data;
  },
  updateRole: async (id, role) => {
    const { data } = await apiClient.put(`/api/auth/admin/users/${id}/role`, { role });
    return data;
  },
  updateProfile: async (payload) => {
    const { data } = await apiClient.put("/api/auth/profile", payload);
    return data;
  }
};
