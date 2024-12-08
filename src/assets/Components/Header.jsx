import React from 'react'

function Header() {
  return (
    <header className='pb-md-2 mb-md-3 p-0 mb-1 border-bottom d-flex align-items-center justify-content-around'>
        <div className='d-flex align-items-center text-body-emphasis'>
            <a href="/">
                <img src="/icon_logo_ligth_mode.png" alt=""  style={{ width: '70px' }}/>
            </a>
        </div>
        <nav className='text-info'>
            <ul className='d-flex list-unstyled mb-0 gap-3 fs-4'>
                <li>
                    <a href="https://github.com/DruChill/PontiCloud/releases">
                        <i class="bi bi-github"></i>
                    </a>
                </li>
                <li>
                    <a href="/yape.JPG" className='link-opacity-50-hover'>
                        <i class="bi bi-balloon-heart"></i>
                    </a>
                </li>
                <li>
                    <a href="mailto:andruvrr@gmail.com">
                        <i class="bi bi-envelope-heart-fill"></i>
                    </a>
                </li>
                {/* <li>
                    <a href="/sobrenosotros">Mas info</a>
                </li> */}
            </ul>
        </nav>
  </header>
  )
}

export default Header