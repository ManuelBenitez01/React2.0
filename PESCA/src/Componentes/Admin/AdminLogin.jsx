import React, { useState } from 'react';
import { API_CONFIG } from '../../config/config.js';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Hacer request a la API de autenticación
            const response = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: credentials.username,
                    password: credentials.password
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Pasar los datos del login sin guardar en localStorage
                onLogin({
                    token: data.data.token,
                    admin: data.data.admin
                });
            } else {
                setError(data.message || 'Usuario o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error de autenticación:', error);
            setError('Error de conexión. Verifica que el servidor esté funcionando.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-box">
                <h2>Acceso Administrativo</h2>
                <p>Panel de administración de productos</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                            placeholder="Ingrese su usuario"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            placeholder="Ingrese su contraseña"
                        />
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="login-button"
                    >
                        {loading ? 'Verificando...' : 'Iniciar Sesión'}
                    </button>
                </form>
                
                <div className="login-info">
                    <small>
                        <strong>Credenciales por defecto:</strong><br/>
                        Usuario: admin<br/>
                        Contraseña: admin123
                    </small>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
