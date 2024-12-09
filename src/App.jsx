import { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy, doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { db, uploadFile } from './firebase';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './App.css';


function App() {

  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {

    const unsubscribe = onSnapshot(
      query(collection(db, "files"), orderBy("uploadedAt", "desc")), // Ordena los documentos por `uploadedAt` de forma descendente
      (snapshot) => {
        setFiles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      }
    );
    
    return unsubscribe;
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setSelectedFileName(droppedFile.name);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check file size
    if (file.size > 5 * 1024 * 1024) { // 5 MB
      alert("El archivo es muy pesado solo se admite 5MB");
      return;
    }

    if (file) {
      await uploadFile(file, userEmail);
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
      <div className='container py-2'>
        <main className='text-center'>
          <a href="/search">Filtrar POR CORREO</a>
          <div className='my-4'>
            <form onSubmit={handleSubmit}>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className='drop-zone'
                
              >
                <label htmlFor="fileUpload" style={{ display: 'block', width: '100%', height: '100%' }}>
                  <img src="/adminBanner.png" alt="icon-drop" style={{pointerEvents: 'none', userSelect: 'none'}} />
                  <p>
                    Arrastra y suelta tu archivo aquí, tu archivo no debe pesar más de 5MB.
                  </p>
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
                </label>
              </div>
              <input
                type="email"
                placeholder="Ingresa tu correo"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <button
                className={`mt-2 btn btn-info ${!selectedFileName ? 'opacity-50' : ''}`}
                type="submit"
                disabled={!selectedFileName} // Deshabilita el botón si no se ha seleccionado un archivo
              >
                Subir Archivo
              </button>

              <p className='mt-3'>
                {selectedFileName ? <span>Archivo seleccionado: <span className="text-info">{selectedFileName}</span></span> : 'Tu archivo aparecerá aquí abajo una vez terminado el proceso de carga.'}
              </p>
            </form>
          </div>
          <div className='d-flex justify-content-center'>
            <table>
              <thead>
                <tr className='text-info'>
                  <th><i class="bi bi-file-earmark"></i> Nombre del archivo</th>
                  <th><i className="bi bi-hdd"></i> Tamaño del archivo</th>
                  <th><i class="bi bi-clock-history"></i> Fecha</th>
                </tr>
              </thead>
              <tbody>
        {loading ? (
          <tr>
            <td colSpan="3">¡Estamos buscando tu archivo, espera un toque nomás!</td>
          </tr>
        ) : (
          files.map((file) => (
            <tr key={file.id}>
              <td>
                <i class="bi bi-file-earmark"></i> <a className='text-decoration-none' href={file.url}>{file.name}</a>
              </td>
              <td>
                <i className="bi bi-hdd"></i> {(file.size / 1048576).toFixed(2)} MB
              </td>
              <td>
                <i class="bi bi-clock-history"></i> {file.uploadedAt.toDate().toLocaleDateString()}
              </td>
            </tr>
          ))
        )}
      </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;