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
export const getAllBusinessOfCategory = async (key) => {
  const response = await api.get(`/business/category/${key}`);
  return response.data;
};
export const updateBusiness = async (id, updateData) => {
  const response = await api.put(`/business/${id}`, updateData);
  return response.data;
};
export const deleteBusiness = async (id) => {
  const response = await api.delete(`/business/${id}`);
  return response.data;
};
