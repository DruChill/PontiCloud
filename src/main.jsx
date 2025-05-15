import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Contact from './assets/Pages/Contact.jsx'; // Asegúrate de crear este componente
import Search from './assets/Pages/Search.jsx';
import Sponsor from './assets/Pages/Sponsor.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // Aquí se definen las rutas de la aplicación con React Router
  // Quitar React.StrictMode para evitar problemas con NProgress y visitas
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/mis-archivos" element={<Search />} />
        <Route path="/sponsor" element={<Sponsor />} />
      </Routes>
    </Router>
  </React.StrictMode>
);