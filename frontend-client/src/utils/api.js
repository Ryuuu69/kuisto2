import axios from 'axios';

// Configuration de base d'axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erreur API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// === API PUBLIQUE ===

// Catégories
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getCategory = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};

// Produits
export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getProductsByCategory = async (categoryId) => {
  const response = await api.get(`/products/category/${categoryId}`);
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Commandes
export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const getOrder = async (orderNumber) => {
  const response = await api.get(`/orders/${orderNumber}`);
  return response.data;
};

export default api;