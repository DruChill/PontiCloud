import { useEffect, useState } from 'react';
import { onSnapshot, collection } from "firebase/firestore";
import { db, uploadFile } from './firebase';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './App.css';

function App() {

  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "files"), (snapshot) => {
      setFiles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate()));
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check file size
    if (file.size > 5 * 1024 * 1024) { // 5 MB
      alert("El archivo es muy pesado y solo se admite 5MB");
      return;
    }
    try {
      NProgress.start(); // Inicia la barra de progreso
      await uploadFile(file);
      NProgress.done(); // Finaliza la barra de progreso
      setSelectedFileName(null);
    } catch (error) {
      NProgress.done(); // Asegúrate de finalizar la barra de progreso incluso si hay un error
      console.log(error);
    }
  };

  return (
    <div>
      <main>
        <div className='container py-2'>
          <header className='pb-md-2 mb-md-3 p-0 mb-1 border-bottom d-flex align-items-center justify-content-around'>
            <div className='d-flex align-items-center text-body-emphasis'>
              <img src="/icon_logo_ligth_mode.png" alt=""  style={{ width: '60px' }}/>
              <span className='fs-4 ms-3'>PontiCloud<span className='text-header'> | Student Cloud</span></span>
            </div>
            <a className='text-decoration-none text-info' href="https://github.com/DruChill/PontiCloud">Pre-lanzamiento: V1.1</a>
          </header>

          <main className='text-center'>
            <div>
              <h1>PontiCloud</h1>
              <p>Este proyecto está bajo investigación y desarrollo activo. Habrá fallas aquí y allá, pero en general es fluido. <br />
              Recuerda solo subir material de trabajo, como archivos Pdf, Rar, Word, Excel etc..
              </p>
            </div>

            <div className='my-4'>
              <form onSubmit={handleSubmit}>
                <input
                  className='btn btn-outline-secondary'
                  style={{ display: 'none' }} 
                  type="file" 
                  id="fileUpload" 
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setSelectedFileName(e.target.files[0]?.name);
                  }} 
                />
                <label htmlFor="fileUpload" className='me-2 btn btn-outline-secondary'>
                  Selecionar archivo
                </label>
                <button className='ms-2 btn btn btn-secondary' type="submit">Subir Archivo</button>
                <p className='mt-3'>
                  {selectedFileName ? ` Archivo seleccionado: ${selectedFileName}` : 'Tu archivo aparecerá aquí abajo una vez terminado el proceso de carga.'}
                </p>
              </form>
            </div>

            <div>
              {files.map((file) => (
                <div className='d-flex justify-content-center' key={file.id}>
                  <a className='text-info' href={file.url}>{file.name}</a>
                  <p className='ms-4 text-white'>{file.timestamp.toDate().toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                </div>
              ))}
            </div>
          </main>

          <footer className='footer pt-3 mt-4 text-body-secondary border-top d-flex justify-content-between'>
            <p>Powered by StudentCloud - AA.RR</p>
            <p>&copy; 2024</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;