// BLOQUE – firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCZGoY5c9LeQQwPigOHR6LQDZRFNLMIzyU",
  authDomain: "genesissystem-private.firebaseapp.com",
  projectId: "genesissystem-private",
  storageBucket: "genesissystem-private.firebasestorage.app",
  messagingSenderId: "556103929119",
  appId: "1:556103929119:web:dac21b7061cb9dfd05742a",
  measurementId: "G-GQRRMN16HC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("🔥 Firebase inicializado correctamente (PRIVATE)");

export { app, db, auth };
