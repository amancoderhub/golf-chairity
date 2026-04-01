import { apiClient } from "./api.js";

export const subscriptionService = {
  myStatus: async () => {
    const { data } = await apiClient.get("/api/subscriptions/me");
    return data;
  },
  checkout: async (plan) => {
    const { data } = await apiClient.post("/api/subscriptions/checkout-session", { plan });
    return data;
  }
};
