import React from 'react';


function NotFound() {
  return (
    <div className='flex justify-center flex-col items-center h-screen bg-base-300'>
        <img className='w-1/12' src="/icon_logo_ligth_mode.png" alt="icon-web-site" />
        <h1 className='text-5xl font-bold text-primary'>No se encontró la página</h1>
        <p className='text-black opacity-60 font-light'>No podemos encontrar la página que buscas.</p>
        <a href="/" className='mt-4 btn btn-secondary' >Inicio</a>
    </div>
  )
}

export default NotFound