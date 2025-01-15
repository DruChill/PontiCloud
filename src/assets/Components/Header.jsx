import React from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <header>
      <img src="/icon_logo_ligth_mode.png" alt="icon-logo-web-site" />
      <nav>
        <ul>
          <li>
            <a href="/" className={location.pathname === '/' ? 'Active' : ''}>Home</a>
          </li>
          <li>
            <a href="/mis-archivos" className={location.pathname === '/mis-archivos' ? 'Active' : ''}>Mis Archivos</a>
          </li>
          <li>
            <a href="/yape" className={location.pathname === '/yape.JPG' ? 'Active' : ''}>Donar</a>
          </li>
          <li>
            <a href="mailto:andruvrr@gmail.com" className={location.pathname === '/contacto' ? 'Active' : ''}>Contacto</a>
          </li>
          {/* <li>
            <a href="#">Planes</a>
          </li> */}
        </ul>
      </nav>
      <div className="badge">
        {location.pathname === '/mis-archivos' ? 'Beta' : 'Nuevo Diseño'} <i className="bi bi-vector-pen"></i>
      </div>
    </header>
  );
}

export default Header;