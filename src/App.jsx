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
      setFiles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check file size
    if (file.size > 5 * 1024 * 1024) { // 5 MB
      alert("El archivo es muy pesado solo se admite 5MB");
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
              <span className='fs-4 ms-3'>PontiCloud</span>
            </div>
            <nav className='text-info'>
              <ul className='d-flex list-unstyled mb-0'>
                <li className='me-3'>
                  <a href="#">Quiero mi propia nube</a>
                </li>
                <li>
                <a href="https://github.com/DruChill/PontiCloud">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg>
                  V0.5
                </a>
                </li>
              </ul>
            </nav>

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
                <label htmlFor="fileUpload" className='me-2 btn btn-outline-info'>
                  Selecionar archivo
                </label>
                <button className='ms-2 btn btn btn-info' type="submit">Subir Archivo</button>
                <p className='mt-3'>
                  {selectedFileName ? ` Archivo seleccionado: ${selectedFileName}` : 'Tu archivo aparecerá aquí abajo una vez terminado el proceso de carga.'}
                </p>
              </form>
            </div>

            <div>
              {files.map((file) => (
                <div className='d-flex justify-content-center' key={file.id}>
                  <a className='text-info me-4' href={file.url}>{file.name}</a>
                  <span className='me-4'>Fecha</span>
                  <span>{file.uploadedAt ? file.uploadedAt.toDate().toLocaleString() : 'Fecha desconocida'}</span>
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