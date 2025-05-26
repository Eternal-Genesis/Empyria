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

// Renderiza info de sesión
import { auth } from './firebase.js';

function renderizarSesion() {
  const contenedor = document.getElementById("auth-info");
  if (!contenedor) return;

  const user = auth.currentUser;
  if (user) {
    const nombre = user.displayName || "Sin nombre";
    const email = user.email;
    const creado = user.metadata.creationTime;

    contenedor.innerHTML = `
      <p><strong>Usuario:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Registrado:</strong> ${creado}</p>
      <button id="logout-btn" class="btn btn-secondary" style="margin-top: 10px;">Cerrar sesión</button>
    `;

    document.getElementById("logout-btn").addEventListener("click", () => {
      auth.signOut().then(() => location.reload());
    });
  } else {
    contenedor.innerHTML = `
      <p>No has iniciado sesión.</p>
      <button id="login-btn" class="btn btn-primary" style="margin-top: 10px;">Iniciar sesión</button>
    `;
    document.getElementById("login-btn").addEventListener("click", () => {
      alert("⚠️ Módulo de login aún no implementado.");
    });
  }
}

// Ejecutar ambas funciones al cargar la vista
document.addEventListener("DOMContentLoaded", () => {
  renderizarPerfil();
  renderizarSesion();
});

