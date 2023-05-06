import { storage } from "../utils";

const API_URL = process.env.REACT_APP_API_URL;

export const getListOrders = async () => {
  const user = storage.load("user");
  const token = user.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/order-detail`, {
    method: "GET",
    headers,
  });
  return res.json();
};

export const createOrder = async (value) => {
  const user = storage.load("user");
  const token = user.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const data = JSON.stringify(value);

  const res = await fetch(`${API_URL}/order/create`, {
    method: "POST",
    headers,
    body: data,
  });
  return res;
};

export const createPayment = async (value) => {
  const user = storage.load("user");
  const token = user.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const data = JSON.stringify(value);

  const res = await fetch(`${API_URL}/create-payment`, {
    method: "POST",
    headers,
    body: data,
  });
  return res;
};

export const createPaymentInfo = async (value) => {
  const user = storage.load("user");
  const token = user.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const data = JSON.stringify(value);

  const res = await fetch(`${API_URL}/payment-information`, {
    method: "POST",
    headers,
    body: data,
  });
  return res;
};

export const cancelOrder = async (id) => {
  const user = storage.load("user");
  const token = user.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/order/cancel/${id}`, {
    method: "PUT",
    headers,
  });
  return res;
};
