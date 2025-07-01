import React, { useState } from 'react';
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

        // Credenciales por defecto (puedes cambiarlas)
        const validCredentials = {
            username: 'admin',
            password: 'admin123'
        };

        // Simulamos un delay de autenticación
        setTimeout(() => {
            if (
                credentials.username === validCredentials.username &&
                credentials.password === validCredentials.password
            ) {
                onLogin(true);
                localStorage.setItem('admin_logged_in', 'true');
            } else {
                setError('Usuario o contraseña incorrectos');
            }
            setLoading(false);
        }, 1000);
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
