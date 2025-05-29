// 🧱 welcome.js – Control robusto de errores en verificación de acceso

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

const msg = document.getElementById("login-msg");

function mostrarMensaje(texto, tipo = "info") {
  msg.textContent = texto;
  msg.style.color = tipo === "error" ? "var(--color-error)" : "var(--color-success)";
}

function validarCampos(email, password) {
  return email && password;
}

async function verificarAcceso(uid) {
  try {
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
      sessionStorage.setItem("acceso_expirado", true);
      mostrarMensaje("⛔ Tu prueba gratuita terminó. Por favor pagá para continuar.", "error");
      location.hash = "#/welcome";
    }
  } catch (error) {
    console.error("❌ Error al verificar acceso en Firestore:", error.message);
    mostrarMensaje("No se pudo verificar el acceso. Verificá tu conexión.", "error");
    location.hash = "#/welcome";
  }
}

async function procesarLogin(email, password) {
  try {
    console.log("🔵 Intentando iniciar sesión con:", email);
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    verificarAcceso(userCred.user.uid);
  } catch (loginError) {
    if (
      loginError.code === "auth/user-not-found" ||
      loginError.code === "auth/invalid-login-credentials"
    ) {
      console.log("🟠 Usuario no encontrado. Iniciando registro...");
      try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const fechaHoy = new Date().toISOString();
        await setDoc(doc(db, "usuarios", userCred.user.uid), {
          email,
          fechaInicio: fechaHoy
        });
        mostrarMensaje("✅ Registro exitoso. Accediendo...", "success");

setTimeout(() => {
  console.log("🚀 Redirigiendo a #/inicio...");
  location.hash = "#/inicio";
}, 1000);
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

// Lógica de transición entre pasos

// Detectar clic en el botón 'Quiero esto'
document.getElementById('btn-continuar').addEventListener('click', () => {
  console.log('🔵 Clic detectado en el botón Quiero esto');
  // Redirigir a la siguiente sección (registro)
  location.hash = '#/registro';
});

// Animación de carrusel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

// Función para avanzar al siguiente slide
function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
  } else {
    currentSlide = 0;
  }
  updateCarousel();
}

// Actualizar el carrusel (mueve los slides)
function updateCarousel() {
  const offset = -currentSlide * 100 + '%';
  document.querySelector('.carousel').style.transform = `translateX(${offset})`;
}

// Avanzar al siguiente slide cada 4 segundos
setInterval(nextSlide, 4000);
