import React from 'react'

function Footer() {
  const today = new Date();

  return (
    <footer>
    <p>&copy;by Andru RR</p>
    <div className='social__media'>
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