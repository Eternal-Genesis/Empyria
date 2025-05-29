// 🧠 intro.js – Lógica del carrusel de introducción

let pasoActual = 0;
const totalPasos = 3;

const slider = document.getElementById("intro-slider");
const btnSiguiente = document.getElementById("btn-siguiente");
const btnOmitir = document.getElementById("btn-omitir");
const indicador = document.getElementById("slide-indicator");

function actualizarVista() {
  const offset = -pasoActual * 100;
  slider.style.transform = `translateX(${offset}%)`;
  indicador.textContent = `${pasoActual + 1} / ${totalPasos}`;
  
  if (pasoActual === totalPasos - 1) {
    btnSiguiente.textContent = "Empezar";
  } else {
    btnSiguiente.textContent = "Siguiente";
  }
}

btnSiguiente.addEventListener("click", () => {
  if (pasoActual < totalPasos - 1) {
    pasoActual++;
    actualizarVista();
  } else {
    location.hash = "#/inicio";
  }
});

btnOmitir.addEventListener("click", () => {
  location.hash = "#/inicio";
});

// Iniciar vista correcta
actualizarVista();
