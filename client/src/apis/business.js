import api from "./axios";

export const addBusiness = async (businessData) => {
  const data = new FormData();

  Object.entries(businessData).forEach(([key, value]) => {
    if (key === "logo" || key === "gallery") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        data.append(key, item);
      });

      return;
    }

    if (value !== null && value !== undefined) {
      data.append(key, value);
    }
  });

  // Logo
  if (businessData.logo?.file) {
    data.append("logo", businessData.logo.file);
  }

  // Gallery
  businessData.gallery.forEach((image) => {
    if (image.file) {
      data.append("gallery", image.file);
    }
  });

  const response = await api.post("/business", data);

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
export const deleteBusiness = async (id) => {
  const response = await api.delete(`/business/${id}`);
  return response.data;
};
