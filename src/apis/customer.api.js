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

export const signup = async (email, password, fullName) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const data = JSON.stringify({ email, password, fullName });

  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers,
    body: data,
  });
  return res;
};

export const verifyAccount = async (code) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const data = JSON.stringify({ code });

  const res = await fetch(`${API_URL}/customer/verify`, {
    method: "POST",
    headers,
    body: data,
  });
  return res;
};

export const forgotPassword = async (email) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const data = JSON.stringify({ email });

  const res = await fetch(`${API_URL}/customer/forgot-password`, {
    method: "POST",
    headers,
    body: data,
  });
  return res;
};

export const createNewPassword = async (email, password) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const data = JSON.stringify({ email, password });

  const res = await fetch(`${API_URL}/customer/update-password`, {
    method: "POST",
    headers,
    body: data,
  });
  return res;
};

export const signinLogin = async () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(
    `http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000`,
    {
      method: "GET",
      headers,
    }
  );
  return res;
};

export const changePassword = async (oldPassword, changePassword) => {
  const user = storage.load("user");
  const token = user?.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);
  const data = JSON.stringify({ oldPassword, changePassword });

  const res = await fetch(`${API_URL}/customer/change-password`, {
    method: "PUT",
    headers,
    body: data,
  });
  return res;
};

export const updatePhoto = async (data) => {
  const auth = storage.load("user");
  const token = auth.accessToken;

  const headers = new Headers();
  const formdata = new FormData();
  formdata.append("image", data);
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/customer/update-photo`, {
    method: "PUT",
    headers,
    body: formdata,
  });

  return res.json();
};

export const updateProfile = async (data) => {
  const auth = storage.load("user");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/customer/profile`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });

  return res.json();
};

export const createAddress = async (data) => {
  const auth = storage.load('user')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/shipping-address/create`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  return res.json();
}

export const updateAddress = async (id, data) => {
  const auth = storage.load('user')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/shipping-address/update/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });

  return res.json();
}
