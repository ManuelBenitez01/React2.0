import { useState, useCallback } from 'react';

export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const executeRequest = useCallback(async (requestFunction) => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await requestFunction();
            return result;
        } catch (err) {
            console.error('Error en API:', err);
            setError(err.message || 'Error desconocido');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        executeRequest,
        clearError: () => setError(null)
    };
};
