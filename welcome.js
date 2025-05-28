// 🌀 Carrusel motivacional
const slides = [
  "📊 Visualizá tu energía y hábitos diarios",
  "🧠 Mejora tu enfoque con IA personalizada",
  "📅 Organizá tu día según tu biorritmo",
  "🎯 Desbloqueá todo esto al registrarte gratis por 7 días",
];

let index = 0;

function rotarCarrusel() {
  const texto = document.getElementById("slide-text");
  if (texto) {
    texto.textContent = slides[index];
    index = (index + 1) % slides.length;
  }
}

setInterval(rotarCarrusel, 4000);
rotarCarrusel();

// 🧱 welcome.js – Modularizado y funcional sin esperar DOMContentLoaded

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

const msg = document.getElementById("login-msg");

function mostrarMensaje(texto, tipo = "info") {
  msg.textContent = texto;
  msg.style.color = tipo === "error" ? "var(--color-error)" : "var(--color-success)";
}

function validarCampos(email, password) {
  return email && password;
}

async function verificarAcceso(uid) {
  const ref = doc(db, "usuarios", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    mostrarMensaje("❌ No se encontró el usuario en la base.", "error");
    return;
  }

  const { fechaInicio } = snap.data();
  const inicio = new Date(fechaInicio);
  const hoy = new Date();
  const dias = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24));

  if (dias <= 7) {
    mostrarMensaje(`✅ Acceso válido (${7 - dias} días restantes)`, "success");
    location.hash = "#/inicio";
  } else {
    mostrarMensaje("⛔ Tu prueba gratuita terminó. Por favor pagá para continuar.", "error");
  }
}

async function procesarLogin(email, password) {
  try {
    console.log("🔵 Intentando iniciar sesión con:", email);
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    verificarAcceso(userCred.user.uid);
  } catch (loginError) {
    if (loginError.code === "auth/user-not-found") {
      console.log("🟠 Usuario no encontrado. Iniciando registro...");
      try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const fechaHoy = new Date().toISOString();
        await setDoc(doc(db, "usuarios", userCred.user.uid), {
          email,
          fechaInicio: fechaHoy
        });
        mostrarMensaje("✅ Registro exitoso. Accediendo...", "success");
        location.hash = "#/inicio";
      } catch (registroError) {
        mostrarMensaje("Error al registrar: " + registroError.message, "error");
      }
    } else {
      mostrarMensaje("Error: " + loginError.message, "error");
    }
  }
}

// 🧠 Ejecutar directo (sin esperar DOMContentLoaded)
const expirado = sessionStorage.getItem("acceso_expirado");
if (expirado) {
  mostrarMensaje("⛔ Tu prueba gratuita ha expirado. Por favor, pagá para continuar.", "error");
  sessionStorage.removeItem("acceso_expirado");
}

document.getElementById("login-btn")?.addEventListener("click", () => {
  console.log("🟡 Clic detectado en login-btn");
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!validarCampos(email, password)) {
    mostrarMensaje("Por favor, completá ambos campos.", "error");
    return;
  }

  procesarLogin(email, password);
});
