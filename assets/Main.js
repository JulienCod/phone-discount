import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PhoneCreate from './pages/PhoneCreate';
import PhoneList from './pages/PhoneList';
import PhoneShow from './pages/PhoneShow';



function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PhoneList/>}/>
                <Route path="/create" element={<PhoneCreate/>}/>
                <Route path="/show/:id" element={<PhoneShow/>}/>
            </Routes>
        </Router>
    )
}

export default Main;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);
