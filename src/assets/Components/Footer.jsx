import React from 'react'

function Footer() {
  const today = new Date();

  return (
    <footer className='flex justify-around text-md p-5 bg-base-100 text-base-content'>
    <p>&copy;by Andru RR</p>
    <div className='flex text-2xl gap-4'>
      <a href="https://github.com/DruChill/PontiCloud" target='blank'>
        <i className="bi bi-github"></i>
      </a>
      <a href="https://www.paypal.com/donate/?hosted_button_id=7P22SAK9FTTJC" target='blank'>
        <i className="bi bi-paypal"></i>
      </a>
      <a href="https://web.facebook.com/andru.ramirezrodriguez" target='blank'>
        {/* <i className="bi bi-twitter-x"></i> */}
        <i className="bi bi-facebook"></i>
      </a>
      {/* <a href="#">
        <i className="bi bi-discord"></i>
      </a>
      <a href="#">
        <i className="bi bi-book"></i>
      </a> */}
    </div>
    <p>&hearts; {today.getFullYear()}</p>
  </footer>
  )
}

export default Footer