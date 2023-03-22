import { storage } from "../utils";
const API_URL = process.env.REACT_APP_API_URL;

export const getListProducts = async () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(`${API_URL}/products`, {
    method: "GET",
    headers,
  });
  return res.json();
};

export const getProductById = async (id) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(`${API_URL}/product/${id}`, {
    method: "GET",
    headers,
  });
  return res.json();
};
