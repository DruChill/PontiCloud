import { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy, doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { db, uploadFile } from './firebase';
import Header from './assets/Components/Header';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './App.css';
import Footer from './assets/Components/Footer';

function App() {

  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [visitCounter, setVisitCounter] = useState(0);

  useEffect(() => {

    const unsubscribe = onSnapshot(
      query(collection(db, "files"), orderBy("uploadedAt", "desc")), // Ordena los documentos por `uploadedAt` de forma descendente
      (snapshot) => {
        setFiles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    );

    const incrementVisitCounter = async () => {
      const visitCounterRef = doc(db, 'config', 'visitCounter');
    
      // Incrementar el contador en 1
      await updateDoc(visitCounterRef, {
        count: increment(1)
      });
      // Obtener el valor actualizado
      const visitCounterSnap = await getDoc(visitCounterRef);
      if (visitCounterSnap.exists()) {
        setVisitCounter(visitCounterSnap.data().count); // Actualiza el estado con el valor del contador
      }
    };

    // Llamar a la función cuando se visite la página
    incrementVisitCounter();
    
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
        <span>Visitas: {visitCounter}</span>
        <Header />
        <main className='text-center'>
          <div>
            <h1 className='fs-1'>PontiCloud</h1>
            <p>Este proyecto está bajo investigación y desarrollo. Habrá fallas aquí y allá, pero en general es fluido. <br />
            Recuerda solo subir material de trabajo, como archivos Pdf, Rar, Word, Excel etc..
            </p>
          </div>
          <div className='my-4'>
            <form onSubmit={handleSubmit}>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className='drop-zone'
                style={{ border: '2px dashed #ccc', padding: '20px', borderRadius: '10px' }}
              >
                <p>Arrastra y suelta tu archivo aquí, o haz clic para seleccionarlo.</p>
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
              </div>
              <button
                className={`mt-2 btn btn-info ${!selectedFileName ? 'opacity-50' : ''}`}
                type="submit"
                disabled={!selectedFileName} // Deshabilita el botón si no se ha seleccionado un archivo
              >
                Subir Archivo
              </button>
              
              <p className='mt-3'>
                {selectedFileName ? ` Archivo seleccionado: ${selectedFileName}` : 'Tu archivo aparecerá aquí abajo una vez terminado el proceso de carga.'}
              </p>
            </form>
          </div>
          <div className='d-flex justify-content-center'>
            <table>
              <thead>
                <tr className='text-info'>
                  <th>Nombre</th>
                  <th>Fecha y hora</th>  
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id}>
                    <td>{file.name}</td>
                    <td>{new Date(file.uploadedAt.seconds * 1000).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;