// 🧠 home.js – Header, hábitos del día y progreso diario con localStorage

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

function cambiarEstado(id) {
  const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
  const index = habitos.findIndex(h => h.id === id);
  if (index === -1) return;

  const estadoActual = habitos[index].estado || "pending";
  const siguienteEstado = estadoActual === "pending" ? "completed" : estadoActual === "completed" ? "missed" : "pending";
  habitos[index].estado = siguienteEstado;

  localStorage.setItem("habitos", JSON.stringify(habitos));
  cargarHabitosDelDia();
  actualizarProgreso();
}

function cargarHabitosDelDia() {
  const lista = document.querySelector(".habit-list");
  if (!lista) return;

  const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
  lista.innerHTML = "";

  habitos.forEach(h => {
    const card = document.createElement("div");
    card.className = `habit-card ${h.estado || "pending"}`;
    card.addEventListener("click", () => cambiarEstado(h.id));

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

function actualizarProgreso() {
  const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
  const total = habitos.length;
  const completados = habitos.filter(h => h.estado === "completed").length;
  const porcentaje = total ? Math.round((completados / total) * 100) : 0;

  const progreso = document.getElementById("progreso-habitos");
  if (progreso) progreso.textContent = `Progreso diario: ${porcentaje}% ✔️`;
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
  actualizarProgreso();
});
