// 🧱 BLOQUE – tasks.js (versión inicial con localStorage)

// Clave para localStorage
const STORAGE_KEY = "tasks";

// Cargar tareas desde almacenamiento
function cargarTareas() {
  const tareas = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const lista = document.getElementById("tasks-list");
  if (!lista) return;

  lista.innerHTML = "";

  tareas.forEach((tarea, index) => {
    const item = document.createElement("li");
    item.textContent = tarea.texto;
    item.classList.add("task-item");
    if (tarea.completada) item.classList.add("task-completada");

    item.addEventListener("click", () => toggleTarea(index));
    lista.appendChild(item);
  });
}

// Agregar una nueva tarea
function agregarTarea() {
  const input = document.getElementById("task-input");
  const texto = input.value.trim();
  if (!texto) return;

  const tareas = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  tareas.unshift({ texto, completada: false });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));

  input.value = "";
  cargarTareas();
}

// Alternar estado de tarea (✔️/❌)
function toggleTarea(index) {
  const tareas = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  tareas[index].completada = !tareas[index].completada;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
  cargarTareas();
}

// Inicializar vista
document.addEventListener("DOMContentLoaded", () => {
  cargarTareas();
  document.getElementById("add-task").addEventListener("click", agregarTarea);
});
