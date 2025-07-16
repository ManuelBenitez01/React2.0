import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [adminToken, setAdminToken] = useState(null);
    const [adminData, setAdminData] = useState(null);

    const handleLogin = (loginData) => {
        setIsLoggedIn(true);
        setAdminToken(loginData.token);
        setAdminData(loginData.admin);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setAdminToken(null);
        setAdminData(null);
    };

    return (
        <div>
            {isLoggedIn ? (
                <AdminPanel 
                    onLogout={handleLogout} 
                    token={adminToken}
                    adminData={adminData}
                />
            ) : (
                <AdminLogin onLogin={handleLogin} />
            )}
        </div>
    );
};

export default Admin;
