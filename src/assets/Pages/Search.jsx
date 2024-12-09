import React, { useState } from 'react';
import { db } from '../../firebase'; // Ajusta la ruta según sea necesario
import { collection, query, where, getDocs } from 'firebase/firestore';

function Search() {
  const [userEmail, setUserEmail] = useState('');
  const [files, setFiles] = useState([]);

  const handleSearch = async () => {
    const q = query(collection(db, "files"), where("userEmail", "==", userEmail));
    const querySnapshot = await getDocs(q);
    const userFiles = querySnapshot.docs.map(doc => doc.data());
    setFiles(userFiles);
  };

  return (
    <>
      <div>Aqui puedes filtrar tus archivos subidos con tu correo
        <a href="/">Regresar</a>
      </div>
      <input
        type="text"
        placeholder="Ingresa tu correo"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <div>
        {files.map((file, index) => (
          <div key={index}>
            <p>Nombre: {file.name}</p>
            <p>URL: <a href={file.url} target="_blank" rel="noopener noreferrer">{file.url}</a></p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Search;