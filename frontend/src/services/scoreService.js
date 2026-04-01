import { apiClient } from "./api.js";

export const scoreService = {
  list: async () => {
    const { data } = await apiClient.get("/api/game/scores");
    return data;
  },
  create: async (payload) => {
    const { data } = await apiClient.post("/api/game/scores", payload);
    return data;
  },
  adminList: async () => {
    const { data } = await apiClient.get("/api/game/admin/scores");
    return data;
  }
};
