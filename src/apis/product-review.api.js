import { storage } from "../utils";

const API_URL = process.env.REACT_APP_API_URL;

export const getReviewByProductId = async (productId) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(`${API_URL}/review/${productId}`, {
    method: "GET",
    headers,
  });
  return res.json();
};

export const createReview = async (productId, data) => {
  const user = storage.load("user");
  const token = user.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/review/${productId}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateReview = async (productId, reviewId, data) => {
  const user = storage.load("user");
  const token = user.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/${productId}/review/${reviewId}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getReviewByCustomer = async (productId) => {
  const user = storage.load("user");
  const token = user?.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/reviewByCustomer/${productId}`, {
    method: "GET",
    headers,
  });
  return res.json();
};
