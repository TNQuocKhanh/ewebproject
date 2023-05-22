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

export const getProductWithFilter = async (filter) => {
  const user = storage.load("user");
  const token = user?.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(
    `${API_URL}/products/filter?` + new URLSearchParams(filter),
    {
      method: "GET",
      headers,
    }
  );
  return res.json();
};

export const getProductById = async (id) => {
  const user = storage.load("user");
  const token = user?.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/product/${id}`, {
    method: "GET",
    headers,
  });
  return res.json();
};

export const getListCategories = async () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(`${API_URL}/categories`, {
    method: "GET",
    headers,
  });
  return res.json();
};

export const getFeatureProduct = async () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(`${API_URL}/best-selling-product`, {
    method: "GET",
    headers,
  });
  return res.json();
};

export const getRelatedProduct = async (id) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(`${API_URL}/product-same-category/${id}`, {
    method: "GET",
    headers,
  });
  return res.json();
};
