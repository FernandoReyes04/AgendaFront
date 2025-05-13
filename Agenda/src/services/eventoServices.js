import api from './api';

/**
 * Servicio para crear un evento
 * @param {Object} evento - Datos del evento a crear
 * @returns {Promise<any>} - Evento guardado en el backend
 */
export const createEvento = async (evento) => {
    try {
        // Obtener usuario desde localStorage
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.id) {
            throw new Error('Usuario no autenticado');
        }

        // Extraer los campos de categoría que no son parte del modelo original
        const { categoria, colorCategoria, ...datosOriginales } = evento;
        
        // Crear una copia para modificar
        const eventoParaBackend = { ...datosOriginales, userId: user.id };
        
        // Guardar la categoría en la descripción como JSON estructurado
        eventoParaBackend.description = JSON.stringify({
            texto: evento.description || '',
            categoria: categoria || 'General',
            color: colorCategoria || '#778da9'
        });

        console.log('Enviando evento al backend:', eventoParaBackend);
        const response = await api.post('/api/event', eventoParaBackend);
        
        // Reconstruir el objeto de respuesta para incluir categoría
        const eventoGuardado = response.data;
        try {
            const parsedDesc = JSON.parse(eventoGuardado.description);
            return {
                ...eventoGuardado,
                description: parsedDesc.texto || eventoGuardado.description,
                categoria: parsedDesc.categoria || 'General',
                colorCategoria: parsedDesc.color || '#778da9'
            };
        } catch (e) {
            return {
                ...eventoGuardado,
                categoria: 'General',
                colorCategoria: '#778da9'
            };
        }
    } catch (error) {
        console.error('Error creando evento:', error.response?.data || error.message);
        throw error;
    }
};

/**
 * Servicio para obtener todos los eventos
 * @returns {Promise<any[]>} - Lista de eventos desde el backend
 */
export const getEventos = async () => {
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
        console.log(`Obteniendo eventos para usuario con ID: ${userId}`);
        
        // Realizar la petición al backend
        const response = await api.get(`/api/event?userId=${userId}`);
        
        // Procesar los eventos para extraer las categorías de la descripción
        const eventos = (response.data || []).map(evento => {
            try {
                // Intentar parsear la descripción como JSON
                const parsedDesc = JSON.parse(evento.description);
                
                return {
                    ...evento,
                    // Sobrescribir la descripción con solo el texto
                    description: parsedDesc.texto || evento.description,
                    // Añadir nuevos campos que no existen en el backend
                    categoria: parsedDesc.categoria || "General",
                    colorCategoria: parsedDesc.color || "#778da9" // Silver Lake Blue por defecto
                };
            } catch (e) {
                // Si no es un JSON válido, mantener como está
                return {
                    ...evento,
                    categoria: "General",
                    colorCategoria: "#778da9" // Silver Lake Blue por defecto
                };
            }
        });
        
        return eventos;
    } catch (error) {
        console.error('Error obteniendo eventos:', error.response?.data || error.message);
        // Devolver array vacío en lugar de lanzar error para evitar que la app se rompa
        return [];
    }
};

/**
 * Servicio para actualizar un evento existente
 * @param {number} id - ID del evento a actualizar
 * @param {Object} evento - Nuevos datos del evento
 * @returns {Promise<any>} - Evento actualizado desde el backend
 */
export const updateEvento = async (id, evento) => {
    try {
        // Extraer los campos de categoría que no son parte del modelo original
        const { categoria, colorCategoria, ...datosOriginales } = evento;
        
        // Crear objeto para enviar al backend
        const eventoParaBackend = { ...datosOriginales };
        
        // Guardar la categoría y descripción en formato JSON
        eventoParaBackend.description = JSON.stringify({
            texto: evento.description || '',
            categoria: categoria || 'General',
            color: colorCategoria || '#778da9'
        });
        
        console.log(`Actualizando evento ${id} con datos:`, eventoParaBackend);
        const response = await api.put(`/api/event/${id}`, eventoParaBackend);
        
        // Reconstruir el objeto de respuesta para incluir categoría
        const eventoActualizado = response.data;
        try {
            const parsedDesc = JSON.parse(eventoActualizado.description);
            return {
                ...eventoActualizado,
                description: parsedDesc.texto || eventoActualizado.description,
                categoria: parsedDesc.categoria || 'General',
                colorCategoria: parsedDesc.color || '#778da9'
            };
        } catch (e) {
            return {
                ...eventoActualizado,
                categoria: 'General',
                colorCategoria: '#778da9'
            };
        }
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