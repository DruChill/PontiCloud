import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ThemeSelector from './ThemeSelector';

function Header() {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path ? 'bg-base-100' : '';
  };

  return (
    <header className='font-semibold text-base-content py-5 items-center bg-base-200'>
      <div className="flex justify-between items-center lg:container mx-auto">
        <div>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a href="/">Inicio</a>
              </li>
              {/* <li>
                <a href="/mis-archivos">Mis Archivos</a>
              </li> */}
              <li>
                <a href="/sponsor">Donar</a>
              </li>
              <li>
                <a href="/contacto">Contacto</a>
              </li>
            </ul>
          </div>
          <div className="tooltip tooltip-bottom" data-tip="Beta">
            <a className="text-xl" href='https://ponticloud--preview-name-srne16ya.web.app' target='_blank'>PontiCloud</a>
          </div>
        </div>


        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/" className={getLinkClass('/')} >Inicio</a>
            </li>
            {/* <li>
              <a href="/mis-archivos">Mis Archivos</a>
            </li> */}
            <li>
              <a href="/sponsor" className={getLinkClass('/sponsor')}>Donar</a>
            </li>
            <li>
              <a href="/contacto" className={getLinkClass('/contacto')}>Contacto</a>
            </li>
          </ul>
        </div>
      <div>
        <ThemeSelector />
      </div>
    </div>
    </header>
  );
}

export default Header;