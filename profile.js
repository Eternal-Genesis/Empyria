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
  <p><strong>Iniciar sesión o registrarse</strong></p>
  <input id="login-email" type="email" placeholder="Correo electrónico" class="input" style="margin-top: 10px; width: 100%; padding: 10px; border-radius: 6px; border: none;" />
  <input id="login-password" type="password" placeholder="Contraseña" class="input" style="margin-top: 10px; width: 100%; padding: 10px; border-radius: 6px; border: none;" />

  <div style="margin-top: 12px; display: flex; gap: 10px;">
    <button id="btn-login" class="btn btn-primary">Entrar</button>
    <button id="btn-register" class="btn btn-secondary">Registrar</button>
  </div>

  <p id="login-msg" style="margin-top: 12px; font-weight: bold; color: var(--color-error);"></p>
`;

document.getElementById("btn-login").addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-password").value;

  try {
    await auth.signInWithEmailAndPassword(email, pass);
    location.reload();
  } catch (err) {
    document.getElementById("login-msg").textContent = "Error al iniciar sesión.";
    console.error(err);
  }
});

document.getElementById("btn-register").addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-password").value;

  try {
    const cred = await auth.createUserWithEmailAndPassword(email, pass);
    await db.collection("users").doc(cred.user.uid).set({
      email: cred.user.email,
      creado: new Date(),
      theme: "oscuro",
    });
    location.reload();
  } catch (err) {
    document.getElementById("login-msg").textContent = "Error al registrarse.";
    console.error(err);
  }
});
// Ejecutar ambas funciones al cargar la vista
document.addEventListener("DOMContentLoaded", () => {
  renderizarPerfil();
  renderizarSesion();
});

