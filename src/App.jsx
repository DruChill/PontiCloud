import './App.css';
import Header from './assets/Components/Header';
import Footer from './assets/Components/Footer';

const App = () => {
  return (
    <div className='hero__container'>
      <Header />
      <main>
        <div className='Container'>
          <h1>PontiCloud</h1>
          <p>Este proyecto está bajo investigación y desarrollo activo. Habrá fallas aquí y allá, pero en general funciona sin problemas. Recuerda solo subir material de trabajo, como archivos Pdf, Word, Excel etc..</p>
          <div className='upload'>
            <button>SELECIONAR ARCHIVO</button>
            <button>SUBIR</button>
          </div>
          <p>Tu archivo aparecerá en la tabla una vez terminado el proceso de carga.</p>
        </div>

        <div className="table">
          <img src="/icon_logo_ligth_mode.png" alt="waifu" />
          <div className="row">
            <div className="cell">Nombre del archivo</div>
            <div className="cell">Peso del archivo</div>
            <div className="cell">Fecha</div>
          </div>
          
          <div className="row">
            <div className="cell">documento.pdf</div>
            <div className="cell">2.5 MB</div>
            <div className="cell">2024-12-14</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;