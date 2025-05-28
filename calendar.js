// 🧱 BLOQUE 3 – calendar.js

// Simula una base de datos de tareas por bloque energético
const tareasPorBloque = {
  morning: [
    "Ejercicio ligero o estiramiento",
    "Planificación del día",
    "Escribir en el diario",
  ],
  afternoon: [
    "Trabajo profundo o estudio",
    "Ejecutar tareas principales",
    "Revisión de hábitos",
  ],
  night: [
    "Lectura reflexiva",
    "Preparar el día siguiente",
    "Ejercicio de respiración o meditación",
  ],
};

// Renderiza las tareas en el contenedor correspondiente
function cargarTareas() {
  for (const bloque in tareasPorBloque) {
    const lista = document.getElementById(`block-${bloque}`);
    if (lista) {
      lista.innerHTML = ""; // Limpiar contenido anterior
      tareasPorBloque[bloque].forEach((tarea) => {
        const item = document.createElement("li");
        item.textContent = tarea;
        item.style.marginBottom = "8px";
        lista.appendChild(item);
      });
    }
  }
}

// Ejecuta la carga al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  cargarTareas();
});
