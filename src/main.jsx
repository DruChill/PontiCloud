import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import SobreNosotros from './assets/Pages/SobreNosotros.jsx'; // Asegúrate de crear este componente
import ContacForm from './assets/Pages/ContactForm.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sobrenosotros" element={<SobreNosotros />} />
        <Route path="/reportar" element={<ContacForm />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);