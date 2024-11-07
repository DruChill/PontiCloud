import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';


const firebaseConfig = {
  //your API keys of Firebase
};


// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Obtener la instancia de Firebase Storage

const uploadFile = async (file) => {
  const uuid = uuidv4(); // Genera un nuevo UUID para cada archivo que se va a subir

  let folderName = '';
  if (file.type.includes('pdf')) {
    folderName = 'pdf';
  } else if (file.type.includes('word')) {
    folderName = 'word';
  } else if (file.type.includes('image')) {
    folderName = 'images';
  } else {
    // Define una carpeta por defecto o maneja el error
    folderName = 'others'; // Por ejemplo, una carpeta para otros tipos de archivos
  }

  // Crea una referencia al lugar donde quieres guardar el archivo en Firebase Storage
  const fileRef = ref(storage, `${folderName}/${uuid}`);

  try {
    // Sube el archivo a Firebase Storage
    const uploadResult = await uploadBytes(fileRef, file);
    // Obtén la URL del archivo subido
    const fileURL = await getDownloadURL(uploadResult.ref);

    // Crea un documento en Firestore con los datos del archivo
    const fileData = {
      name: file.name,
      type: file.type,
      size: file.size,
      folder: folderName,
      url: fileURL,
      uploadedAt: new Date() // Fecha de subida
    };

    // Añade el documento a una colección llamada 'files'
    const docRef = await addDoc(collection(db, "files"), fileData);
    console.log("Documento escrito con ID: ", docRef.id);

    // Opcional: Retorna el ID del documento o cualquier otro dato relevante
    return docRef.id;
  } catch (error) {
    console.error("Error al subir el archivo o al guardar los datos en Firestore:", error);
    // Maneja el error adecuadamente
  }
};

export { db, uploadFile };