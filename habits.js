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
      <span class="habit-icon">${habito.icono || "🧘"}</span>
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

  // Pre-llenar los campos del modal de edición con los datos del hábito
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
  cargarHabitos();  // Recarga la lista de hábitos en la interfaz
}

// === ABRIR Y CERRAR EL MODAL DE CREACIÓN ===
function mostrarModal() {
  document.getElementById("modal-habito").classList.add("active");
}

function ocultarModal() {
  document.getElementById("modal-habito").classList.remove("active");
  document.getElementById("input-nombre").value = "";
  document.getElementById("input-icono").value = "";
  document.getElementById("input-momento").value = "";
}

// === GUARDAR NUEVO HÁBITO ===
function guardarHabito() {
  const nombre = document.getElementById("input-nombre").value.trim();
  const iconoInput = document.getElementById("input-icono").value.trim();
  const emojiRegex = /^[\p{Emoji}\u200B-\u200D\u23F0-\u23FF\u2600-\u26FF\u2700-\u27BF\uD83C[\uDC00-\uDFFF]]+$/u;

  if (!emojiRegex.test(iconoInput)) {
    alert("Por favor, ingresa un emoji válido.");
    return;
  }

  const icono = iconoInput;
  const momento = document.getElementById("input-momento").value;

  if (!nombre || !icono || !momento) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const id = crypto.randomUUID(); // Genera un id único
  const nuevo = { id, nombre, icono, momento, estado: "pending" };

  const habitos = obtenerHabitosDeStorage();
  habitos.push(nuevo);
  localStorage.setItem(HABITOS_KEY, JSON.stringify(habitos));

  ocultarModal();
  cargarHabitos();
}

// === EVENTO DE CANCELAR (Cerrar Modal) ===
document.getElementById("btn-cancelar-editar")?.addEventListener("click", ocultarModalEditar);
document.getElementById("btn-cancelar")?.addEventListener("click", ocultarModal);

// === INICIALIZACIÓN DE LA VISTA ===
document.addEventListener("DOMContentLoaded", cargarHabitos);

// === NUEVO HÁBITO (Botón flotante) ===
function iniciarVistaHabitos() {
  if (!document.getElementById("btn-nuevo-habito")) {
    const btn = document.createElement("button");
    btn.id = "btn-nuevo-habito";
    btn.textContent = "➕";
    btn.setAttribute("aria-label", "Nuevo hábito");
    btn.onclick = mostrarModal;

    Object.assign(btn.style, {
      position: "fixed",
      bottom: "80px",
      right: "20px",
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      backgroundColor: "var(--color-accent-primary)",
      color: "white",
      fontSize: "1.5rem",
      border: "none",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      zIndex: 999,
      visibility: "hidden"
    });

    document.body.appendChild(btn);

    requestAnimationFrame(() => {
      setTimeout(() => {
        btn.style.visibility = "visible";
      }, 50);
    });
  }
}

// Detectar navegación en SPA y recargar la vista
window.addEventListener("hashchange", () => {
  if (location.hash === "#/habits") {
    setTimeout(iniciarVistaHabitos, 100);
  } else {
    limpiarBotonHabito();
  }
});

// Si ya estás en /habits al cargar
if (location.hash === "#/habits") {
  setTimeout(iniciarVistaHabitos, 100);
}

window.editarHabito = editarHabito;
window.eliminarHabito = eliminarHabito;
