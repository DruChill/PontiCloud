// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDJUkSnKfiRNSDiwYsRp3CxXRAzqoOBrqk",
  authDomain: "ponticloud.firebaseapp.com",
  projectId: "ponticloud",
  storageBucket: "ponticloud.appspot.com",
  messagingSenderId: "879462971456",
  appId: "1:879462971456:web:680dc7a556c12805b047a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export function uploadFile(file) {
  const storageRef = ref(storage, "some-chield")
  uploadBytes(storageRef, file).then( snapshot => {
    console.log(snapshot)
  })
}