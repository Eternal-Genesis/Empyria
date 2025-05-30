// 🧠 habits.js – Visualización y gestión de hábitos

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
  alert("Abrir editor para hábito ID: " + id);
  // Aquí puedes redirigir o abrir un modal de edición
}

function nuevoHabito() {
  alert("Abrir formulario para nuevo hábito");
  // Aquí puedes redirigir o abrir un modal de creación
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-nuevo-habito")?.addEventListener("click", nuevoHabito);
  cargarHabitos();
});

