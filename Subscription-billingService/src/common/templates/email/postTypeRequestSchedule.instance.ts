import axios from "axios";

export const postTypeRequestEmail = () => {
  return axios.create({
    baseURL: process.env.APP_FORM_SERVICE, // Cambia la URL base según tu API
    method: "POST",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
