import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBI3xSyp25Wr85G99tpGRNapedbKr01MrU",
    authDomain: "nateo-39d05.firebaseapp.com",
    projectId: "nateo-39d05",
    storageBucket: "nateo-39d05.firebasestorage.app",
    messagingSenderId: "150031930946",
    appId: "1:150031930946:web:ea6878c0509ddcff133fdb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);