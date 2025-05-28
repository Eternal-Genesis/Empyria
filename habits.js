const STORAGE_KEY = "habitosPorDia";
const bloques = ["morning", "afternoon", "night"];
let habitoEditandoId = null;

function obtenerFechaActual() {
  return new Date().toISOString().split("T")[0];
}

function obtenerHabitosDelDia(fecha = obtenerFechaActual()) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  return data[fecha] || {};
}

function guardarHabitosDelDia(habitos, fecha = obtenerFechaActual()) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  data[fecha] = habitos;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function toggleEstadoHabito(id, fecha = obtenerFechaActual()) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  const habitos = data[fecha] || {};
  if (!habitos[id]) return;

  habitos[id].estado =
    habitos[id].estado === "completed" ? "pending" : "completed";
  data[fecha] = habitos;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  cargarHabitos(fecha);
}

function eliminarHabito(id, fecha = obtenerFechaActual()) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  const habitos = data[fecha] || {};
  if (!habitos[id]) return;

  delete habitos[id];
  data[fecha] = habitos;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  cargarHabitos(fecha);
}

function abrirModalHabito() {
  document.getElementById("modal-habito")?.classList.add("show");
  habitoEditandoId = null;
  document.getElementById("input-nombre").value = "";
  document.getElementById("input-bloque").value = "morning";
}

function cerrarModalHabito() {
  document.getElementById("modal-habito")?.classList.remove("show");
  document.getElementById("input-nombre").value = "";
  document.getElementById("input-bloque").value = "morning";
  habitoEditandoId = null;
}

function abrirEdicionHabito(id, habito) {
  habitoEditandoId = id;
  document.getElementById("modal-habito")?.classList.add("show");
  document.getElementById("input-nombre").value = habito.nombre;
  document.getElementById("input-bloque").value = habito.bloque;
}

function crearHabitoDesdeModal() {
  const nombre = document.getElementById("input-nombre").value.trim();
  const bloque = document.getElementById("input-bloque").value;
  const fecha = obtenerFechaActual();

  if (!nombre || !bloque) {
    alert("Completá todos los campos.");
    return;
  }

  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  const dia = data[fecha] || {};

  if (habitoEditandoId) {
    dia[habitoEditandoId] = {
      ...dia[habitoEditandoId],
      nombre,
      bloque
    };
  } else {
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

function cargarHabitos(fecha = obtenerFechaActual()) {
  const habitos = obtenerHabitosDelDia(fecha);

  bloques.forEach((bloque) => {
    const contenedor = document.getElementById(`habits-${bloque}`);
    if (!contenedor) return;
    contenedor.innerHTML = "";

    Object.entries(habitos).forEach(([id, h]) => {
      if (h.bloque !== bloque) return;

      const wrapper = document.createElement("div");
      wrapper.className = "habit-swipe-wrapper";

      const actionPanel = document.createElement("div");
      actionPanel.className = "habit-actions";

      const btnEdit = document.createElement("button");
      btnEdit.className = "habit-edit";
      btnEdit.textContent = "✏️";
      btnEdit.addEventListener("click", () => abrirEdicionHabito(id, h));

      const btnDelete = document.createElement("button");
      btnDelete.className = "habit-delete";
      btnDelete.textContent = "🗑️";
      btnDelete.addEventListener("click", () => eliminarHabito(id, fecha));

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
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarHabitos();

  document.getElementById("agregar-habito")?.addEventListener("click", abrirModalHabito);
  document.getElementById("btn-cancelar")?.addEventListener("click", cerrarModalHabito);
  document.getElementById("btn-crear")?.addEventListener("click", crearHabitoDesdeModal);
});
