import React from 'react'

function Header() {
  return (
    <header>
        <img src="/icon_logo_ligth_mode.png" alt="icon-logo-web-site" />
        <nav>
        <ul>
            <li>
              <a href="#" className='Active'>Home</a>
            </li>
            <li>
              <a href="#">Donar</a>
            </li>
            <li>
              <a href="#">Contacto</a>
            </li>
            <li>
              <a href="#">Aula Virtual</a>
            </li>
            <li>
              <a href="#">Pontisis</a>
            </li>
        </ul>
        </nav>
        <div className="badge">Beta</div>
    </header>
  )
}

export default Header