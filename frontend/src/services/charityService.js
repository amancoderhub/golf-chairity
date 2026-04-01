import { apiClient } from "./api.js";

export const charityService = {
  list: async () => {
    const { data } = await apiClient.get("/api/game/charities");
    return data;
  },
  select: async (payload) => {
    const { data } = await apiClient.patch("/api/game/charities/select", payload);
    return data;
  },
  create: async (payload) => {
    const { data } = await apiClient.post("/api/game/charities", payload);
    return data;
  },
  update: async (id, payload) => {
    const { data } = await apiClient.put(`/api/game/charities/${id}`, payload);
    return data;
  },
  delete: async (id) => {
    const { data } = await apiClient.delete(`/api/game/charities/${id}`);
    return data;
  }
};
