import React, { useState } from 'react';
import { db } from '../../firebase'; // Ajusta la ruta según sea necesario
import { collection, query, where, getDocs } from 'firebase/firestore';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ReusableSection from '../Components/ReusableSection';

function Search() {
  const [userEmail, setUserEmail] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleSearch = async () => {
    setLoading(true);
    const q = query(collection(db, "files"), where("userEmail", "==", userEmail));
    const querySnapshot = await getDocs(q);
    const userFiles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFiles(userFiles);
    setLoading(false);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = files.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className='hero__container'>
      <Header />
      <div className="lg:p-0 p-3 grid grid-cols-1 lg:grid-cols-2 items-center text-base-content gap-4 lg:container mx-auto">
        <div>
          <ReusableSection
            title="Encuentra tus "
            highlight="Archivos"
            paragraph="Solo para usuarios premium encuentra tus archivos de forma privada."
          />
          <div>
            <input
              className='input input-bordered input-accent'
              type="text"
              placeholder="Ingresa tu correo"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <button className='btn btn-secondary ms-2' onClick={handleSearch}>Buscar</button>
          </div>
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
                    <td colSpan="3">Buscando tus archivos... Esto tomará solo un momento. <span className="loading loading-dots loading-sm"></span></td>
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
            {Array.from({ length: Math.ceil(files.length / rowsPerPage) }, (_, index) => (
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
      </div>
      <Footer />
    </div>
  );
}

export default Search;