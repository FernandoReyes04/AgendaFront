import api from './api';

/**
 * Servicio para crear un evento
 * @param {Object} evento - Datos del evento a crear
 * @returns {Promise<any>} - Evento guardado en el backend
 */
export const createEvento = async (evento) => {
    console.log('Enviando evento al backend:', evento); // ✅ Muestra todos los campos
    const response = await api.post('/api/event', evento);
    return response.data;
};
/**
 * Servicio para obtener todos los eventos
 * @returns {Promise<any[]>} - Lista de eventos desde el backend
 */
export const getEventos = async () => {
    try {
        const response = await api.get('/api/event');
        return response.data;
    } catch (error) {
        console.error('Error obteniendo eventos:', error.response?.data || error.message);
        throw error;
    }
};

/**
 * Servicio para actualizar un evento por ID
 * @param {number} id - ID del evento a actualizar
 * @param {Object} evento - Datos actualizados del evento
 * @returns {Promise<any>} - Evento actualizado
 */
export const updateEvento = async (id, evento) => {
    try {
        const response = await api.put(`/api/event/${id}`, evento);
        return response.data;
    } catch (error) {
        console.error(`Error actualizando evento ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

/**
 * Servicio para eliminar un evento por ID
 * @param {number} id - ID del evento a eliminar
 * @returns {Promise<void>}
 */
export const deleteEvento = async (id) => {
    try {
        await api.delete(`/api/event/${id}`);
    } catch (error) {
        console.error(`Error eliminando evento ${id}:`, error.response?.data || error.message);
        throw error;
    }
};