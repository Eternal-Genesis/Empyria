// 🧱 BLOQUE PROFILE.JS

// Determina el estado mental basado en datos simples
function calcularEstadoMental() {
  const habitos = JSON.parse(localStorage.getItem("estadoHabitos") || "{}");
  const diario = JSON.parse(localStorage.getItem("diario") || "[]");

  const completados = Object.values(habitos).filter(e => e === "completed").length;
  const entradas = diario.length;

  if (completados >= 9 && entradas >= 10) return "Flujo óptimo";
  if (completados >= 5 || entradas >= 5) return "Enfocado";
  if (completados > 0 || entradas > 0) return "Activo pero inestable";
  return "Inactivo o disperso";
}

// Genera logros básicos basados en acciones
function calcularLogros() {
  const diario = JSON.parse(localStorage.getItem("diario") || "[]");
  const habitos = JSON.parse(localStorage.getItem("estadoHabitos") || "{}");

  const logros = [];

  if (diario.length >= 1) logros.push("✍️ Primera entrada escrita");
  if (diario.length >= 10) logros.push("📓 10 reflexiones completadas");

  const completados = Object.values(habitos).filter(e => e === "completed").length;
  if (completados >= 1) logros.push("✅ Primer hábito cumplido");
  if (completados >= 10) logros.push("🔥 10 hábitos realizados");

  return logros;
}

// Renderiza el estado y logros en la vista
function renderizarPerfil() {
  const estado = calcularEstadoMental();
  const estadoElemento = document.getElementById("estado-mental");
  if (estadoElemento) estadoElemento.textContent = estado;

  const lista = document.getElementById("lista-logros");
  const logros = calcularLogros();
  lista.innerHTML = "";

  logros.forEach(logro => {
    const item = document.createElement("li");
    item.textContent = logro;
    lista.appendChild(item);
  });
}
import { auth } from "./firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  getRedirectResult
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Configura el comportamiento de autenticación
function configurarAutenticacion() {
  const btnLogin = document.getElementById("login-google");
  const btnLogout = document.getElementById("logout");
  console.log("Login button:", btnLogin);
  console.log("Logout button:", btnLogout);

  if (!btnLogin || !btnLogout) return;

  const provider = new GoogleAuthProvider();

  btnLogin.addEventListener("click", async () => {
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        await signInWithPopup(auth, provider);
      }
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  });

  btnLogout.addEventListener("click", async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert("Error al cerrar sesión: " + error.message);
    }
  });
} // <- ESTA LLAVE CIERRA las funciónes correctamente!
// Ejecutar solo cuando los elementos ya están en el DOM
setTimeout(() => {
  console.log("⏱️ Ejecutando inicialización diferida de profile.js");

  renderizarPerfil();
  configurarAutenticacion();

  onAuthStateChanged(auth, (user) => {
    const btnLogin = document.getElementById("login-google");
    const btnLogout = document.getElementById("logout");

    if (!btnLogin || !btnLogout) return;

    btnLogin.style.display = user ? "none" : "inline-block";
    btnLogout.style.display = user ? "inline-block" : "none";

    const infoUsuario = document.getElementById("user-info");
    if (infoUsuario) {
      infoUsuario.textContent = user
        ? `Sesión activa como: ${user.displayName || user.email}`
        : "";
    }
  });
  getRedirectResult(auth)
  .then((result) => {
    if (result && result.user) {
      console.log("✅ Usuario autenticado tras redirección:", result.user.displayName);
    }
  })
  .catch((error) => {
    console.error("❌ Error tras redirección:", error.message);
  });
}, 50); // pequeño retardo para esperar el DOM inyectado

// === BOTÓN DE INSTALACIÓN DE LA APP ===
let deferredPrompt = null;

// Una vez el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
  const installBtn = document.getElementById("btn-install-pwa");

  if (installBtn) {
    installBtn.addEventListener("click", async () => {
      if (!deferredPrompt) {
        alert("⚠️ La instalación no está disponible en este momento.");
        return;
      }

      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        console.log("✅ Usuario aceptó la instalación.");
      } else {
        console.log("❌ Usuario canceló la instalación.");
      }

      deferredPrompt = null;
      const section = document.getElementById("install-pwa-section");
      if (section) section.style.display = "none";
    });
  }

  // Ocultar si ya está en modo app
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  if (isStandalone) {
    const section = document.getElementById("install-pwa-section");
    if (section) section.style.display = "none";
  }
});
