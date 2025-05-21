import React from 'react'

function Footer() {
  const today = new Date();

  return (
    <footer className='flex justify-around items-center text-md p-3 lg:p-5 bg-base-100 text-base-content'>
    <p>Powered by: <a href="https://www.instagram.com/andrurr_7u7/" target='_blank' className='link'>Dru</a></p>
    <div className='flex text-2xl gap-4'>
      {/* <a href="https://github.com/DruChill/PontiCloud" target='blank'>
        <i className="bi bi-github"></i>
      </a>
      <a href="https://www.paypal.com/donate/?hosted_button_id=7P22SAK9FTTJC" target='blank'>
        <i className="bi bi-paypal"></i>
      </a>

      <a href="/Horario.ics" target='blank'>
        <i class="bi bi-calendar-date"></i>
      </a>
      <a href="https://www.instagram.com/andrurr_7u7/" target='blank'>
        <i className="bi bi-instagram"></i>
      </a> */}
    </div>
    <p>&hearts; {today.getFullYear()}</p>
  </footer>
  )
}

export default Footer