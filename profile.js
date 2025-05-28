// 🧱 profile.js – Muestra perfil, permite cerrar sesión y cambiar tema manualmente

// 🔗 Firebase Auth
import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// ⏳ Al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  const nombreEl = document.getElementById("nombre-usuario");
  const emailEl = document.getElementById("email-usuario");
  const btnCerrarSesion = document.getElementById("cerrar-sesion");
  const btnTema = document.getElementById("btn-tema");

  // 👤 Muestra info del usuario logueado
  onAuthStateChanged(auth, (user) => {
    if (user) {
      nombreEl.textContent = user.displayName || "Usuario";
      emailEl.textContent = user.email;
    } else {
      nombreEl.textContent = "-";
      emailEl.textContent = "-";
    }
  });

  // 🔒 Cierra sesión y redirige
  btnCerrarSesion?.addEventListener("click", async () => {
    try {
      await signOut(auth);
      location.hash = "#/welcome";
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  });

  // 🌓 Alterna tema claro/oscuro manualmente y guarda en localStorage
  btnTema?.addEventListener("click", () => {
    const root = document.documentElement;
    const actual = root.dataset.tema || "light";
    const nuevo = actual === "dark" ? "light" : "dark";
    root.dataset.tema = nuevo;
    localStorage.setItem("tema", nuevo);
  });

  // ✅ Aplica el tema guardado al iniciar
  const temaGuardado = localStorage.getItem("tema");
  if (temaGuardado) {
    document.documentElement.dataset.tema = temaGuardado;
  }
});
