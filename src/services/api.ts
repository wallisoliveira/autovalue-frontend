// src/services/api.ts

import axios from 'axios';

// A URL que o React usará para conversar com o Django.
// Usamos a porta 8000 e o caminho /api/ que definimos no backend.
const API_BASE_URL = 'http://localhost:8000/api'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;