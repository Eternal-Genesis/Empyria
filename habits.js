// 🧠 habits.js – Versión final con control del botón solo en sección hábitos

function cargarHabitos() {
  const container = document.getElementById("habits-container");
  if (!container) return;
  
  const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");

  // Mostrar la cantidad de hábitos en la parte superior
  const countDisplay = document.getElementById("habit-count");
  if (countDisplay) countDisplay.textContent = `Hábitos: ${habitos.length}`;

  container.innerHTML = ""; // Limpiar el contenedor antes de agregar los nuevos hábitos

  habitos.forEach(h => {
    const card = document.createElement("div");
    card.className = "habit-card"; // Asignamos la clase para cada tarjeta de hábito

    card.innerHTML = `
      <div class="habit-info">
        <span class="habit-icon">${h.icono || "🧩"}</span>
        <span class="habit-name">${h.nombre}</span>
        <span class="habit-momento">${h.momento}</span>
      </div>
      <div class="habit-actions">
        <button onclick="editarHabito('${h.id}')">Editar</button>  <!-- Botón de editar -->
        <button onclick="eliminarHabito('${h.id}')">Eliminar</button>  <!-- Botón de eliminar -->
      </div>
    `;
    
    container.appendChild(card); // Añadir la tarjeta al contenedor
  });
}

function editarHabito(id) {
  const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
  const habit = habitos.find(h => h.id === id);
  
  if (!habit) return; // Si no se encuentra el hábito, no hacemos nada

  // Mostrar los valores actuales en los campos del modal
  document.getElementById("input-nombre").value = habit.nombre;
  document.getElementById("input-icono").value = habit.icono;
  document.getElementById("input-momento").value = habit.momento;

  // Mostrar el modal para editar el hábito
  document.getElementById("modal-habito").classList.add("active");

  // Al hacer clic en "Guardar", actualizamos el hábito
  document.getElementById("btn-guardar").onclick = function() {
    const nuevoNombre = document.getElementById("input-nombre").value.trim();
    const nuevoIcono = document.getElementById("input-icono").value.trim();
    const nuevoMomento = document.getElementById("input-momento").value;

    // Validación de campos vacíos
    if (!nuevoNombre || !nuevoIcono || !nuevoMomento) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Actualizar el hábito en el arreglo
    habit.nombre = nuevoNombre;
    habit.icono = nuevoIcono;
    habit.momento = nuevoMomento;

    // Guardar los cambios en el almacenamiento local
    localStorage.setItem("habitos", JSON.stringify(habitos));

    // Cerrar el modal y recargar la lista de hábitos
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

function mostrarModal() {
  document.getElementById("modal-habito").classList.add("active");
}

function ocultarModal() {
  document.getElementById("modal-habito").classList.remove("active");
  document.getElementById("input-nombre").value = "";
  document.getElementById("input-icono").value = "";
}

function guardarHabito() {
  const nombre = document.getElementById("input-nombre").value.trim();
  const iconoInput = document.getElementById("input-icono").value.trim();
  const emojiRegex = /^[\p{Emoji}]$/u;

  // Validación para asegurarse de que solo haya un emoji
  if (!emojiRegex.test(iconoInput)) {
    alert("Solo se permite un único emoji como ícono.");
    return;
  }

  const momento = document.getElementById("input-momento").value;

  // Validación de campos vacíos
  if (!nombre || !iconoInput || !momento) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString();
  const nuevo = { id, nombre, icono: iconoInput, momento, estado: "pending" };

  const habitos = JSON.parse(localStorage.getItem("habitos") || "[]");
  habitos.push(nuevo);
  localStorage.setItem("habitos", JSON.stringify(habitos));

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
