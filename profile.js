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
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged
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
      await signInWithPopup(auth, provider);
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
}
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
// Ejecutar solo cuando los elementos ya están en el DOM
setTimeout(() => {
  console.log("⏱️ Ejecutando inicialización diferida de profile.js");

  renderizarPerfil();
  configurarAutenticacion();

  getRedirectResult(auth)
    .then((result) => {
      if (result?.user) {
        console.log("✅ Usuario autenticado:", result.user.displayName || result.user.email);
      }
      console.log("👁️ Estado actual de auth:", auth.currentUser);
    })
    .catch((error) => {
      alert("Error al procesar inicio de sesión: " + error.message);
    });
}, 50); // pequeño retardo para esperar el DOM inyectado


