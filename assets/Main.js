import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Layout from './components/layout/layout';
import Account from './pages/Account';
import PhoneCreate from './pages/PhoneCreate';
import PhoneList from './pages/PhoneList';
import PhoneShow from './pages/PhoneShow';



function Main() {
    return (
        <Layout>
            <Router>
                <Routes>
                    <Route path="/" element={<PhoneList/>}/>
                    <Route path="/create" element={<PhoneCreate/>}/>
                    <Route path="/show/:id" element={<PhoneShow/>}/>
                    <Route path="/account" element={<Account/>}/>
                </Routes>
            </Router>
        </Layout>
    )
}

export default Main;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);
