import React from 'react'

function Header() {
  return (
    <header>
        <img src="/icon_logo_ligth_mode.png" alt="icon-logo-web-site" />
        <nav>
        <ul>
            <li>
              <a href="/" className='Active'>Inicio</a>
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
        <a href="https://www.figma.com/design/IAzZGCFH3u42pOouyr6PcG/ponticloud?node-id=0-1&t=JNKnipsySTDMYoML-1">
          <div className="badge">Nuevo Diseño <i className="bi bi-vector-pen"></i></div>
        </a>
    </header>
  )
}

export default Header