import { storage } from "../utils";

const API_URL = process.env.REACT_APP_API_URL;
const SHIPPING_URL = process.env.REACT_APP_SHIPPING;

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
  const token = user?.accessToken;

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
  const auth = storage.load("user");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/shipping-address/create`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  return res.json();
};

export const updateAddress = async (id, data) => {
  const auth = storage.load("user");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/shipping-address/update/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });

  return res.json();
};

export const deleteAddress = async (id) => {
  const auth = storage.load("user");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/shipping-address/delete/${id}`, {
    method: "PUT",
    headers,
  });

  return res.json();
};

export const getDistrict = async () => {
  const token = "40a84bcb-dde0-11ed-921c-de4829400020";
  const myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");

  const params = new URLSearchParams({
    province_id: 202,
  });

  const res = await fetch(`${SHIPPING_URL}/master-data/district?${params}`, {
    method: "GET",
    headers: myHeaders,
  });

  return res.json();
};

export const getWard = async (id) => {
  const token = "40a84bcb-dde0-11ed-921c-de4829400020";
  const myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");

  const params = new URLSearchParams({
    district_id: id,
  });

  const res = await fetch(`${SHIPPING_URL}/master-data/ward?${params}`, {
    method: "GET",
    headers: myHeaders,
  });

  return res.json();
};

export const getServices = async (id) => {
  const token = "40a84bcb-dde0-11ed-921c-de4829400020";
  const myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");

  const params = new URLSearchParams({
    shop_id: 3656679,
    from_district: 3695,
    to_district: id,
  });

  const res = await fetch(
    `${SHIPPING_URL}/v2/shipping-order/available-services?${params}`,
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  return res.json();
};

export const getShippingFee = async (data) => {
  const token = "40a84bcb-dde0-11ed-921c-de4829400020";
  const myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");

  const params = new URLSearchParams(data);

  const res = await fetch(`${SHIPPING_URL}/v2/shipping-order/fee?${params}`, {
    method: "GET",
    headers: myHeaders,
  });

  return res.json();
};
