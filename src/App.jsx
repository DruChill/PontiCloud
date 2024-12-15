import { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db, uploadFile } from './firebase';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './App.css';
import Header from './assets/Components/Header';
import Footer from './assets/Components/Footer';

const App = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

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
    if (file.size > 5 * 1024 * 1024) {
      alert("El archivo es muy pesado solo se admite 5MB");
      return;
    }
    try {
      NProgress.start();
      await uploadFile(file);
      NProgress.done();
      setSelectedFileName(null);
    } catch (error) {
      NProgress.done();
      console.log(error);
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = files.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <div>

        
        <div className="table">
          <img src="/icon_logo_ligth_mode.png" alt="waifu" />
          <div className="row">
            <div className="cell">Nombre del archivo</div>
            <div className="cell">Peso del archivo</div>
            <div className="cell">Fecha</div>
          </div>
          
          {loading && <div className="cell" colSpan="3">Cargando...</div>}
          {currentRows.map(file => (
            <div className="row" key={file.id}>
              <div className="cell">{file.name}</div>
              <div className="cell">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
              <div className="cell">{file.uploadedAt.toDate().toLocaleDateString()}</div>
            </div>
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: Math.ceil(files.length / rowsPerPage) }, (_, index) => (
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