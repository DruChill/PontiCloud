import React from 'react'

function Alert() {
  return (
    <div className="alert alert-info alert-dismissible fade show" role="alert">
        ¡La web estuvo temporalmente fuera de servicio, pero ya está todo solucionado!
        Lamentamos los inconvenientes causados y agradecemos tu paciencia. ¡Gracias por seguir con nosotros!
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}

export default Alert