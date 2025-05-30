// 🧠 home.js – Header tipo HabitNow (fecha y saludo minimalista)

function obtenerSaludo() {
  const hora = new Date().getHours();
  if (hora < 12) return "Buenos días";
  if (hora < 18) return "Buenas tardes";
  return "Buenas noches";
}

function formatearFecha() {
  const fecha = new Date();
  const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const diaNombre = dias[fecha.getDay()];
  const diaNumero = fecha.getDate();
  return { dia: diaNumero, nombre: diaNombre };
}

document.addEventListener("DOMContentLoaded", () => {
  const saludoEl = document.getElementById("home-greeting");
  const fechaEl = document.getElementById("home-date");

  const saludo = obtenerSaludo();
  const { dia, nombre } = formatearFecha();

  saludoEl.textContent = saludo;
  fechaEl.textContent = `${nombre}, ${dia}`;
});
