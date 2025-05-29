// ✅ profile.js completo y optimizado

import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// ⏳ Esperar que el DOM esté cargado tras SPA
setTimeout(() => {
  const nombreEl = document.getElementById("nombre-usuario");
  const emailEl = document.getElementById("email-usuario");
  const btnCerrarSesion = document.getElementById("cerrar-sesion");
  const btnTema = document.getElementById("btn-tema");

  // ⚠️ Validación
  if (!btnCerrarSesion || !nombreEl || !emailEl) {
    console.warn("⚠️ Elementos del perfil no encontrados aún");
    return;
  }

  // 👤 Mostrar info del usuario logueado
  onAuthStateChanged(auth, (user) => {
    if (user) {
      nombreEl.textContent = user.displayName || "Usuario";
      emailEl.textContent = user.email;
    } else {
      nombreEl.textContent = "-";
      emailEl.textContent = "-";
    }
  });

  // 🔓 Cerrar sesión
  btnCerrarSesion.addEventListener("click", async () => {
    try {
      await signOut(auth);
      sessionStorage.clear();
      location.hash = "#/welcome";
      console.log("🚪 Sesión cerrada");
    } catch (err) {
      console.error("❌ Error al cerrar sesión:", err.message);
    }
  });

  // 🌓 Cambiar tema
  btnTema?.addEventListener("click", () => {
    const root = document.documentElement;
    const actual = root.dataset.tema || "light";
    const nuevo = actual === "dark" ? "light" : "dark";
    root.dataset.tema = nuevo;
    localStorage.setItem("tema", nuevo);
  });

  // 🌙 Aplicar tema guardado
  const temaGuardado = localStorage.getItem("tema");
  if (temaGuardado) {
    document.documentElement.dataset.tema = temaGuardado;
  }
}, 150); // Tiempo mínimo para asegurar carga de la vista
