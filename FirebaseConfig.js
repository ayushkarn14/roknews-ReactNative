// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA0coXq_RfrKcMXubbUMrcu_UHZwpILNRA",
    authDomain: "roknews-f560a.firebaseapp.com",
    projectId: "roknews-f560a",
    storageBucket: "roknews-f560a.appspot.com",
    messagingSenderId: "746102011813",
    appId: "1:746102011813:web:c6d830488bbcbd1128da4c",
    measurementId: "G-DMJEDTB7DS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);
export default app;
