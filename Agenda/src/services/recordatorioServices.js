import api from './api';

//  Crear un recordatorio
export const createRecordatorio = async (recordatorio) => {
  try {
    const response = await api.post('/reminder', recordatorio);
    return response.data;
  } catch (error) {
    console.error('Error creando recordatorio:', error);
    throw error;
  }
};

//  Obtener todos los recordatorios
export const getRecordatorios = async () => {
  try {
    const response = await api.get('/reminder');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo recordatorios:', error);
    throw error;
  }
};

//  Actualizar un recordatorio
export const updateRecordatorio = async (id, recordatorio) => {
  try {
    const response = await api.put(`/reminder/${id}`, recordatorio);
    return response.data;
  } catch (error) {
    console.error('Error actualizando recordatorio:', error);
    throw error;
  }
};

//  Eliminar un recordatorio
export const deleteRecordatorio = async (id) => {
  try {
    await api.delete(`/reminder/${id}`);
  } catch (error) {
    console.error('Error eliminando recordatorio:', error);
    throw error;
  }
};
