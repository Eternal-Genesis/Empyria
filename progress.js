// 🧱 BLOQUE 6 – progress.js

// Simula valores de energía para 7 días
function mostrarGraficoEnergia() {
  const container = document.getElementById("energy-graph");
  if (!container) return;

  container.innerHTML = "";
  const dias = ["L", "M", "X", "J", "V", "S", "D"];

  dias.forEach((dia) => {
    const valor = Math.floor(Math.random() * 60) + 40; // 40 a 100
    const barra = document.createElement("div");
    barra.style.height = `${valor}px`;
    barra.style.width = "10px";
    barra.style.background = "#4BD2E5";
    barra.style.borderRadius = "4px";
    barra.title = `${dia}: ${valor}%`;
    container.appendChild(barra);
  });
}

// Analiza hábitos completados vs fallidos
function mostrarGraficoHabitos() {
  const grafico = document.getElementById("habits-graph");
  const datos = JSON.parse(localStorage.getItem("estadoHabitos") || "{}");

  let completados = 0;
  let fallidos = 0;

  Object.values(datos).forEach((estado) => {
    if (estado === "completed") completados++;
    if (estado === "missed") fallidos++;
  });

  const total = completados + fallidos || 1;
  const porcentaje = Math.round((completados / total) * 100);

  grafico.style.background = `conic-gradient(#2AF598 0% ${porcentaje}%, #FF5F6D ${porcentaje}% 100%)`;
  grafico.textContent = `${porcentaje}% ✔️`;
}

// Cuenta entradas del diario en el mes actual
function mostrarActividadDiario() {
  const entradas = JSON.parse(localStorage.getItem("diario") || "[]");
  const ahora = new Date();
  const esteMes = entradas.filter((e) => {
    const fecha = new Date(e.fecha);
    return fecha.getMonth() === ahora.getMonth() && fecha.getFullYear() === ahora.getFullYear();
  });
  document.getElementById("diary-count").textContent = `Entradas este mes: ${esteMes.length}`;
}

// Inicializa todo
document.addEventListener("DOMContentLoaded", () => {
  mostrarGraficoEnergia();
  mostrarGraficoHabitos();
  mostrarActividadDiario();
});
