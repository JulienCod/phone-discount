import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContext from './context/AuthContext';
import AuthAPI from './services/authApi';
import Layout from './components/layout/layout';
import Account from './pages/Account';
import PhoneCreate from './pages/PhoneCreate';
import PhoneList from './pages/PhoneList';
import PhoneShow from './pages/PhoneShow';
import Basket from './pages/Basket';

AuthAPI.setup();

function Main() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        AuthAPI.isAuthenticated()
    );
    const [admin, setAdmin] = useState(false);
    useEffect(() => {
        if (isAuthenticated) {
            let user = AuthAPI.rolesCurrentUser();
            if (user === "ROLE_ADMIN") {
                setAdmin(true);
            } else {
                setAdmin(false);
            }
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated
            }}
        >
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<PhoneList />} />
                        {admin &&
                            <Route path="create" element={<PhoneCreate />} />
                        }
                        <Route path="show/:id" element={<PhoneShow />} />
                        <Route path="account" element={<Account />} />
                        {isAuthenticated &&
                            <Route path="basket" element={<Basket />} />
                        }
                        <Route path="*" element={<PhoneList />} />
                    </Routes>
                </Layout>
            </Router>
        </AuthContext.Provider>
    )
}

export default Main;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);
