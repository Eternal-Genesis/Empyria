// habits.js
let habitToEdit = null;  // Variable global para almacenar el hábito que estamos editando

// Función para cargar los hábitos desde el almacenamiento local y mostrarlos
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

// Función para mostrar u ocultar el menú de opciones de un hábito
function toggleHabitMenu(id) {
  const menu = document.getElementById(`menu-${id}`);
  const allMenus = document.querySelectorAll('.habit-menu'); // Seleccionamos todos los menús

  // Ocultamos todos los menús abiertos que no sean el que estamos clicando
  allMenus.forEach(m => {
    if (m !== menu) {
      m.style.display = 'none'; // Ocultamos todos los menús que no sean el que hemos clicado
    }
  });

  // Mostrar o ocultar el menú clicado
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
  }
}

// Función para eliminar un hábito
function eliminarHabito(id) {
  const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
  const nuevos = habitos.filter(h => h.id !== id);
  localStorage.setItem("habitos", JSON.stringify(nuevos));
  cargarHabitos();
}

// Función para mostrar el modal de creación/edición de hábito
function mostrarModal() {
  const modalTitle = document.querySelector(".modal-content h3");
  const btnNuevoHabito = document.getElementById("btn-nuevo-habito");

  if (!habitToEdit) {
    // Si no estamos editando, mostramos "Nuevo Hábito"
    modalTitle.textContent = "Nuevo Hábito";
  } else {
    // Si estamos editando, mostramos "Editar Hábito"
    modalTitle.textContent = "Editar Hábito";
  }

  // Ocultar el botón de crear hábito cuando se muestra el modal
  btnNuevoHabito.style.visibility = "hidden";

  document.getElementById("modal-habito").classList.add("active");
}

// Función para ocultar el modal
function ocultarModal() {
  document.getElementById("modal-habito").classList.remove("active");

  // Mostrar el botón de nuevo hábito cuando el modal se oculta
  const btnNuevoHabito = document.getElementById("btn-nuevo-habito");
  btnNuevoHabito.style.visibility = "visible";
}

// Función para guardar un hábito (crear o editar)
function guardarHabito() {
  const nombre = document.getElementById("input-nombre").value.trim();
  const iconoInput = document.getElementById("input-icono").value.trim();
  const emojiRegex = /^[\p{Emoji}\u200B]+$/u;

  if (!emojiRegex.test(iconoInput)) {
    alert("Solo se permite un único emoji como ícono.");
    return;
  }

  const icono = iconoInput;
  const momento = document.getElementById("input-momento").value;

  if (!nombre) {
    alert("El nombre del hábito es obligatorio.");
    return;
  }

  if (habitToEdit) {
    // Si habitToEdit está definido, actualizamos el hábito existente
    habitToEdit.nombre = nombre;
    habitToEdit.icono = icono;
    habitToEdit.momento = momento;

    // Recuperamos los hábitos y actualizamos el hábito editado
    const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
    const index = habitos.findIndex(h => h.id === habitToEdit.id);
    if (index !== -1) {
      habitos[index] = habitToEdit;
      localStorage.setItem("habitos", JSON.stringify(habitos));
    }

    // Recargamos los hábitos
    cargarHabitos();
    ocultarModal();
    habitToEdit = null;  // Limpiamos la variable después de la edición
  } else {
    // Si no estamos editando, creamos un nuevo hábito
    const id = Date.now().toString();
    const nuevoHábito = { id, nombre, icono, momento };

    const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
    habitos.push(nuevoHábito);
    localStorage.setItem("habitos", JSON.stringify(habitos));

    // Recargamos los hábitos
    cargarHabitos();
    ocultarModal();
  }
}

// Función para mostrar el botón de "Nuevo Hábito"
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
      visibility: "visible"  // Hacemos visible el botón desde el principio
    });

    document.body.appendChild(btn);
  }

  document.getElementById("btn-cancelar")?.addEventListener("click", ocultarModal);
  document.getElementById("btn-guardar")?.addEventListener("click", guardarHabito);
  cargarHabitos();
}

// Detectar navegación en SPA y recargar la vista
window.addEventListener("hashchange", () => {
  if (location.hash === "#/habits") {
    setTimeout(iniciarVistaHabitos, 100);
  }
});

// Si ya estás en /habits al cargar
if (location.hash === "#/habits") {
  setTimeout(iniciarVistaHabitos, 100);
}

window.editarHabito = editarHabito;


