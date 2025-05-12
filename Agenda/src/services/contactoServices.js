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
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
            throw new Error('Usuario no autenticado');
        }

        const response = await api.get(`/api/contact?userId=${user.id}`);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo contactos:', error);
        throw error;
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
