import api from "./axios";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};
export const auth = async (loginData) => {
  const response = await api.post("/users", loginData);
  return response.data;
};
export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};
export const getUser = async () => {
  const response = await api.get("/users/:id");
  return response.data;
};
export const deleteUser = async () => {
  const response = api.delete("/users/:id");
  return response.data;
};
