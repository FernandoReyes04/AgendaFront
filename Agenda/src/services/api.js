import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Cambiado al puerto correcto
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json' // Asegura que el backend acepte JSON
  }
});

export default api;
