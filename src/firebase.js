import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  // Your web app's Firebase configuration
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Obtener la instancia de Firebase Storage

const isUserApproved = async (userEmail) => {
  const q = query(collection(db, "approvedUsers"), where("email", "==", userEmail));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

const uploadFile = async (file, userEmail, onProgress) => {
  if (userEmail && !(await isUserApproved(userEmail))) {
    throw new Error("Usuario no autorizado para subir archivos.");
  }

  const uuid = uuidv4();
  const extension = file.name.split('.').pop();
  let folderName = userEmail ? userEmail : 'public';

  if (file.type.includes('pdf')) {
    folderName = 'pdf';
  } else if (file.type.includes('word')) {
    folderName = 'word';
  } else if (file.type.includes('image')) {
    folderName = 'images';
  } else {
    folderName = 'others';
  }

  const fileRef = ref(storage, `${folderName}/${uuid}.${extension}`);

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        if (onProgress) {
          onProgress({
            loaded: snapshot.bytesTransferred,
            total: snapshot.totalBytes
          });
        }
      },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const fileURL = await getDownloadURL(uploadTask.snapshot.ref);
          const fileData = {
            name: file.name,
            type: file.type,
            size: file.size,
            folder: folderName,
            url: fileURL,
            uploadedAt: new Date(),
            userEmail: userEmail,
          };
          const docRef = await addDoc(collection(db, "files"), fileData);
          resolve(docRef.id);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

export { db, uploadFile };