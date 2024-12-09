// Make sure to run npm install @formspree/react
// For more help visit https://formspr.ee/react-help
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './ContactForm.css';

function ContactForm() {
  const [state, handleSubmit] = useForm("xbljedev");
  if (state.succeeded) {
    return <p>Thanks for joining! <a href="/">Regresar</a></p>;
  }
  return (
    <>
      <Header />
      <div className='container'> 
        <h1 className='text-center fs-4 my-4'>Aquí puedes reportar un error o ponernet en contacto conmigo!</h1>
        <form className='d-flex' onSubmit={handleSubmit}>
          <label htmlFor="email" className='text-info'>
            Email Address
          </label>
          <input
            id="email"
            type="email" 
            name="email"
          />
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
          />
          <textarea
            id="message"
            name="message"
          />
          <ValidationError 
            prefix="Message" 
            field="message"
            errors={state.errors}
          />
          <button type="submit" className='btn btn-outline-info' disabled={state.submitting}>
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}

function App() {
  return (
    <ContactForm />
  );
}

export default App;