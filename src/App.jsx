import { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy, doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { db, uploadFile } from './firebase';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './App.css';
import Header from './assets/Components/Header';
import Footer from './assets/Components/Footer';
import Animation from './assets/Components/Animation';

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
    <div className='hero__container' onDrop={handleDrop} 
    onDragOver={handleDragOver} 
    style={{ width: '100vw', height: '100vh'}}>
      <Header />
      <main>
        <div>
          <h1>Ponti<span className="color">Cloud</span> </h1>
          <i className="bi bi-option"></i> <Animation />
          
          <p>Este proyecto está bajo investigación y desarrollo activo. Habrá fallas aquí y allá, pero en general funciona sin problemas. Recuerda solo subir material de trabajo, como archivos Pdf, Word, Excel etc..</p>
          <form onSubmit={handleSubmit}>
            
            {/* <div className='premium'>
              <div className='funcion__premium'>
                <input
                  className='correo__input'
                  type="email"
                  name='email'
                  placeholder="Ingresa tu correo"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>

              <div>
                <p><i className="bi bi-arrow-bar-left"></i> Premium <i className="bi bi-question-circle"></i></p>
              </div>
            </div> */}
            
            <div className='upload'>
              <label htmlFor="fileUpload" className="btn">
                Selecciona un archivo <i className="bi bi-collection"></i>
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
                className={`${!selectedFileName ? 'cursor-not-allowed' : ''}`}
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

        <div>
          <table>
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
                <td colSpan="3">Cargando los archivos... Esto tomará solo un momento.</td>
              </tr>
            ) : (
              currentRows.map((file) => (
                <tr key={file.id}>
                  <td>
                    <i className="bi bi-file-earmark-arrow-down"></i> <a href={file.url}>{file.name}</a>
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

          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredFiles.length / rowsPerPage) }, (_, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;