import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function NotFound() {
  return (
    <div className='hero__container'>
        <Header />
        <div className='flex flex-col justify-center items-center text-center'>
            <p className='text-8xl text-accent font-black'>404</p>
            <h1 className='text-5xl font-bold text-primary'>No se encontró la página</h1>
            <p className='text-base-content opacity-60 font-light'>No podemos encontrar la página que buscas.</p>
        </div>
        <Footer />
    </div>
  )
}

export default NotFound