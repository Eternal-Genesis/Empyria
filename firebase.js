// 🧱 BLOQUE 1 – firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Configuración de tu proyecto GenesisSystem-First
const firebaseConfig = {
  apiKey: "AIzaSyB9M6vM_aD6k_7SWTdU9ItHqbJVPt1wFo4",
  authDomain: "genesissystem-first.firebaseapp.com",
  projectId: "genesissystem-first",
  storageBucket: "genesissystem-first.appspot.com",
  messagingSenderId: "90166657524",
  appId: "1:90166657524:web:cb0d09adb367789717b9a1",
  measurementId: "G-W6NEEBV2KE"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios que usarás en la app
export const auth = getAuth(app);
export const db = getFirestore(app);
