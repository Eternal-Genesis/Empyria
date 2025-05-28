// 🧱 BLOQUE 1 – main.js

// Carga la plantilla base (template.html) y la inserta en #app
async function loadBaseTemplate() {
  const res = await fetch("template.html");
  const html = await res.text();
  const template = document.createElement("div");
  template.innerHTML = html;
  const content = template.querySelector("#base-template").content.cloneNode(true);
  document.getElementById("app").innerHTML = "";
  document.getElementById("app").appendChild(content);

  // ✅ Importante: renderizar íconos después de insertar el DOM
  if (window.lucide) lucide.createIcons();
}

function loadView(viewName, scriptName) {
  return fetch(`views/${viewName}`)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("view-container").innerHTML = html;

      // ✅ Cargar el script si existe
      if (scriptName) {
        const existing = document.getElementById("view-script");
        if (existing) existing.remove(); // eliminar script anterior

        const script = document.createElement("script");
        script.src = `scripts/${scriptName}`;
        script.type = "module";
        script.id = "view-script";
        document.body.appendChild(script);
      }
    });
}

  // Cargar y ejecutar el script correspondiente como módulo ES6
const script = document.createElement("script");
script.src = routeData.script;
script.type = "module"; // ✅ Esto permite usar 'import' dentro del script
document.body.appendChild(script);

  // Actualiza la navegación activa
  setActiveNav(route);
  setGlowColor(route);

  // 🟢 Agregar aquí el listener del botón de tema (si la vista es "profile")
  if (route === "profile") {
    const btnTema = document.getElementById("toggle-theme");
    if (btnTema) {
      btnTema.addEventListener("click", alternarTema);
    }
  }
}

// Marca el botón activo en el menú inferior
function setActiveNav(route) {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    const isActive = btn.dataset.route === route;
    btn.classList.toggle("active", isActive);
  });
}

// Detecta cambios en el hash y carga la vista correspondiente
function handleRouteChange() {
  const route = location.hash.replace("#/", "") || "inicio";
  loadBaseTemplate().then(() => loadView(route));
}

// Escucha los cambios en el hash
window.addEventListener("hashchange", handleRouteChange);
window.addEventListener("DOMContentLoaded", handleRouteChange);

// Maneja clicks en los botones del menú (incluso si se clickea el ícono SVG)
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".nav-btn");
  if (btn && btn.dataset.route) {
    location.hash = `#/${btn.dataset.route}`;
  }
});
function setGlowColor(route) {
  const colorMap = {
    inicio: "#4BD2E5",
    habits: "#FFDE59",
    tasks: "#2AF598",
    progress: "#9F4FFF",
    profile: "#FF5F6D",
  };
  const nav = document.querySelector(".bottom-nav");
  if (nav) {
    nav.style.setProperty("--glow-color", colorMap[route] || "#4BD2E5");
  }
}
// === Gestión Global de Tema (oscuro/claro) ===

function aplicarTemaGuardado() {
  const tema = localStorage.getItem("tema") || "oscuro";
  if (tema === "claro") {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
  }
}
function alternarTema() {
  const temaActual = document.body.classList.contains("light-theme") ? "claro" : "oscuro";
  const nuevoTema = temaActual === "oscuro" ? "claro" : "oscuro";
  localStorage.setItem("tema", nuevoTema);

  // 🟢 Activar animación
  document.body.classList.add("theme-switching");
  aplicarTemaGuardado();

  // 🟢 Quitar la clase después de la animación (0.4s = 400ms)
  setTimeout(() => {
    document.body.classList.remove("theme-switching");
  }, 400);
}

// Aplica el tema guardado y configura el botón
document.addEventListener("DOMContentLoaded", () => {
  aplicarTemaGuardado();

  const btnTema = document.getElementById("toggle-theme");
  if (btnTema) {
    btnTema.addEventListener("click", alternarTema);
  }
});
