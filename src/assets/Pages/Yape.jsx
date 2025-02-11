import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import ReusableSection from '../Components/ReusableSection'
import { onSnapshot, collection, query, orderBy, doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { db, uploadFile } from '../../firebase';

function Yape() {


  const [visitCounter, setVisitCounter] = useState(0);
  const [hasIncremented, setHasIncremented] = useState(false); // Nuevo estado para controlar la ejecución



  useEffect(() => {
    const incrementVisitCounter = async () => {
      if (hasIncremented) return; // Verifica si ya se ha incrementado

      const visitCounterRef = doc(db, 'config', 'visitCounter');
    
      // Incrementar el contador en 1
      await updateDoc(visitCounterRef, {
        count: increment(1)
      });
      // Obtener el valor actualizado
      const visitCounterSnap = await getDoc(visitCounterRef);
      if (visitCounterSnap.exists()) {
        setVisitCounter(visitCounterSnap.data().count); // Actualiza el estado con el valor del contador
      }
      setHasIncremented(true); // Marca como incrementado
    };

    // Llamar a la función cuando se visite la página
    incrementVisitCounter();
  }, [hasIncremented]); // El array vacío asegura que esto solo se ejecute una vez cuando el componente se monte


  return (
    <div className='hero__container'>
      <Header />
      <div className="lg:p-0 p-3 grid grid-cols-1 lg:grid-cols-2 items-center text-base-content gap-4 lg:container mx-auto">
        <div>
          <ReusableSection
            title='Tu apoyo, '
            highlight='Nuestro impulso'
            paragraph='Si crees en el acceso libre y gratuito a los recursos educativos, tu apoyo puede marcar la diferencia. Con tu donación, podremos seguir ofreciendo un espacio sin barreras, donde los estudiantes puedan compartir y acceder a archivos universitarios de manera fácil y gratuita. Cada pequeña aportación ayuda a mantener este proyecto funcionando y creciendo, beneficiando a más estudiantes. ¡Gracias por tu generosidad!'
          />
          <div className='flex items-center gap-5'>

            <a href="https://bit.ly/paypalDonateDru" target='blank'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12.5 2c3.113 0 5.309 1.785 5.863 4.565c1.725 1.185 2.637 3.152 2.637 5.435c0 2.933 -2.748 5.384 -5.783 5.496l-.217 .004h-1.754l-.466 2.8a1.998 1.998 0 0 1 -1.823 1.597l-.157 .003h-2.68a1.5 1.5 0 0 1 -1.182 -.54a1.495 1.495 0 0 1 -.348 -1.07l.042 -.29h-1.632c-1.004 0 -1.914 -.864 -1.994 -1.857l-.006 -.143l.01 -.141l1.993 -13.954l.003 -.048c.072 -.894 .815 -1.682 1.695 -1.832l.156 -.02l.143 -.005h5.5zm5.812 7.35l-.024 .087c-.706 2.403 -3.072 4.436 -5.555 4.557l-.233 .006h-2.503v.05l-.025 .183l-1.2 5a1.007 1.007 0 0 1 -.019 .07l-.088 .597h2.154l.595 -3.564a1 1 0 0 1 .865 -.829l.121 -.007h2.6c2.073 0 4 -1.67 4 -3.5c0 -1.022 -.236 -1.924 -.688 -2.65z"></path>
              </svg>
            </a>

            <a href='https://link.mercadopago.com.pe/drudev' target='blank'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                <path d="M12 19h-6a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5"></path>
                <path d="M3 10h18"></path>
                <path d="M7 15h.01"></path>
                <path d="M11 15h2"></path>
                <path d="M16 19h6"></path>
                <path d="M19 16l-3 3l3 3"></path>
              </svg>
            </a>

            <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>
              Yape
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                <path d="M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3z"></path>
                <path d="M9 14v4c0 1.656 2.686 3 6 3s6 -1.344 6 -3v-4"></path>
                <path d="M3 6c0 1.072 1.144 2.062 3 2.598s4.144 .536 6 0c1.856 -.536 3 -1.526 3 -2.598c0 -1.072 -1.144 -2.062 -3 -2.598s-4.144 -.536 -6 0c-1.856 .536 -3 1.526 -3 2.598z"></path>
                <path d="M3 6v10c0 .888 .772 1.45 2 2"></path>
                <path d="M3 11c0 .888 .772 1.45 2 2"></path>
              </svg>
            </button>
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <img src="/yape.JPG" alt="yape-qr-image" />
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
          
        </div>

        <div>
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <div className="stat-title">Total de Donativos</div>
            <div className="stat-value text-primary">12 Veces</div>
            <div className="stat-desc">21% más que el mes pasado</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
            <div className="avatar online">
                <div className="w-16 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </div>
            <div className="stat-title">Total de visitas</div>
            <div className="stat-value text-secondary"> {visitCounter} Personas</div>
            <div className="stat-desc">18% más que el mes pasado</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div className="stat-value">30%</div>
            <div className="stat-title">Para nuevas</div>
            <div className="stat-desc text-secondary">funciones</div>
          </div>
          
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Yape