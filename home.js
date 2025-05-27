// 🧱 BLOQUE 2 – home.js

// Simula una carga de energía diaria (0 a 100%)
function cargarEnergia() {
  const energia = Math.floor(Math.random() * 61) + 40; // valor entre 40 y 100
  const fill = document.getElementById("energy-fill");
  if (fill) {
    fill.style.width = `${energia}%`;
    fill.title = `Energía actual: ${energia}%`;
  }
}

// Simula sugerencias IA diarias
function cargarSugerenciaIA() {
  const sugerencias = [
    "Haz solo una cosa, pero hazla completamente.",
    "Tu foco es tu poder más valioso hoy.",
    "Respira. Todo lo demás puede esperar.",
    "Avanza con calma, pero avanza.",
    "La claridad nace del orden mental.",
  ];
  const texto = sugerencias[Math.floor(Math.random() * sugerencias.length)];
  const contenedor = document.getElementById("suggestion-text");
  if (contenedor) {
    contenedor.textContent = texto;
  }
}

// Inicializa elementos de la vista de inicio
document.addEventListener("DOMContentLoaded", () => {
  cargarEnergia();
  cargarSugerenciaIA();
});
