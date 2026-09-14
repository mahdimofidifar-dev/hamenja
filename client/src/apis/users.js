import api from "./axios";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};
export const requestOtp = async (phone) => {
  const response = await api.post("/users/auth/request-otp", phone);
  return response.data;
};
export const checkOtp = async (data) => {
  const response = await api.post("/users/auth/check-otp", data);
  return response;
};
export const signIn = async (data) => {
  const response = await api.post("/users/auth/sign-in", data);
  return response;
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
export const checkUser = async () => {
  const response = api.get("/users/check-user");
};
