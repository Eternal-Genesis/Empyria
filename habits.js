// habits.js — Empyria: Hábitos en modo local (actualizado hasta paso 4)

const STORAGE_KEY = "habitosPorDia";
const bloques = ["morning", "afternoon", "night"];
let habitoEditandoId = null;

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

  const fecha = obtenerFechaActual();
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  const dia = data[fecha] || {};

  if (habitoEditandoId) {
    // 👉 estamos editando
    dia[habitoEditandoId] = {
      ...dia[habitoEditandoId],
      nombre,
      bloque
    };
  } else {
    // 👉 es nuevo hábito
    const id = crypto.randomUUID();
    dia[id] = {
      nombre,
      bloque,
      estado: "pending"
    };
  }

  data[fecha] = dia;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  cerrarModalHabito();
  cargarHabitos();
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
// ABRIR EDICIÓN CON CAMPOS PRECARGADOS
function abrirEdicionHabito(id, habito) {
  habitoEditandoId = id;

  const modal = document.getElementById("modal-habito");
  if (modal) modal.style.display = "flex";

  document.getElementById("input-nombre").value = habito.nombre;
  document.getElementById("input-bloque").value = habito.bloque;
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

      Object.entries(habitos).forEach(([id, h]) => {
  if (h.bloque !== bloque) return;

  const wrapper = document.createElement("div");
  wrapper.className = "habit-swipe-wrapper";

  const actionPanel = document.createElement("div");
  actionPanel.className = "habit-actions";

  // Botón editar
  const btnEdit = document.createElement("button");
  btnEdit.className = "habit-edit";
  btnEdit.textContent = "✏️";
  btnEdit.addEventListener("click", () => {
    abrirEdicionHabito(id, h); // función que haremos
  });

  // Botón eliminar
  const btnDelete = document.createElement("button");
  btnDelete.className = "habit-delete";
  btnDelete.textContent = "🗑️";
  btnDelete.addEventListener("click", () => {
    eliminarHabito(id, fecha);
  });

  actionPanel.appendChild(btnEdit);
  actionPanel.appendChild(btnDelete);

  const nodo = document.createElement("div");
  nodo.className = "habit-node habit-swipe";
  nodo.textContent = h.nombre;

  if (h.estado === "completed") {
    nodo.classList.add("habit-completed");
  } else {
    nodo.classList.add("habit-pending");
  }

  nodo.addEventListener("click", () => toggleEstadoHabito(id, fecha));

  // Touch swipe
  let startX = 0;
  nodo.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  nodo.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) {
      wrapper.classList.add("show-actions");
    } else {
      wrapper.classList.remove("show-actions");
    }
  });

  wrapper.appendChild(actionPanel);
  wrapper.appendChild(nodo);
  contenedor.appendChild(wrapper);
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

