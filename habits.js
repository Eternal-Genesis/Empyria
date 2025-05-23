// 🧱 BLOQUE 4 – habits.js

// Datos simulados de hábitos diarios por bloque
const HABITOS = {
  morning: ["Hacer la cama", "Meditación", "Agua con limón"],
  afternoon: ["Almuerzo saludable", "Pausa consciente", "Revisión de tareas"],
  night: ["Lectura", "Diario reflexivo", "Desconexión digital"],
};

// Estado actual de hábitos (puede persistirse en localStorage)
let estadoHabitos = {};

// Carga estado desde localStorage o crea uno nuevo
function cargarEstado() {
  const saved = localStorage.getItem("estadoHabitos");
  estadoHabitos = saved ? JSON.parse(saved) : {};
}

// Guarda estado en localStorage
function guardarEstado() {
  localStorage.setItem("estadoHabitos", JSON.stringify(estadoHabitos));
}

// Renderiza los hábitos en cada bloque
function renderizarHabitos() {
  Object.entries(HABITOS).forEach(([bloque, lista]) => {
    const contenedor = document.getElementById(`habits-${bloque}`);
    if (!contenedor) return;
    contenedor.innerHTML = "";

    lista.forEach((nombre) => {
      const id = `${bloque}-${nombre}`;
      const nodo = document.createElement("div");
      nodo.classList.add("habit-node");
      nodo.textContent = nombre;

      // Aplicar clase según estado
      const estado = estadoHabitos[id];
      if (estado === "completed") nodo.classList.add("habit-completed");
      if (estado === "missed") nodo.classList.add("habit-missed");

      // Clic para alternar estado
      nodo.addEventListener("click", () => {
        if (estadoHabitos[id] === "completed") {
          estadoHabitos[id] = "missed";
        } else if (estadoHabitos[id] === "missed") {
          delete estadoHabitos[id]; // Reinicia
        } else {
          estadoHabitos[id] = "completed";
        }
        guardarEstado();
        renderizarHabitos(); // Refresca visualmente
      });

      contenedor.appendChild(nodo);
    });
  });
}

// Inicializa módulo
document.addEventListener("DOMContentLoaded", () => {
  cargarEstado();
  renderizarHabitos();
});
