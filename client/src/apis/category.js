import api from "./axios";
export const getAllCategories = async () => {
  const response = await api.get("/category");
  return response.data;
};
export const getCategory = async (uniqName) => {
  const response = await api.get(`/category/${uniqName}`);
  return response.data;
};
export const addCategories = async (data) => {
  const response = await api.post("/category", data);
  return response.data;
};
