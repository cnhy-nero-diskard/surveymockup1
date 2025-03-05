// utils/api.js
const API_HOST = process.env.REACT_APP_API_HOST;

// Localization CRUD
export const createLocalization = async (key, languagecode, textcontent, component) => {
  const response = await fetch(`${API_HOST}/api/admin/localization`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, languagecode, textcontent, component }),
    credentials: 'include',
  });
  return response.json();
};

export const fetchLocalizations = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await fetch(`${API_HOST}/api/admin/localization?${queryParams}`, {
    credentials: 'include',
  });
  return response.json();
};

export const updateLocalization = async (id, key, languagecode, textcontent, component) => {
  const response = await fetch(`${API_HOST}/api/admin/localization/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, key, languagecode, textcontent, component }),
    credentials: 'include',
  });
  return response.json();
};

export const deleteLocalization = async (id) => {
  const response = await fetch(`${API_HOST}/api/admin/localization`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
    credentials: 'include',
  });
  return response.json();
};

// Establishments CRUD
export const createEstablishment = async (
  estName, type, cityMun, barangay, latitude, longitude,
  english, korean, chinese, japanese, russian, french, spanish, hindi
) => {
  const response = await fetch(`${API_HOST}/api/admin/establishments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      estName, type, cityMun, barangay, latitude, longitude,
      english, korean, chinese, japanese, russian, french, spanish, hindi,
    }),
    credentials: 'include',
  });
  return response.json();
};

export const fetchEstablishments = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await fetch(`${API_HOST}/api/admin/establishments?${queryParams}`, {
    credentials: 'include',
  });
  return response.json();
};

export const updateEstablishment = async (
  id, estName, type, cityMun, barangay, latitude, longitude,
  english, korean, chinese, japanese, russian, french, spanish, hindi
) => {
  const response = await fetch(`${API_HOST}/api/admin/establishments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      estName, type, cityMun, barangay, latitude, longitude,
      english, korean, chinese, japanese, russian, french, spanish, hindi,
    }),
    credentials: 'include',
  });
  return response.json();
};

export const deleteEstablishment = async (id) => {
  const response = await fetch(`${API_HOST}/api/admin/establishments/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return response.json();
};
