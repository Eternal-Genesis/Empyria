// 🧠 habits.js – Corrección: botón insertado correctamente y modal controlado solo por click

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

function mostrarModal() {
  document.getElementById("modal-habito").classList.add("active");
}

function ocultarModal() {
  document.getElementById("modal-habito").classList.remove("active");
  document.getElementById("input-nombre").value = "";
  document.getElementById("input-icono").value = "";
}

function guardarHabito() {
  const nombre = document.getElementById("input-nombre").value.trim();
  const icono = document.getElementById("input-icono").value.trim() || "🧩";

  if (!nombre) {
    alert("El nombre del hábito es obligatorio.");
    return;
  }

  const id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString();
  const nuevo = { id, nombre, icono, estado: "pending" };

  const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
  habitos.push(nuevo);
  localStorage.setItem("habitos", JSON.stringify(habitos));

  ocultarModal();
  cargarHabitos();
}

function iniciarVistaHabitos() {
  if (!document.getElementById("btn-nuevo-habito")) {
    const btn = document.createElement("button");
    btn.id = "btn-nuevo-habito";
    btn.className = "btn-float";
    btn.setAttribute("aria-label", "Nuevo hábito");
    btn.textContent = "➕";
    btn.addEventListener("click", mostrarModal);
    document.querySelector(".section")?.appendChild(btn); // dentro del section, no body
  }

  document.getElementById("btn-cancelar")?.addEventListener("click", ocultarModal);
  document.getElementById("btn-guardar")?.addEventListener("click", guardarHabito);
  cargarHabitos();
}

// Detectar navegación en SPA y recargar la vista
window.addEventListener("hashchange", () => {
  if (location.hash === "#/habits") {
    setTimeout(iniciarVistaHabitos, 100);
  }
});

// Si ya estás en /habits al cargar
if (location.hash === "#/habits") {
  setTimeout(iniciarVistaHabitos, 100);
}
