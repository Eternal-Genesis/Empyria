import { auth, db } from './firebase.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Carrusel de beneficios
const slides = [
  "📊 Visualiza tu energía y hábitos diarios",
  "🧠 Mejora tu enfoque con IA personalizada",
  "📅 Organiza tu día según tu biorritmo",
  "🎯 Desbloqueá todas estas funciones al registrarte",
];
let index = 0;

function rotarCarrusel() {
  const texto = document.getElementById("slide-text");
  texto.textContent = slides[index];
  index = (index + 1) % slides.length;
}
setInterval(rotarCarrusel, 4000);
rotarCarrusel(); // primer mensaje

// Login o Registro
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-btn").addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const msg = document.getElementById("login-msg");

    if (!email || !password) {
      msg.textContent = "Por favor, completa ambos campos.";
      msg.style.color = "var(--color-error)";
      return;
    }

    try {
      // Primero intenta login
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      verificarAcceso(user.uid);
    } catch (loginError) {
      if (loginError.code === "auth/user-not-found") {
        // Si no existe, lo registramos
        try {
          const userCred = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCred.user;
          const fechaHoy = new Date().toISOString();
          await setDoc(doc(db, "usuarios", user.uid), {
            email,
            fechaInicio: fechaHoy
          });
          msg.textContent = "✅ Registro exitoso. Accediendo...";
          msg.style.color = "var(--color-success)";
          location.hash = "#/inicio";
        } catch (registroError) {
          msg.textContent = "Error al registrar: " + registroError.message;
          msg.style.color = "var(--color-error)";
        }
      } else {
        msg.textContent = "Error: " + loginError.message;
        msg.style.color = "var(--color-error)";
      }
    }
  });
});

// Validar acceso por 7 días
async function verificarAcceso(uid) {
  const msg = document.getElementById("login-msg");
  const ref = doc(db, "usuarios", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    msg.textContent = "❌ No se encontró el usuario en la base.";
    return;
  }

  const { fechaInicio } = snap.data();
  const inicio = new Date(fechaInicio);
  const hoy = new Date();
  const dias = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24));

  if (dias <= 7) {
    msg.textContent = `✅ Acceso válido (${7 - dias} días restantes)`;
    msg.style.color = "var(--color-success)";
    location.hash = "#/inicio";
  } else {
    msg.textContent = "⛔ Tu prueba gratuita terminó. Por favor pagá para continuar.";
    msg.style.color = "var(--color-error)";
    // Aquí podrías mostrar botón para pagar
  }
}

