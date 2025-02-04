import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ContactForm() {
  const [state, handleSubmit] = useForm("mlekepaw");
  if (state.succeeded) {
      return <p>Gracias por enviar tu comentario!</p>;
  }
  return (
    <div className='container'>
        <Header />
        <div className='mt-4 px-2'>
            <h1><span className='text-info'>¡Tu opinión importa!</span> Ayúdanos a mejorar tu experiencia.</h1>
            <p>¿Encontraste algún problema o tienes sugerencias para mejorar la web? ¡Nos encantaría saber tu opinión! Tu feedback nos ayuda a hacer de esta plataforma un mejor espacio para compartir y subir tus trabajos de estudio. Cualquier comentario o inconveniente que encuentres, ¡estaríamos felices de escucharlo!</p>
        </div>
        <div>
            <form onSubmit={handleSubmit} className="mt-5 px-2">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                    Email Address
                    </label>
                    <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control border-info"
                    />
                    <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                    Message
                    </label>
                    <textarea
                    id="message"
                    name="message"
                    className="form-control border-info"
                    rows="5"
                    />
                    <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    />
                </div>
                <button type="submit" className="btn btn-info" disabled={state.submitting}>
                    Enviar
                </button>
            </form>
        </div>
        <Footer />
    </div>
  );
}

function App() {
  return (
    <ContactForm />
  );
}

export default App;