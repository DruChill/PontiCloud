import React from 'react'

const Plataformas = () => {
    const plataformas = [
        {
            title: 'Campus MS 365',
            img: '/Campus-MS-365.png',
            url: 'https://portal.office.com/'
        },

        {
            title: 'Aula Virtual',
            img: '/aula-virtual-elp.png',
            url: 'https://aulavirtual.elp.edu.pe/auth/oidc/'
        },
        {
            title: 'Pontisis',
            img: '/Intranet-elp.png',
            url: 'https://pontisis.elp.edu.pe/redirect/alu/microsoft'
        }
    ]
  return (
    
    <div>
      <h3 className='mt-10 mb-3 text-sm'>Plataformas Virtuales Elp:</h3>
      <div className='grid grid-cols-3 gap-4 max-w-lg text-center'>
        {plataformas.map((plataforma, index) => (
        
        <div key={index} className="relative  shadow-xl group overflow-hidden rounded-xl bg-base-300">
            <h2 className="text-sm font-bold overflow-hidden text-ellipsis whitespace-nowrap p-4">{plataforma.title}</h2>
            <a href={plataforma.url}  target='_blank' className="w-auto absolute inset-0 bg-base-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-5">
              <figure>
                <img src={plataforma.img} alt={plataforma.img} />
              </figure>
            </a>
        </div>
        ))}
    </div>
    </div>
    
  )
}

export default Plataformas