// habits.js — Empyria: Hábitos en modo local (actualizado hasta paso 4)

const STORAGE_KEY = "habitosPorDia";
const bloques = ["morning", "afternoon", "night"];

// Fecha actual en formato YYYY-MM-DD
function obtenerFechaActual() {
  return new Date().toISOString().split("T")[0];
}

// Obtener hábitos del día
function obtenerHabitosDelDia(fecha = obtenerFechaActual()) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  return data[fecha] || {};
}

// Guardar hábitos del día
function guardarHabitosDelDia(habitos, fecha = obtenerFechaActual()) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  data[fecha] = habitos;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Alternar estado de hábito (pendiente ↔ completado)
function toggleEstadoHabito(id, fecha = obtenerFechaActual()) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  const habitos = data[fecha] || {};
  const habito = habitos[id];
  if (!habito) return;

  habito.estado = habito.estado === "completed" ? "pending" : "completed";
  data[fecha] = habitos;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  cargarHabitos(fecha);
}

// Eliminar hábito por ID
function eliminarHabito(id, fecha = obtenerFechaActual()) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  const habitos = data[fecha] || {};
  if (!habitos[id]) return;

  delete habitos[id];
  data[fecha] = habitos;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  cargarHabitos(fecha);
}

// Crear nuevo hábito desde modal
function crearHabitoDesdeModal() {
  const nombre = document.getElementById("input-nombre").value.trim();
  const bloque = document.getElementById("input-bloque").value;

  if (!nombre || !bloque) {
    alert("Por favor completá todos los campos.");
    return;
  }

  const id = crypto.randomUUID();
  const fecha = obtenerFechaActual();
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  const dia = data[fecha] || {};

  dia[id] = {
    nombre,
    bloque,
    estado: "pending"
  };

  data[fecha] = dia;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  cerrarModalHabito();
  cargarHabitos();
}

// Abrir el modal
function abrirModalHabito() {
  const modal = document.getElementById("modal-habito");
  if (modal) modal.style.display = "flex";
}

// Cerrar el modal y limpiar campos
function cerrarModalHabito() {
  const modal = document.getElementById("modal-habito");
  if (modal) modal.style.display = "none";
  document.getElementById("input-nombre").value = "";
  document.getElementById("input-bloque").value = "morning";
}

// Mostrar hábitos en pantalla
function cargarHabitos(fecha = obtenerFechaActual()) {
  const habitos = obtenerHabitosDelDia(fecha);

  bloques.forEach((bloque) => {
    const contenedor = document.getElementById(`habits-${bloque}`);
    if (!contenedor) return;

    contenedor.innerHTML = "";

    Object.entries(habitos).forEach(([id, h]) => {
      if (h.bloque !== bloque) return;

      // Contenedor del hábito
      const div = document.createElement("div");
      div.className = "habit-node";
      div.style.display = "flex";
      div.style.justifyContent = "space-between";
      div.style.alignItems = "center";

      // Texto del hábito
      const texto = document.createElement("span");
      texto.textContent = h.nombre;
      texto.style.flex = "1";
      texto.style.cursor = "pointer";

      if (h.estado === "completed") {
        texto.classList.add("habit-completed");
      } else {
        texto.classList.add("habit-pending");
      }

      texto.addEventListener("click", () => toggleEstadoHabito(id, fecha));

      // Botón de eliminar 🗑️
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "🗑️";
      btnEliminar.style.background = "transparent";
      btnEliminar.style.border = "none";
      btnEliminar.style.cursor = "pointer";
      btnEliminar.style.marginLeft = "8px";
      btnEliminar.title = "Eliminar hábito";

      btnEliminar.addEventListener("click", (e) => {
        e.stopPropagation(); // evita activar el cambio de estado
        eliminarHabito(id, fecha);
      });

      div.appendChild(texto);
      div.appendChild(btnEliminar);
      contenedor.appendChild(div);
    });
  });
}

// Al cargar la vista
document.addEventListener("DOMContentLoaded", () => {
  cargarHabitos();

  const btnAbrir = document.getElementById("agregar-habito");
  const btnCancelar = document.getElementById("btn-cancelar");
  const btnCrear = document.getElementById("btn-crear");

  if (btnAbrir) btnAbrir.addEventListener("click", abrirModalHabito);
  if (btnCancelar) btnCancelar.addEventListener("click", cerrarModalHabito);
  if (btnCrear) btnCrear.addEventListener("click", crearHabitoDesdeModal);
});

