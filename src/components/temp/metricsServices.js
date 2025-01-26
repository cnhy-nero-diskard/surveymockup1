const API_URL = 'http://localhost:5000/metrics'; 
export const fetchMetrics = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch metrics');
    }
    const text = await response.text();
    return text;
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return null;
  }
};