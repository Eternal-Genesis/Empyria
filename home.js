// 🧠 home.js – Header y hábitos del día usando localStorage

function obtenerSaludo() {
  const hora = new Date().getHours();
  if (hora < 12) return "Buenos días";
  if (hora < 18) return "Buenas tardes";
  return "Buenas noches";
}

function obtenerFecha() {
  const fecha = new Date();
  const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  return {
    dia: fecha.getDate(),
    nombre: dias[fecha.getDay()]
  };
}

function cargarHabitosDelDia() {
  const lista = document.querySelector(".habit-list");
  if (!lista) return;

  const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
  lista.innerHTML = "";

  habitos.forEach(h => {
    const card = document.createElement("div");
    card.className = `habit-card ${h.estado || "pending"}`;

    card.innerHTML = `
      <div class="habit-info">
        <span class="habit-icon">${h.icono || "🧩"}</span>
        <span class="habit-name">${h.nombre}</span>
      </div>
      <span class="habit-status">${h.estado === "completed" ? "✔️" : h.estado === "missed" ? "❌" : "⏳"}</span>
    `;

    lista.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const saludoEl = document.getElementById("home-greeting");
  const diaEl = document.getElementById("home-day");
  const nombreEl = document.getElementById("home-weekday");

  const saludo = obtenerSaludo();
  const { dia, nombre } = obtenerFecha();

  saludoEl.textContent = saludo;
  diaEl.textContent = dia;
  nombreEl.textContent = nombre;

  cargarHabitosDelDia();
});
