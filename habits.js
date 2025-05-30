// 🧠 habits.js – Carga robusta con soporte y manejo de errores

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
  try {
    const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
    const habit = habitos.find(h => h.id === id);
    if (!habit) return;

    const nuevoNombre = prompt("Editar nombre del hábito:", habit.nombre);
    if (nuevoNombre) {
      habit.nombre = nuevoNombre;
      localStorage.setItem("habitos", JSON.stringify(habitos));
      cargarHabitos();
    }
  } catch (e) {
    console.error("Error al editar hábito:", e);
  }
}

function nuevoHabito() {
  try {
    const nombre = prompt("Nombre del nuevo hábito:");
    if (!nombre) return;

    const icono = prompt("Icono para el hábito (emoji):", "🧩");
    const id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString();

    const nuevo = {
      id,
      nombre,
      icono,
      estado: "pending"
    };

    const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
    habitos.push(nuevo);
    localStorage.setItem("habitos", JSON.stringify(habitos));
    cargarHabitos();
  } catch (e) {
    console.error("Error al crear nuevo hábito:", e);
  }
}

// ✅ Ejecutar cuando la vista ya esté renderizada
setTimeout(() => {
  try {
    document.getElementById("btn-nuevo-habito")?.addEventListener("click", nuevoHabito);
    cargarHabitos();
  } catch (e) {
    console.error("Error al inicializar hábitos:", e);
  }
}, 100);
