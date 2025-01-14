import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Contact from './assets/Pages/Contact.jsx'; // Asegúrate de crear este componente
import Yape from './assets/Pages/Yape.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/yape" element={<Yape />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);