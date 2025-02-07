import { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy, doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { db, uploadFile } from './firebase';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './App.css';
import Header from './assets/Components/Header';
import Footer from './assets/Components/Footer';

import ReusableSection from './assets/Components/ReusableSection';

const App = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [userEmail, setUserEmail] = useState('');
  const rowsPerPage = 10;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "files"), orderBy("uploadedAt", "desc")),
      (snapshot) => {
        setFiles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    setSelectedFileName(droppedFile.name);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setSelectedFileName(selectedFile.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailField = e.target.email;
    const email = emailField ? emailField.value : ''; // Verifica si el campo de correo electrónico existe
    const fileSizeLimit = email ? 100 * 1024 * 1024 : 5 * 1024 * 1024; // 50 MB si hay correo, 5 MB si no logica

    // Check file size
    if (file.size > fileSizeLimit) {
      alert(`El archivo es muy pesado, solo se admite ${email ? '100MB' : '50MB'}`); // Premium 100MB, Free 50MB Alerta
      return;
    }

    try {
      NProgress.start(); // Inicia la barra de progreso
      await uploadFile(file, email);
      NProgress.done(); // Finaliza la barra de progreso
      setSelectedFileName(null);
    } catch (error) {
      NProgress.done(); // Finaliza la barra de progreso en caso de error
      alert(error.message); // Muestra el mensaje de error
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const filteredFiles = files.filter(file => !file.userEmail); // Filtra los archivos que no tienen correo electrónico
  const currentRows = filteredFiles.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='hero__container bg-dark' onDrop={handleDrop} 
    onDragOver={handleDragOver} 
    style={{ width: '100vw', height: '100vh'}}>
      <Header />
      <main className="lg:p-0 p-3 grid grid-cols-1 lg:grid-cols-2 items-center text-base-content gap-4 lg:container mx-auto">
        <div>
          <ReusableSection
            title="Ponti"
            highlight="Cloud"
            paragraph="Este proyecto está bajo investigación y desarrollo activo. Habrá fallas aquí y allá, pero en general funciona sin problemas. Recuerda solo subir material de trabajo, como archivos Pdf, Word, Excel etc.."
          />
          <form onSubmit={handleSubmit}>
            <div className='flex items-center mb-2'>
              <div>
                <input
                  className='input input-bordered input-primary w-full max-w-xs'
                  type="email"
                  name='email'
                  placeholder="Ingresa tu correo"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
              <div>
                <p><i className="ms-1 bi bi-arrow-bar-left"></i> Premium <i className="bi bi-question-circle "></i></p>
              </div>
            </div>
            
            <div className='mb-4'>
              <label htmlFor="fileUpload" className="btn btn-active btn-primary me-4">
                Selecciona un archivo o arrástralo aquí<i className="bi bi-collection"></i>
                <input
                  id="fileUpload"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setSelectedFileName(e.target.files[0]?.name);
                  }}
                />
              </label>

              <button
                className={`${!selectedFileName ? 'btn lg:mt-0 mt-1' : 'btn btn-active btn-secondary'}`}
                type="submit"
                disabled={!selectedFileName} // Deshabilita el botón si no se ha seleccionado un archivo
              >
                Subir Archivo <i className="bi bi-cloud-upload"></i>
              </button>

            </div>
            <p>
              {selectedFileName ? <span>Archivo seleccionado: <span className="file-select glowing-text">{selectedFileName}</span></span> : 'Tu archivo aparecerá en la tabla una vez terminado el proceso de carga.'}
            </p>
          </form>
        </div>
        <div className='grid grid-cols-1 lg:gap-4 gap-0 items-center'>
          <div className="overflow-x-auto">
            <table className='table table-compact bg-base-200 shadow'>
              <thead> 
                <tr>
                  <th><i className="bi bi-translate"></i> Nombre del archivo</th>
                  <th><i className="bi bi-hdd"></i> Tamaño del archivo</th>
                  <th><i className="bi bi-calendar-week"></i> Fecha</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3">Cargando los archivos... Esto tomará solo un momento. <span className="loading loading-dots loading-sm"></span></td>
                  </tr>
                ) : (
                  currentRows.map((file) => (
                    <tr key={file.id}>
                      <td className='link link-hover truncate max-w-[350px]'>
                        <i className="bi bi-file-earmark-arrow-down"></i> <a target='blank' href={file.url}>{file.name}</a>
                      </td>
                      <td>
                        <i className="bi bi-hdd"></i> {(file.size / 1048576).toFixed(2)} MB
                      </td>
                      <td>
                        <i className="bi bi-calendar-week"></i> {file.uploadedAt.toDate().toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(filteredFiles.length / rowsPerPage) }, (_, index) => (
              <input
                key={index + 1}
                className="join-item btn btn-square"
                type="radio"
                name="pagination"
                aria-label={index + 1}
                checked={currentPage === index + 1}
                onChange={() => paginate(index + 1)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;