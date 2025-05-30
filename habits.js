// 🧠 habits.js – Visualización y gestión completa de hábitos (creación y edición)

function cargarHabitos() {
  const container = document.getElementById("habits-container");
  if (!container) return;

  const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
  container.innerHTML = "";

  habitos.forEach(h => {
    const card = document.createElement("div");
    card.className = "habit-card";

    card.innerHTML = `
      <div class="habit-info">
        <span class="habit-icon">${h.icono || "🧩"}</span>
        <span class="habit-name">${h.nombre}</span>
      </div>
      <div class="habit-actions">
        <button title="Editar" onclick="editarHabito('${h.id}')">✏️</button>
      </div>
    `;

    container.appendChild(card);
  });
}

function editarHabito(id) {
  const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
  const habit = habitos.find(h => h.id === id);
  if (!habit) return;

  const nuevoNombre = prompt("Editar nombre del hábito:", habit.nombre);
  if (nuevoNombre) {
    habit.nombre = nuevoNombre;
    localStorage.setItem("habitos", JSON.stringify(habitos));
    cargarHabitos();
  }
}

function nuevoHabito() {
  const nombre = prompt("Nombre del nuevo hábito:");
  if (!nombre) return;

  const icono = prompt("Icono para el hábito (emoji):", "🧩");
  const nuevo = {
    id: crypto.randomUUID(),
    nombre,
    icono,
    estado: "pending"
  };

  const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
  habitos.push(nuevo);
  localStorage.setItem("habitos", JSON.stringify(habitos));
  cargarHabitos();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-nuevo-habito")?.addEventListener("click", nuevoHabito);
  cargarHabitos();
});

