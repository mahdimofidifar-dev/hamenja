import api from "./axios";
export const sendComment = async (data) => {
  const response = await api.post("/comment", data);
  return response.data;
};
