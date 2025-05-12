import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Cambiado al puerto correcto
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json' // Asegura que el backend acepte JSON
  }
});

export default api;