import api from "./axios";

export const addBusiness = async (businessData) => {
  const response = await api.post("/business", businessData);
  return response.data;
};
export const getAllBusiness = async () => {
  const response = await api.get("/business");
  return response.data;
};
export const getOneBusiness = async (uniqName) => {
  const response = await api.get(`/business/${uniqName}`);
  return response.data;
};
export const updateBusiness = async (id, updateData) => {
  const response = await api.put(`/business/${id}`, updateData);
  return response.data;
};
