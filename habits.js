// 🧠 habits.js – Versión final con control del botón solo en sección hábitos

function cargarHabitos() {
  const container = document.getElementById("habits-container");
  if (!container) return;
  const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
  const countDisplay = document.getElementById("habit-count");
  if (countDisplay) countDisplay.textContent = `Hábitos: ${habitos.length}`;
  container.innerHTML = "";

  habitos.forEach(h => {
    const card = document.createElement("div");
    card.className = "habit-card";

    card.innerHTML = `
  <div class="habit-info">
    <span class="habit-icon">${h.icono || "🧩"}</span>
    <div>
      <div class="habit-name">${h.nombre}</div>
      <div class="habit-momento">${h.momento || ""}</div>
    </div>
  </div>
  
  <div class="habit-actions">
    <button class="habit-menu-btn" onclick="toggleHabitMenu('${h.id}')">
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="5" cy="12" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="19" cy="12" r="2" />
      </svg>
    </button>
<div class="habit-menu" id="menu-${h.id}" style="display:none;">
  <button onclick="editarHabito('${h.id}')">Editar</button>
  <button onclick="eliminarHabito('${h.id}')">Eliminar</button>
</div>
  </div>
`;

    container.appendChild(card);
  });
}

function editarHabito(id) {
  // Obtener el array de hábitos del localStorage
  const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
  // Encontrar el hábito a editar
  const habit = habitos.find(h => h.id === id);
  
  // Si el hábito no se encuentra, no hacer nada
  if (!habit) {
    console.error("Hábito no encontrado");
    return;
  }

  // Cambiar el título del modal a "Editar Hábito"
  document.getElementById("modal-title").textContent = "Editar Hábito";
  
  // Rellenar los campos con los datos actuales del hábito
  document.getElementById("input-nombre").value = habit.nombre;
  document.getElementById("input-icono").value = habit.icono;
  document.getElementById("input-momento").value = habit.momento;

  // Mostrar el modal
  document.getElementById("modal-habito").classList.add("active");

  // Configurar el botón de "Guardar" para actualizar el hábito
  document.getElementById("btn-guardar").onclick = function() {
    const nuevoNombre = document.getElementById("input-nombre").value.trim();
    const nuevoIcono = document.getElementById("input-icono").value.trim();
    const nuevoMomento = document.getElementById("input-momento").value;

    // Validación del nombre obligatorio
    if (!nuevoNombre) {
      alert("El nombre del hábito es obligatorio.");
      return;
    }

    // Actualizar el hábito con los nuevos valores
    habit.nombre = nuevoNombre;
    habit.icono = nuevoIcono;
    habit.momento = nuevoMomento;

    // Guardar los cambios en localStorage
    localStorage.setItem("habitos", JSON.stringify(habitos));

    // Cerrar el modal y recargar los hábitos
    ocultarModal();
    cargarHabitos();
  };
}

function toggleHabitMenu(id) {
  const menu = document.getElementById(`menu-${id}`);
  if (menu) {
    menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "flex" : "none";
  }
}

window.toggleHabitMenu = toggleHabitMenu;
function eliminarHabito(id) {
  const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
  const nuevos = habitos.filter(h => h.id !== id);
  localStorage.setItem("habitos", JSON.stringify(nuevos));
  cargarHabitos();
}

window.eliminarHabito = eliminarHabito;

function mostrarModal(id = null) {
  // Si hay un ID, es porque estamos editando un hábito
  if (id) {
    // Llamar a la función de editar habit (cargar datos)
    editarHabito(id);
  } else {
    // Si no hay ID, es porque estamos creando un nuevo hábito
    document.getElementById("modal-title").textContent = "Nuevo Hábito";
    document.getElementById("input-nombre").value = "";
    document.getElementById("input-icono").value = "";
    document.getElementById("input-momento").value = "";
    document.getElementById("btn-guardar").onclick = guardarHabito; // Llamar a la función de guardar
  }

  document.getElementById("modal-habito").classList.add("active");
}

function ocultarModal() {
  document.getElementById("modal-habito").classList.remove("active");
  
  // Limpiar los valores del formulario solo si estamos creando un nuevo hábito (no editar)
  const modalTitle = document.getElementById("modal-title").textContent;
  if (modalTitle === "Nuevo Hábito") {
    document.getElementById("input-nombre").value = "";
    document.getElementById("input-icono").value = "";
    document.getElementById("input-momento").value = "";
  }

  // Restaurar el título del modal al valor original para creación
  document.getElementById("modal-title").textContent = "Nuevo Hábito";
}

function guardarHabito() {
  const nombre = document.getElementById("input-nombre").value.trim();
  const iconoInput = document.getElementById("input-icono").value.trim();
  const emojiRegex = /^[\p{Emoji}]$/u;

  // Validar si el emoji es correcto
  if (!emojiRegex.test(iconoInput)) {
    alert("Solo se permite un único emoji como ícono.");
    return;
  }

  // Verificar si el nombre es vacío
  if (!nombre) {
    alert("El nombre del hábito es obligatorio.");
    return;
  }

  const icono = iconoInput;
  const momento = document.getElementById("input-momento").value;

  // Crear un nuevo hábito
  const id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString();
  const nuevo = { id, nombre, icono, momento, estado: "pending" };

  const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
  habitos.push(nuevo);
  localStorage.setItem("habitos", JSON.stringify(habitos));

  // Cerrar el modal y recargar los hábitos
  ocultarModal();
  cargarHabitos();
}

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
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      visibility: "hidden"
    });

    document.body.appendChild(btn);

    requestAnimationFrame(() => {
      setTimeout(() => {
        btn.style.visibility = "visible";
      }, 50);
    });
  }

  document.getElementById("btn-cancelar")?.addEventListener("click", ocultarModal);
  document.getElementById("btn-guardar")?.addEventListener("click", guardarHabito);
  cargarHabitos();
}

function limpiarBotonHabito() {
  const btn = document.getElementById("btn-nuevo-habito");
  if (btn) btn.remove();
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
