import React from 'react'

function Header() {
  return (
    <header>
        <img src="/icon_logo_ligth_mode.png" alt="icon-logo-web-site" />
        <nav>
        <ul>
            <li>
              <a href="/" className='Active'>Home</a>
            </li>
            {/* <li>
              <a href="#">Mis Archivos</a>
            </li> */}
            <li>
              <a href="/yape.JPG">Donar</a>
            </li>
            <li>
              <a href="mailto:andruvrr@gmail.com">Contacto</a>
            </li>
            {/* <li>
              <a href="#">Planes</a>
            </li> */}
        </ul>
        </nav>
        <div className="badge">Nuevo Diseño <i class="bi bi-vector-pen"></i></div>
    </header>
  )
}

export default Header