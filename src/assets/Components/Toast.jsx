import React from 'react'

function Toast() {
  return (
    <div>

        <div class="toast fade show position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <img src="/vite.svg" className='me-2' alt="icon-alert" />
                <strong class="me-auto">Comunicado 2</strong>
                <small>V.16</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Se eliminaron los anuncios! de la web, ahora puedes disfrutar de una experiencia más limpia y rápida.
            </div>
        </div>


        <div class="toast fade show position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <img src="/vite.svg" className='me-2' alt="icon-alert" />
                <strong class="me-auto">Comunicado 1</strong>
                <small>Commits on Nov 9, 2024</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
            ¡La web estuvo temporalmente fuera de servicio, pero ya está todo solucionado! Lamentamos los inconvenientes causados y agradecemos tu paciencia. ¡Gracias por seguir con nosotros!
            </div>
        </div>
        
    </div>
  )
}

export default Toast