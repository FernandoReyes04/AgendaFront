import api from './api';

// Registrar nuevo usuario
export const register = async (user) => {
    try {
        const response = await api.post('/api/users/register', user);
        return response.data;
    } catch (error) {
        console.error('Error registrando usuario:', error.response?.data || error.message);
        throw error;
    }
};

// Iniciar sesión
export const login = async (credentials) => {
    try {
        const response = await api.post('/api/users/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Error iniciando sesión:', error.response?.data || error.message);
        throw error;
    }
};