// 🧱 BLOQUE 7 – profile.js

// Determina el estado mental basado en datos simples
function calcularEstadoMental() {
  const habitos = JSON.parse(localStorage.getItem("estadoHabitos") || "{}");
  const diario = JSON.parse(localStorage.getItem("diario") || "[]");

  const completados = Object.values(habitos).filter(e => e === "completed").length;
  const entradas = diario.length;

  if (completados >= 9 && entradas >= 10) return "Flujo óptimo";
  if (completados >= 5 || entradas >= 5) return "Enfocado";
  if (completados > 0 || entradas > 0) return "Activo pero inestable";
  return "Inactivo o disperso";
}

// Genera logros básicos basados en acciones
function calcularLogros() {
  const diario = JSON.parse(localStorage.getItem("diario") || "[]");
  const habitos = JSON.parse(localStorage.getItem("estadoHabitos") || "{}");

  const logros = [];

  if (diario.length >= 1) logros.push("✍️ Primera entrada escrita");
  if (diario.length >= 10) logros.push("📓 10 reflexiones completadas");

  const completados = Object.values(habitos).filter(e => e === "completed").length;
  if (completados >= 1) logros.push("✅ Primer hábito cumplido");
  if (completados >= 10) logros.push("🔥 10 hábitos realizados");

  return logros;
}

// Renderiza el estado y logros en la vista
function renderizarPerfil() {
  const estado = calcularEstadoMental();
  const estadoElemento = document.getElementById("estado-mental");
  if (estadoElemento) estadoElemento.textContent = estado;

  const lista = document.getElementById("lista-logros");
  const logros = calcularLogros();
  lista.innerHTML = "";

  logros.forEach(logro => {
    const item = document.createElement("li");
    item.textContent = logro;
    lista.appendChild(item);
  });
}

// Ejecutar al cargar la vista
document.addEventListener("DOMContentLoaded", () => {
  renderizarPerfil();
});
// 🧱 BLOQUE 7 – Ampliación: Cambio de Tema

function aplicarTemaGuardado() {
  const tema = localStorage.getItem("tema") || "oscuro";
  if (tema === "claro") {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
  }
}

function alternarTema() {
  const temaActual = document.body.classList.contains("light-theme") ? "claro" : "oscuro";
  const nuevoTema = temaActual === "oscuro" ? "claro" : "oscuro";
  localStorage.setItem("tema", nuevoTema);
  aplicarTemaGuardado();
}

// Ejecutar al cargar la vista
  renderizarPerfil();
  aplicarTemaGuardado();

  const btnTema = document.getElementById("toggle-theme");
  if (btnTema) {
    btnTema.addEventListener("click", alternarTema);
  }
});
