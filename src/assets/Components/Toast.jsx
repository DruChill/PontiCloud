import React from 'react'

function Toast() {
  return (
    <div>

        <div className="toast fade show position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <img src="/vite.svg" className='me-2' alt="icon-alert" />
                <strong className="me-auto">Comunicado!</strong>
                <small>V0.4.1</small>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
            ¡Anuncios eliminados! Ahora navegas más rápido y limpio. Si te gusta esta mejora, apoya el proyecto con una <a href="/yape.JPG" className='text-info'>donación.</a> ¡Gracias por tu apoyo!
            </div>
        </div>


        {/* <div className="toast fade show position-fixed top-50 start-50 translate-middle" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <img src="/vite.svg" className='me-2' alt="icon-alert" />
                <strong className="me-auto">Sponsor</strong>
                <small>10 de Diciembre</small>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
                <img src="/sponsor.png" alt="img" style={{width: "100%"}} />
            </div>
        </div>
         */}
    </div>
  )
}

export default Toast