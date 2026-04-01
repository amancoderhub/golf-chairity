import { apiClient } from "./api.js";

export const drawService = {
  latest: async () => {
    const { data } = await apiClient.get("/api/game/draws/latest");
    return data;
  },
  myWinnings: async () => {
    const { data } = await apiClient.get("/api/game/draws/my-winnings");
    return data;
  },
  run: async (drawType = "random") => {
    const { data } = await apiClient.post("/api/game/draws/run", { drawType });
    return data;
  },
  publish: async (id) => {
    const { data } = await apiClient.put(`/api/game/draws/${id}/publish`);
    return data;
  },
  updateWinnerStatus: async (drawId, userId, paymentStatus) => {
    const { data } = await apiClient.put(`/api/game/draws/${drawId}/winners/${userId}/status`, { paymentStatus });
    return data;
  },
  submitProof: async (proof) => {
    const { data } = await apiClient.put("/api/game/draws/winners/proof", { proof });
    return data;
  }
};
