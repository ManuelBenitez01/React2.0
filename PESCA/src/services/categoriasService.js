// Servicio para manejo de categorías
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
    }
    return await response.json();
};

export const categoriasService = {
    // Obtener todas las categorías
    obtenerTodas: async () => {
        console.log('📋 Obteniendo todas las categorías...');
        try {
            const response = await fetch(`${API_BASE_URL}/categorias`);
            const data = await handleResponse(response);
            
            console.log('✅ Categorías obtenidas:', data.data?.length || 0);
            return {
                success: true,
                data: data.data || []
            };
        } catch (error) {
            console.error('❌ Error al obtener categorías:', error);
            throw error;
        }
    },

    // Obtener categoría por ID
    obtenerPorId: async (id) => {
        console.log('🔍 Obteniendo categoría por ID:', id);
        try {
            if (id === null || id === undefined || isNaN(id) || id < 0) {
                throw new Error('ID de categoría inválido');
            }

            const response = await fetch(`${API_BASE_URL}/categorias/${id}`);
            const data = await handleResponse(response);
            
            console.log('✅ Categoría obtenida:', data.data);
            return {
                success: true,
                data: data.data
            };
        } catch (error) {
            console.error('❌ Error al obtener categoría:', error);
            throw error;
        }
    },

    // Crear nueva categoría
    crear: async (categoria) => {
        console.log('➕ Creando nueva categoría:', categoria);
        try {
            const response = await fetch(`${API_BASE_URL}/categorias`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoria),
            });
            
            const data = await handleResponse(response);
            console.log('✅ Categoría creada exitosamente:', data.data);
            
            return {
                success: true,
                data: data.data,
                message: 'Categoría creada exitosamente'
            };
        } catch (error) {
            console.error('❌ Error al crear categoría:', error);
            throw error;
        }
    },

    // Actualizar categoría
    actualizar: async (id, categoria) => {
        console.log('🔄 Actualizando categoría ID:', id, categoria);
        try {
            if (id === null || id === undefined || isNaN(id) || id < 0) {
                throw new Error('ID de categoría inválido');
            }

            const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoria),
            });
            
            const data = await handleResponse(response);
            console.log('✅ Categoría actualizada exitosamente:', data.data);
            
            return {
                success: true,
                data: data.data,
                message: 'Categoría actualizada exitosamente'
            };
        } catch (error) {
            console.error('❌ Error al actualizar categoría:', error);
            throw error;
        }
    },

    // Eliminar categoría
    eliminar: async (id) => {
        console.log('🗑️ Eliminando categoría ID:', id);
        try {
            if (id === null || id === undefined || isNaN(id) || id < 0) {
                throw new Error('ID de categoría inválido');
            }

            const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
                method: 'DELETE',
            });
            
            await handleResponse(response);
            console.log('✅ Categoría eliminada exitosamente');
            
            return {
                success: true,
                message: 'Categoría eliminada exitosamente'
            };
        } catch (error) {
            console.error('❌ Error al eliminar categoría:', error);
            throw error;
        }
    }
};
