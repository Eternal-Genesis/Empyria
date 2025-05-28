// habits.js — Paso 1: mostrar hábitos por bloque desde localStorage

const STORAGE_KEY = "habitosPorDia";
const bloques = ["morning", "afternoon", "night"];

// Devuelve la fecha de hoy en formato YYYY-MM-DD
function obtenerFechaActual() {
  return new Date().toISOString().split("T")[0];
}

// Devuelve los hábitos guardados para hoy
function obtenerHabitosDelDia(fecha = obtenerFechaActual()) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  return data[fecha] || {};
}

// Muestra los hábitos en la interfaz
function cargarHabitos(fecha = obtenerFechaActual()) {
  const habitos = obtenerHabitosDelDia(fecha);

  bloques.forEach((bloque) => {
    const contenedor = document.getElementById(`habits-${bloque}`);
    if (!contenedor) return;

    contenedor.innerHTML = "";

    Object.entries(habitos).forEach(([id, h]) => {
      if (h.bloque !== bloque) return;

      const div = document.createElement("div");
      div.className = "habit-node";
      div.textContent = h.nombre;

      contenedor.appendChild(div);
    });
  });
}

// Ejecutar cuando se carga la vista
document.addEventListener("DOMContentLoaded", () => {
  cargarHabitos();
});
