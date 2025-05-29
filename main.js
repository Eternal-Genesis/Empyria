// 🧱 BLOQUE 1 – main.js

// Carga la plantilla base (template.html) y la inserta en #app
async function loadBaseTemplate() {
  const res = await fetch("template.html");
  const html = await res.text();
  const template = document.createElement("div");
  template.innerHTML = html;
  const content = template.querySelector("#base-template").content.cloneNode(true);
  document.getElementById("app").innerHTML = "";
  document.getElementById("app").appendChild(content);

  // ✅ Importante: renderizar íconos después de insertar el DOM
  if (window.lucide) lucide.createIcons();
}

// Carga la vista HTML dentro del <main>
async function loadView(route) {
  const routeData = routes[route];
  if (!routeData) return;

  const res = await fetch(routeData.view);
  const html = await res.text();
  document.getElementById("view-container").innerHTML = html;

  // Cargar y ejecutar el script correspondiente como módulo ES6
const script = document.createElement("script");
script.src = routeData.script;
script.type = "module"; // ✅ Esto permite usar 'import' dentro del script
document.body.appendChild(script);

  // Actualiza la navegación activa
  setActiveNav(route);
  setGlowColor(route);

  // 🔧 Activar íconos Lucide después de cargar vista
  if (window.lucide) lucide.createIcons();

  // 🟢 Agregar aquí el listener del botón de tema (si la vista es "profile")
  if (route === "profile") {
    const btnTema = document.getElementById("toggle-theme");
    if (btnTema) {
      btnTema.addEventListener("click", alternarTema);
    }
  }
}

// Marca el botón activo en el menú inferior
function setActiveNav(route) {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    const isActive = btn.dataset.route === route;
    btn.classList.toggle("active", isActive);
  });
}

import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  getDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

function handleRouteChange() {
  const route = location.hash.replace("#/", "") || "inicio";

  onAuthStateChanged(auth, async (user) => {
    const rutaLibre = route === "welcome";

if (!user) {
  if (!rutaLibre) {
    location.hash = "#/welcome";
    return;
  } else {
    // 🔓 Usuario no logueado, pero está en ruta libre → cargar la vista
    console.log("✅ Usuario no logueado, pero en ruta libre:", route);
    loadBaseTemplate().then(() => loadView(route));
    return;
  }
}
try {
  const ref = doc(db, "usuarios", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    console.warn("⚠️ Usuario sin documento en Firestore. Redirigiendo...");
    location.hash = "#/welcome";
    return;
  }

  const { fechaInicio } = snap.data();
  const inicio = new Date(fechaInicio);
  const hoy = new Date();
  const diasPasados = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24));
  const accesoValido = diasPasados <= 7;

  if (!accesoValido && !rutaLibre) {
    sessionStorage.setItem("acceso_expirado", true);
    location.hash = "#/welcome";
    return;
  }

  // ✅ Si todo está bien, continuar
  loadBaseTemplate().then(() => loadView(route));

} catch (error) {
  console.error("❌ Error al obtener datos de Firestore:", error.message);
  alert("No se pudo conectar con Firestore. Redirigiendo a modo limitado...");
  loadBaseTemplate().then(() => loadView("welcome"));
}
    const { fechaInicio } = snap.data();
    const inicio = new Date(fechaInicio);
    const hoy = new Date();
    const diasPasados = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24));

    const accesoValido = diasPasados <= 7;

    if (!accesoValido && !rutaLibre) {
      sessionStorage.setItem("acceso_expirado", "true");
      location.hash = "#/welcome";
      return;
    }

    loadBaseTemplate().then(() => loadView(route));
  });
}

window.addEventListener("hashchange", handleRouteChange);
window.addEventListener("DOMContentLoaded", handleRouteChange);

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".nav-btn");
  if (btn && btn.dataset.route) {
    location.hash = `#/${btn.dataset.route}`;
  }
});

// Maneja clicks en los botones del menú (incluso si se clickea el ícono SVG)
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".nav-btn");
  if (btn && btn.dataset.route) {
    location.hash = `#/${btn.dataset.route}`;
  }
});
function setGlowColor(route) {
  const colorMap = {
    inicio: "#4BD2E5",
    habits: "#FFDE59",
    tasks: "#2AF598",
    progress: "#9F4FFF",
    profile: "#FF5F6D",
  };
  const nav = document.querySelector(".bottom-nav");
  if (nav) {
    nav.style.setProperty("--glow-color", colorMap[route] || "#4BD2E5");
  }
}
// === Gestión Global de Tema (oscuro/claro) ===

function aplicarTemaGuardado() {
  const tema = localStorage.getItem("tema") || "oscuro";
  if (tema === "claro") {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
  }
}
function alternarTema() {
  const temaActual = document.body.classList.contains("light-theme") ? "claro" : "oscuro";
  const nuevoTema = temaActual === "oscuro" ? "claro" : "oscuro";
  localStorage.setItem("tema", nuevoTema);

  // 🟢 Activar animación
  document.body.classList.add("theme-switching");
  aplicarTemaGuardado();

  // 🟢 Quitar la clase después de la animación (0.4s = 400ms)
  setTimeout(() => {
    document.body.classList.remove("theme-switching");
  }, 400);
}

// Aplica el tema guardado y configura el botón
document.addEventListener("DOMContentLoaded", () => {
  aplicarTemaGuardado();

  const btnTema = document.getElementById("toggle-theme");
  if (btnTema) {
    btnTema.addEventListener("click", alternarTema);
  }
});
