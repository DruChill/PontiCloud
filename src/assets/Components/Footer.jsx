import React from 'react'

function Footer() {
  const today = new Date();

  return (
    <footer className='footer pt-3 mt-4 text-body-secondary border-top d-flex justify-content-between'>
        <p>Desarrollado por - <a href="https://github.com/DruChill">Andru A.RR</a></p>
        <p>&copy;{today.getFullYear()}</p>
  </footer>
  )
}

export default Footer