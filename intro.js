// 🧠 intro.js – Lógica del carrusel de introducción para SPA

// Esperar que la vista se cargue dinámicamente
setTimeout(() => {
  let pasoActual = 0;
  const totalPasos = 3;

  const slider = document.getElementById("intro-slider");
  const btnSiguiente = document.getElementById("btn-siguiente");
  const btnOmitir = document.getElementById("btn-omitir");
  const indicador = document.getElementById("slide-indicator");

  if (!slider || !btnSiguiente || !btnOmitir || !indicador) {
    console.error("❌ Elementos no encontrados en intro.js");
    return;
  }

  function actualizarVista() {
    const offset = -pasoActual * 100;
    slider.style.transform = `translateX(${offset}vw)`;
    indicador.textContent = `${pasoActual + 1} / ${totalPasos}`;
    btnSiguiente.textContent = pasoActual === totalPasos - 1 ? "Empezar" : "Siguiente";
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
}, 50);
