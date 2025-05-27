// 🧱 BLOQUE – firebase.js
// Inicializa Firebase y prepara los servicios necesarios

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics-compat.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9M6vM_aD6k_7SWTdU9ItHqbJVPt1wFo4",
  authDomain: "genesissystem-first.firebaseapp.com",
  projectId: "genesissystem-first",
  storageBucket: "genesissystem-first.appspot.com",
  messagingSenderId: "90166657524",
  appId: "1:90166657524:web:cb0d09adb367789717b9a1",
  measurementId: "G-W6NEEBV2KE"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("🔥 Firebase inicializado");

// Exportar servicios para usar en otros módulos
export { app, analytics, auth, db };
