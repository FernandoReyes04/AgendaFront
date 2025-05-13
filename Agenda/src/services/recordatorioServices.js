import api from './api';

//  Crear un recordatorio
export const createRecordatorio = async (recordatorio) => {
    try {
        // Obtener usuario desde localStorage
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.id) {
            throw new Error('Usuario no autenticado');
        }

        // Extraer los campos de categoría que no son parte del modelo original
        const { categoria, colorCategoria, ...datosOriginales } = recordatorio;
        
        // Crear una copia para modificar
        const recordatorioParaBackend = { ...datosOriginales, userId: user.id };
        
        // Guardar la categoría en la descripción como JSON estructurado
        recordatorioParaBackend.description = JSON.stringify({
            texto: recordatorio.description || '',
            categoria: categoria || 'General',
            color: colorCategoria || '#415a77' // Yinmn Blue por defecto para recordatorios
        });

        console.log('Servicio - Enviando recordatorio:', recordatorioParaBackend);
        const response = await api.post('/api/reminder', recordatorioParaBackend);
        
        // Reconstruir el objeto de respuesta para incluir categoría
        const recordatorioGuardado = response.data;
        try {
            const parsedDesc = JSON.parse(recordatorioGuardado.description);
            return {
                ...recordatorioGuardado,
                description: parsedDesc.texto || recordatorioGuardado.description,
                categoria: parsedDesc.categoria || 'General',
                colorCategoria: parsedDesc.color || '#415a77'
            };
        } catch (e) {
            return {
                ...recordatorioGuardado,
                categoria: 'General',
                colorCategoria: '#415a77'
            };
        }
    } catch (error) {
        console.error('Error creando recordatorio:', error.response?.data || error.message);
        throw error;
    }
};

//  Obtener todos los recordatorios
export const getRecordatorios = async () => {
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
        console.log(`Obteniendo recordatorios para usuario con ID: ${userId}`);
        
        // Realizar la petición al backend
        const response = await api.get(`/api/reminder?userId=${userId}`);
        
        // Procesar los recordatorios para extraer las categorías de la descripción
        const recordatorios = (response.data || []).map(recordatorio => {
            try {
                // Intentar parsear la descripción como JSON
                const parsedDesc = JSON.parse(recordatorio.description);
                
                return {
                    ...recordatorio,
                    // Sobrescribir la descripción con solo el texto
                    description: parsedDesc.texto || recordatorio.description,
                    // Añadir nuevos campos que no existen en el backend
                    categoria: parsedDesc.categoria || "General",
                    colorCategoria: parsedDesc.color || "#415a77" // Yinmn Blue por defecto para recordatorios
                };
            } catch (e) {
                // Si no es un JSON válido, mantener como está
                return {
                    ...recordatorio,
                    categoria: "General",
                    colorCategoria: "#415a77" // Yinmn Blue por defecto para recordatorios
                };
            }
        });
        
        return recordatorios;
    } catch (error) {
        console.error('Error obteniendo recordatorios:', error.response?.data || error.message);
        // Devolver array vacío en lugar de lanzar error para evitar que la app se rompa
        return [];
    }
};

//  Actualizar un recordatorio
export const updateRecordatorio = async (id, recordatorio) => {
    try {
        // Extraer los campos de categoría que no son parte del modelo original
        const { categoria, colorCategoria, ...datosOriginales } = recordatorio;
        
        // Obtener usuario para asegurar que el recordatorio mantenga el userId correcto
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
            throw new Error('Usuario no autenticado');
        }
        
        // Crear objeto para enviar al backend
        const recordatorioParaBackend = { 
            ...datosOriginales,
            userId: user.id
        };
        
        // Guardar la categoría y descripción en formato JSON
        recordatorioParaBackend.description = JSON.stringify({
            texto: recordatorio.description || '',
            categoria: categoria || 'General',
            color: colorCategoria || '#415a77'
        });
        
        console.log(`Actualizando recordatorio ${id} con datos:`, recordatorioParaBackend);
        const response = await api.put(`/api/reminder/${id}`, recordatorioParaBackend);
        
        // Reconstruir el objeto de respuesta para incluir categoría
        const recordatorioActualizado = response.data;
        try {
            const parsedDesc = JSON.parse(recordatorioActualizado.description);
            return {
                ...recordatorioActualizado,
                description: parsedDesc.texto || recordatorioActualizado.description,
                categoria: parsedDesc.categoria || 'General',
                colorCategoria: parsedDesc.color || '#415a77'
            };
        } catch (e) {
            return {
                ...recordatorioActualizado,
                categoria: 'General',
                colorCategoria: '#415a77'
            };
        }
    } catch (error) {
        console.error('Error actualizando recordatorio:', error.response?.data || error.message);
        throw error;
    }
};

//  Eliminar un recordatorio
export const deleteRecordatorio = async (id) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
        throw new Error('Usuario no autenticado');
    }
    
    await api.delete(`/api/reminder/${id}`);
  } catch (error) {
    console.error('Error eliminando recordatorio:', error.response?.data || error.message);
    throw error;
  }
};
