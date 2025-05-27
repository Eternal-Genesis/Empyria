// 🧱 BLOQUE – firebase.js (versión ES6 modular completa)

// Importar solo módulos ES
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

console.log("🔥 Firebase inicializado (modular)");

// Exportar para uso en otros módulos
export { app, db, auth };
