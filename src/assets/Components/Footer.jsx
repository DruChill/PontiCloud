import React from 'react'

function Footer() {
  const today = new Date();

  return (
    <footer>
    <p>&copy; PontiCloud.</p>
    <div className='social__media'>
      <a href="https://github.com/DruChill/PontiCloud" target='blank'>
        <i class="bi bi-github"></i>
      </a>
      <a href="#">
        <i class="bi bi-twitter"></i>
      </a>
      <a href="#">
        <i class="bi bi-facebook"></i>
      </a>
      <a href="#">
        <i class="bi bi-instagram"></i>
      </a>
    </div>
    <p>&hearts;{today.getFullYear()}</p>
  </footer>
  )
}

export default Footer