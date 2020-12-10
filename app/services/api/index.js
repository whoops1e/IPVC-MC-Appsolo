const axios = require('axios');

const API_URL = 'http://192.168.1.169:5000/api/';

const httpBase = (token) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  if (token && token.length) {
    headers.Authorization = `Bearer ${token}`;
  }

  const api = axios.create({
    baseURL: `${API_URL}`,
    headers,
    responseType: 'json'
  });

  api.interceptors.response.use(
    (response) => {
      return response.data;
    },
    ({ message, response }) => {
      return { error: true, message, status: response.status };
    }
  );
  return api;
};

export const getMarkers = async () => {
  try {
    const response = await httpBase().get('markers');
    if (response.error) {
      return response;
    }
    return { error: false, data: response.data };
  } catch ({ message, status }) {
    return { error: true, message, status };
  }
};

export const newMarker = async (token, data) => {
  try {
    const response = await httpBase(token).post('markers/new', data);
    if (response.error) {
      return response;
    }
    return { error: false, data: response.data };
  } catch ({ message, status }) {
    return { error: true, message, status };
  }
};

export const editMarker = async (token, data) => {
  try {
    const response = await httpBase(token).post('markers/edit', data);
    if (response.error) {
      return response;
    }
    return { error: false, data: response.data };
  } catch ({ message, status }) {
    return { error: true, message, status };
  }
};

export const deleteMarker = async (token, _id) => {
  try {
    const response = await httpBase(token).post('markers/delete', { _id });
    if (response.error) {
      return response;
    }
    return { error: false, data: response.data };
  } catch ({ message, status }) {
    return { error: true, message, status };
  }
};
