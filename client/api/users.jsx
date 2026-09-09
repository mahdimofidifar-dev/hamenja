import api from "./axios";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};
export const auth = async (loginData) => {
  const response = await api.post("/users", loginData);
  return response.data;
};
