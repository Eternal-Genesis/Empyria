// 🧱 BLOQUE 5 – diary.js

// Lista de sugerencias tipo prompt para reflexión
const PROMPTS = [
  "¿Qué emoción ha dominado tu día?",
  "¿Qué aprendiste hoy sobre ti mismo?",
  "¿Qué te dio paz hoy?",
  "¿De qué estás agradecido ahora?",
  "¿Qué pensamiento necesitas soltar?",
];

// Obtiene un prompt aleatorio y lo muestra
function mostrarPrompt() {
  const prompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
  const promptElemento = document.getElementById("prompt-text");
  if (promptElemento) {
    promptElemento.textContent = `“${prompt}”`;
  }
}

// Guarda una entrada nueva en localStorage
function guardarEntrada() {
  const texto = document.getElementById("diary-input").value.trim();
  if (!texto) return;

  const entradas = JSON.parse(localStorage.getItem("diario") || "[]");
  const nueva = {
    id: Date.now(),
    contenido: texto,
    fecha: new Date().toLocaleString(),
  };
  entradas.unshift(nueva); // Añadir al inicio
  localStorage.setItem("diario", JSON.stringify(entradas));
  document.getElementById("diary-input").value = "";
  renderizarEntradas();
}

// Muestra todas las entradas guardadas
function renderizarEntradas() {
  const lista = document.getElementById("diary-entries");
  const entradas = JSON.parse(localStorage.getItem("diario") || "[]");

  lista.innerHTML = "";
  entradas.forEach((entrada) => {
    const item = document.createElement("li");
    item.textContent = `${entrada.fecha} — ${entrada.contenido}`;
    item.style.marginBottom = "10px";
    item.style.fontSize = "0.9rem";
    item.style.color = "#8A8A8A";
    lista.appendChild(item);
  });
}

// Inicializar eventos y vista
  mostrarPrompt();
  renderizarEntradas();

  document
    .getElementById("save-entry")
    .addEventListener("click", guardarEntrada);
});
