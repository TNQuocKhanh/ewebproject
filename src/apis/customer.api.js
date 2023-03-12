import { storage } from "../utils";

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const data = JSON.stringify({ email, password });

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers,
    body: data,
  });
  return res;
};

export const logout = async () => {
  const user = storage.load("user");
  const token = user.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers,
  });
  return res;
};

export const getProfile = async () => {
  const user = storage.load("user");
  const token = user.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/customer/profile`, {
    method: "GET",
    headers,
  });
  return res.json();
};

export const signup = async ({email, password, fullName}) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const data = JSON.stringify({ email, password, fullName });

  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers,
    body: data,
  });
  return res;
}
