import api from './api';

//  Crear un evento
export const createEvento = async (evento) => {
  try {
    const response = await api.post('/eventos', evento);
    return response.data;
  } catch (error) {
    console.error('Error creando evento:', error);
    throw error;
  }
};

//  Obtener todos los eventos
export const getEventos = async () => {
  try {
    const response = await api.get('/eventos');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo eventos:', error);
    throw error;
  }
};

//  Actualizar un evento
export const updateEvento = async (id, evento) => {
  try {
    const response = await api.put(`/eventos/${id}`, evento);
    return response.data;
  } catch (error) {
    console.error('Error actualizando evento:', error);
    throw error;
  }
};

//  Eliminar un evento
export const deleteEvento = async (id) => {
  try {
    await api.delete(`/eventos/${id}`);
  } catch (error) {
    console.error('Error eliminando evento:', error);
    throw error;
  }
};
