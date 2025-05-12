import api from './api';

// POST /api/users/login
export const login = async (credentials) => {
    const response = await api.post('/api/users/login', credentials);
    return response.data;
};

// POST /api/users/register
export const register = async (user) => {
    console.log('Enviando registro de usuario:', user); // ✅ Revisa en consola si `password` está presente
    const response = await api.post('/api/users/register', user);
    return response.data;
};