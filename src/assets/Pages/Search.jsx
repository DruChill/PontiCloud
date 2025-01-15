import React, { useState } from 'react';
import { db } from '../../firebase'; // Ajusta la ruta según sea necesario
import { collection, query, where, getDocs } from 'firebase/firestore';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './Search.css';

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
    <div className='search__container'>
      <Header />
      <div className='main__search'>
      <h1>Buscar archivos</h1>
      <p>Aqui puedes encontrar tus archivos con tu correo o usuario</p>
      <div className='premium__search'>
        <input
          className='correo__input'
          type="text"
          placeholder="Ingresa tu correo"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button className='correo__input' onClick={handleSearch}>Buscar</button>
      </div>
      <div>
        {files.map((file, index) => (
          <div key={index}>
            <p>Aqui abajo aparecera tu archivo y click para descargarlo</p>
            {/* <p>Nombre: {file.name}</p> */}
            <p>URL: <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a></p>
          </div>
        ))}
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default Search;