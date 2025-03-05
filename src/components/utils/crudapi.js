
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
  const response = await fetch(`${API_HOST}/api/admin/localization`, {
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

export const createEstablishment = async (formData) => {
  const {
    est_name, type, city_mun, barangay, latitude, longitude,
    english, korean, chinese, japanese, russian, french, spanish, hindi
  } = formData;

  console.log(`ESTABLISHMENT NAME CREATE --> ${est_name}`);

  const response = await fetch(`${API_HOST}/api/admin/establishment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      est_name, type, city_mun, barangay, latitude, longitude,
      english, korean, chinese, japanese, russian, french, spanish, hindi,
    }),
    credentials: 'include',
  });
  return response.json();
};

export const fetchEstablishment = async (filters = {}) => {
  const response = await fetch(`${API_HOST}/api/admin/establishment`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  return response.json();
};

export const updateEstablishment = async (
  id, formData) => {
    const {
      est_name, type, city_mun, barangay, latitude, longitude,
      english, korean, chinese, japanese, russian, french, spanish, hindi
    } = formData;
  
  const response = await fetch(`${API_HOST}/api/admin/establishment`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id, est_name, type, city_mun, barangay, latitude, longitude,
      english, korean, chinese, japanese, russian, french, spanish, hindi,
    }),
    credentials: 'include',
  });
  return response.json();
};

export const deleteEstablishment = async (id) => {
  console.log(`DELETE ESTABLISHMENT WITH ID ${id}`);
    const response = await fetch(`${API_HOST}/api/admin/establishment`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
      credentials: 'include',
    });
  return response.json();
};
export const createTourismAttraction = async (attractionData) => {
  console.log('CRUDAPI - CREATING TOURISM ATTRACITON');
  
  const response = await fetch(`${API_HOST}/api/admin/touattraction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(attractionData),
    credentials: 'include',
  });
  return response.json();
};

export const fetchTourismAttractions = async () => {
  console.log('CRUDAPI - FETCHUNG TOURISM ATTRACITON');

  const response = await fetch(`${API_HOST}/api/admin/touattraction`, {
    credentials: 'include',
  });
  console.log(`TOUATTRACTION DATA -> ${JSON.stringify(response)}`);
  return response.json();
};

export const updateTourismAttraction = async (id, attractionData) => {
  console.log('CRUDAPI - UPDATING TOURISM ATTRACITON');

  const response = await fetch(`${API_HOST}/api/admin/touattraction`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(attractionData),
    credentials: 'include',
  });
  return response.json();
};

export const deleteTourismAttraction = async (id) => {
  console.log('CRUDAPI - DELETING TOURISM ATTRACITON');

  const response = await fetch(`${API_HOST}/api/admin/touattraction`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
    credentials: 'include',
  });
  return response.json();
};
