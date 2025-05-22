import React from 'react'
import { useForm, ValidationError } from '@formspree/react';
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import ReusableSection from '../Components/ReusableSection'

function ContactForm() {
  const [state, handleSubmit] = useForm("mlekepaw");
  if (state.succeeded) {
      return <div className="mockup-browser bg-base-300 border">
      <div className="mockup-browser-toolbar">
        <div className="input">ponticloud.web.app</div>
      </div>
      <div className="bg-base-200 flex justify-center px-4 py-16">Gracias por tu comentario!</div>
    </div>;
  }
  
  return (
    <div className='hero__container'>
      <Header />
      <div className="lg:p-0 p-3 grid grid-cols-1 lg:grid-cols-2 items-center text-base-content gap-4 lg:container mx-auto">

        <div>
          <ReusableSection
            title='¡Tu opinión '
            highlight='importa!'
            paragraph='¿Encontraste algún problema o tienes sugerencias para mejorar la web? ¡Nos encantaría saber tu opinión! Tu feedback nos ayuda a hacer de esta plataforma un mejor espacio para compartir y subir tus trabajos de estudio. Cualquier comentario o inconveniente que encuentres, ¡estaríamos felices de escucharlo!'
          />
        </div>

        <div className="card bg-base-100  shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input id='email' type="email" name='email' placeholder="email" className="input input-bordered" required />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Mensaje</span>
              </label>
              <textarea className='textarea textarea-bordered' placeholder='Hola tengo un problema con...  / Hola sugiero que...' name="message" id="message"></textarea>
              <ValidationError prefix="Message" field="message" errors={state.errors} />

              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label> */}
            </div>
            <div className="form-control mt-6">
              <button type='submit' disabled={state.submitting} className="btn btn-primary">Enviar <i className="bi bi-send"></i></button>
            </div>
          </form>
        </div>

      </div>
      <Footer />
    </div>
  )
  
}

function App() {
  return (
    <ContactForm />
  );
}

export default App;