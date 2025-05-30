// === CONSTANTES ===
const HABITOS_KEY = "habitos";  // Clave para el almacenamiento en localStorage

// === CARGAR HÁBITOS ===
function cargarHabitos() {
  const habitos = obtenerHabitosDeStorage();
  actualizarContadorDeHabitos(habitos.length);

  const container = document.getElementById("habits-container");
  if (!container) return;
  
  // Limpiar contenido actual
  container.innerHTML = "";

  // Crear una tarjeta para cada hábito
  habitos.forEach(h => {
    const card = crearCardHabit(h);
    container.appendChild(card);
  });
}

// === OBTENER HÁBITOS DE LOCALSTORAGE ===
function obtenerHabitosDeStorage() {
  return JSON.parse(localStorage.getItem(HABITOS_KEY) || "[]");
}

// === ACTUALIZAR EL CONTADOR DE HÁBITOS ===
function actualizarContadorDeHabitos(count) {
  const countDisplay = document.getElementById("habit-count");
  if (countDisplay) countDisplay.textContent = `Hábitos: ${count}`;
}

// === CREAR TARJETA DE HÁBITO ===
function crearCardHabit(habito) {
  const card = document.createElement("div");
  card.className = "habit-card";

  card.innerHTML = `
    <div class="habit-info">
      <span class="habit-icon">${habito.icono || "🧩"}</span>
      <div>
        <div class="habit-name">${habito.nombre}</div>
        <div class="habit-momento">${habito.momento || ""}</div>
      </div>
    </div>
    <div class="habit-actions">
      <button class="habit-menu-btn" onclick="toggleHabitMenu('${habito.id}')">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </button>
      <div class="habit-menu" id="menu-${habito.id}" style="display:none;">
        <button onclick="editarHabito('${habito.id}')">Editar</button>
        <button onclick="eliminarHabito('${habito.id}')">Eliminar</button>
      </div>
    </div>
  `;

  return card;
}

// === TOGGLE MENÚ DE ACCIONES ===
function toggleHabitMenu(id) {
  const menu = document.getElementById(`menu-${id}`);
  if (menu) {
    menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "flex" : "none";
  }
}

// === EDITAR HÁBITO ===
function editarHabito(id) {
  const habitos = obtenerHabitosDeStorage();
  const habit = habitos.find(h => h.id === id);
  if (!habit) return;

  // Pre-llenar los campos del modal de edición
  document.getElementById("input-nombre-editar").value = habit.nombre;
  document.getElementById("input-icono-editar").value = habit.icono;
  document.getElementById("input-momento-editar").value = habit.momento;

  // Mostrar el modal de edición
  mostrarModalEdicion();

  // Guardar los cambios cuando el usuario haga clic en "Guardar"
  document.getElementById("btn-guardar-editar").onclick = function() {
    guardarCambiosHabito(habit, habitos);
  };
}

// === GUARDAR CAMBIOS DEL HÁBITO ===
function guardarCambiosHabito(habit, habitos) {
  const nuevoNombre = document.getElementById("input-nombre-editar").value.trim();
  const nuevoIcono = document.getElementById("input-icono-editar").value.trim();
  const nuevoMomento = document.getElementById("input-momento-editar").value;

  if (!nuevoNombre || !nuevoIcono || !nuevoMomento) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Actualizar los datos del hábito
  habit.nombre = nuevoNombre;
  habit.icono = nuevoIcono;
  habit.momento = nuevoMomento;

  // Actualizar localStorage
  localStorage.setItem(HABITOS_KEY, JSON.stringify(habitos));

  // Recargar la lista de hábitos y cerrar el modal
  cargarHabitos();
  ocultarModalEditar();
}

// === MOSTRAR EL MODAL DE EDICIÓN ===
function mostrarModalEdicion() {
  document.getElementById("modal-editar-habito").classList.add("active");
}

// === OCULTAR EL MODAL DE EDICIÓN ===
function ocultarModalEditar() {
  document.getElementById("modal-editar-habito").classList.remove("active");
}

// === ELIMINAR HÁBITO ===
function eliminarHabito(id) {
  const habitos = obtenerHabitosDeStorage();
  const nuevosHabitos = habitos.filter(h => h.id !== id);
  localStorage.setItem(HABITOS_KEY, JSON.stringify(nuevosHabitos));
  cargarHabitos();
}

// === EVENTO DE CANCELAR (Cerrar Modal) ===
document.getElementById("btn-cancelar-editar")?.addEventListener("click", ocultarModalEditar);

// === INICIALIZACIÓN DE LA VISTA ===
document.addEventListener("DOMContentLoaded", cargarHabitos);
