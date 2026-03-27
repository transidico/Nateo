// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBI3xSyp25Wr85G99tpGRNapedbKr01MrU",
    authDomain: "nateo-39d05.firebaseapp.com",
    projectId: "nateo-39d05",
    storageBucket: "nateo-39d05.firebasestorage.app",
    messagingSenderId: "150031930946",
    appId: "1:150031930946:web:ea6878c0509ddcff133fdb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getAuth } from 'firebase/auth';
export const auth = getAuth(app);