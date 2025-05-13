import api from './api';

//  Crear un contacto
export const createContacto = async (contacto) => {
    try {
        // ✅ Obtén el usuario desde localStorage
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.id) {
            throw new Error('Usuario no autenticado');
        }

        // ✅ Agrega el userId al contacto antes de enviarlo al backend
        const contactoConUsuario = {
            ...contacto,
            userId: user.id
        };

        const response = await api.post('/api/contact', contactoConUsuario);
        return response.data;
    } catch (error) {
        console.error('Error creando contacto:', error);
        throw error;
    }
};

//  Obtener todos los contactos
export const getContactos = async () => {
    try {
        // Obtener y validar usuario
        const userJson = localStorage.getItem('user');
        if (!userJson) {
            console.warn('No hay datos de usuario en localStorage');
            return [];
        }
        
        let user;
        try {
            user = JSON.parse(userJson);
        } catch (e) {
            console.error('Error al parsear datos de usuario:', e);
            return [];
        }
        
        if (!user || !user.id) {
            console.warn('Usuario sin ID válido');
            return [];
        }
        
        // Asegurar que el ID sea un número o string válido
        const userId = user.id.toString();
        console.log(`Obteniendo contactos para usuario con ID: ${userId}`);
        
        // Realizar la petición al backend
        const response = await api.get(`/api/contact?userId=${userId}`);
        return response.data || [];
    } catch (error) {
        console.error('Error obteniendo contactos:', error);
        // Devolver array vacío en lugar de lanzar error para evitar que la app se rompa
        return [];
    }
};

//  Actualizar un contacto
export const updateContacto = async (id, contacto) => {
  try {
    const response = await api.put(`/api/contact/${id}`, contacto, { allowAbsoluteUrls: true });
    return response.data;
  } catch (error) {
    console.error('Error actualizando contacto:', error);
    throw error;
  }
};

//  Eliminar un contacto
export const deleteContacto = async (id) => {
  try {
    // Usar la URL completa y configuración allowAbsoluteUrls para evitar que se añada el prefijo /api/
    await api.delete(`/api/contact/${id}`, { allowAbsoluteUrls: true });
  } catch (error) {
    console.error('Error eliminando contacto:', error);
    throw error;
  }
};
