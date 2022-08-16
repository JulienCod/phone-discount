import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PhoneList from './pages/PhoneList';



function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PhoneList/>}/>
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