import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'


function Yape() {
  return (
    <div>
      <Header />
      <main>
        <img src="/yape.JPG" alt=""  style={{ width: '26%', borderRadius: '16px' }} />
        <div>
            <h1>Yape - Plin</h1>
            <p>Brindarte el mejor contenido posible de manera gratuita no es una tarea fácil. Tu apoyo nos ayudará a seguir mejorando y manteniendo el sitio web.</p>

            <div className='Card'>
                <p>Colaboradores:</p>
                <ul>
                    <li>
                        <img src="/vite.svg" alt="" />
                        <h5>Andru Ramirez R</h5>
                        <span>Yape: S/5,00</span>
                    </li>
                </ul>
            </div>
        </div>

      </main>
      <Footer />
    </div>
  )
}

export default Yape