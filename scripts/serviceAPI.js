import { API_URL, JWT_TOKEN_KEY } from './const.js';

// Функция получает информацию о пользователе по токену.
export const getLogin = async (token) => {
  try {
    const response = await fetch(`${API_URL}/getLogin`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });

    const data = await response.json();
    console.log('data: ', data);

    return data; 
  } catch (err) {
    console.error(err);
  }
};

// Функция получает информацию о пользователе по его логину.
export const getUser = async (login) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_URL}/user/${login}`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    return data; 
  } catch (err) {
    console.error(err);
  }
};

// Функция обновляет данные пользователя по его ID.
export const sendDataUser = async (id, userData) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    console.log('data: ', data);

    return data; 
  } catch (err) {
    console.error(err);
  }
};

// Функция создает новое желание пользователя.
export const sendDataWish = async (wishData) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_URL}/addWish`, {
      method: 'POST',
      headers,
      body: JSON.stringify(wishData)
    });

    const data = await response.json();

    return data; 
  } catch (err) {
    console.error(err);
  }
};

// Функция обновляет данные существующего желания по его ID.
export const updateDataWish = async (id, wishData) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_URL}/wish/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(wishData)
    });

    const data = await response.json();

    return data; 
  } catch (err) {
    console.error(err);
  }
};

// Функция получает информацию о желании по его ID.
export const getWish = async (id) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_URL}/wish/${id}`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    return data; 
  } catch (err) {
    console.error(err);
  }
};

// Функция удаляет желание по его ID.
export const deleteWish = async (id) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_URL}/wish/${id}`, {
      method: 'DELETE',
      headers,
    });

    const data = await response.json();

    return data; 
  } catch (err) {
    console.error(err);
  }
};