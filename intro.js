// 🧠 intro.js – Lógica del carrusel de introducción

let pasoActual = 0;
const totalPasos = 3;

function actualizarVista() {
  const slider = document.getElementById("intro-slider");
  const indicador = document.getElementById("slide-indicator");
  const btnSiguiente = document.getElementById("btn-siguiente");

  const offset = -pasoActual * 100;
  slider.style.transform = `translateX(${offset}vw)`;
  indicador.textContent = `${pasoActual + 1} / ${totalPasos}`;

  if (pasoActual === totalPasos - 1) {
    btnSiguiente.textContent = "Empezar";
  } else {
    btnSiguiente.textContent = "Siguiente";
  }
}

window.addEventListener("load", () => {
  const btnSiguiente = document.getElementById("btn-siguiente");
  const btnOmitir = document.getElementById("btn-omitir");
  const slider = document.getElementById("intro-slider");

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

  // Asegura que cada slide tenga dimensiones correctas
  document.querySelectorAll(".slide").forEach(slide => {
    slide.style.minHeight = "100vh";
    slide.style.minWidth = "100vw";
    slide.style.display = "flex";
    slide.style.flexDirection = "column";
    slide.style.justifyContent = "center";
    slide.style.alignItems = "center";
    slide.style.textAlign = "center";
  });

  actualizarVista();
});
