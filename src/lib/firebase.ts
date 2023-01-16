import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD-fajcSSpytrWXGcyjP1lwTRgUwI4G9_M",
    authDomain: "ideas-library.firebaseapp.com",
    projectId: "ideas-library",
    storageBucket: "ideas-library.appspot.com",
    messagingSenderId: "853208896470",
    appId: "1:853208896470:web:639a4a5eb9386e16bd8a77",
    measurementId: "G-PMCZZYTDSY"
  };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);


export default app;
export { auth, db };





