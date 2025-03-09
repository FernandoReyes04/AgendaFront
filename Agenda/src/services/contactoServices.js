import api from './api';

//  Crear un contacto
export const createContacto = async (contacto) => {
  try {
    const response = await api.post('/contact', contacto);
    return response.data;
  } catch (error) {
    console.error('Error creando contacto:', error);
    throw error;
  }
};

//  Obtener todos los contactos
export const getContactos = async () => {
  try {
    const response = await api.get('/contact');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo contactos:', error);
    throw error;
  }
};

//  Actualizar un contacto
export const updateContacto = async (id, contacto) => {
  try {
    const response = await api.put(`/contact/${id}`, contacto);
    return response.data;
  } catch (error) {
    console.error('Error actualizando contacto:', error);
    throw error;
  }
};

//  Eliminar un contacto
export const deleteContacto = async (id) => {
  try {
    await api.delete(`/contact/${id}`);
  } catch (error) {
    console.error('Error eliminando contacto:', error);
    throw error;
  }
};
