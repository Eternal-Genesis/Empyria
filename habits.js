// habits.js (modo local con estructura por día)

const STORAGE_KEY = "habitosPorDia";
const bloques = ["morning", "afternoon", "night"];

// Devuelve la fecha actual en formato YYYY-MM-DD
function obtenerFechaActual() {
  return new Date().toISOString().split("T")[0];
}

// Obtiene los hábitos del día desde localStorage
function obtenerHabitosDelDia(fecha = obtenerFechaActual()) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  return data[fecha] || {};
}

// Guarda los hábitos del día en localStorage
function guardarHabitosDelDia(habitos, fecha = obtenerFechaActual()) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  data[fecha] = habitos;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Renderiza los hábitos por bloque (mañana, tarde, noche)
export function cargarHabitos(fecha = obtenerFechaActual()) {
  const habitos = obtenerHabitosDelDia(fecha);

  bloques.forEach((bloque) => {
    const contenedor = document.getElementById(`habits-${bloque}`);
    if (!contenedor) return;

    contenedor.innerHTML = "";

    // Filtrar hábitos por bloque
    const filtrados = Object.entries(habitos).filter(
      ([_, h]) => h.bloque === bloque
    );

    // Contador
    let completados = 0;

    filtrados.forEach(([id, h]) => {
      const div = document.createElement("div");
      div.classList.add("habit-node");
      div.textContent = h.nombre;

      // Color visual
      if (h.estado === "completed") {
        div.classList.add("habit-completed");
        completados++;
      } else {
        div.classList.add("habit-pending"); // Agregaremos estilo en CSS si querés
      }

      // Toggle de estado
      div.addEventListener("click", () => toggleEstadoHabito(id, fecha));
      contenedor.appendChild(div);
    });

    // Mostrar contador
    const contador = document.createElement("div");
    contador.style.marginTop = "8px";
    contador.style.fontSize = "0.85rem";
    contador.style.color = "var(--color-text-secondary)";
    contador.textContent = `✔️ ${completados}/${filtrados.length} completados`;

    contenedor.appendChild(contador);
  });
}

// Alterna el estado de un hábito entre pendiente y completado
function toggleEstadoHabito(id, fecha = obtenerFechaActual()) {
  const habitos = obtenerHabitosDelDia(fecha);
  if (!habitos[id]) return;

  habitos[id].estado =
    habitos[id].estado === "completed" ? "pending" : "completed";

  guardarHabitosDelDia(habitos, fecha);
  cargarHabitos(fecha);
}

// Iniciar carga automática al cargar la vista
document.addEventListener("DOMContentLoaded", () => {
  cargarHabitos();

  const btnAbrir = document.getElementById("agregar-habito");
  const btnCancelar = document.getElementById("btn-cancelar");
  const btnCrear = document.getElementById("btn-crear");

  if (btnAbrir) btnAbrir.addEventListener("click", abrirModalHabito);
  if (btnCancelar) btnCancelar.addEventListener("click", cerrarModalHabito);
  if (btnCrear) btnCrear.addEventListener("click", crearHabitoDesdeModal);
});

function crearHabitoDesdeModal() {
  const nombre = document.getElementById("input-nombre").value.trim();
  const bloque = document.getElementById("input-bloque").value;

  if (!nombre || !bloque) {
    alert("Por favor, completá todos los campos.");
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
