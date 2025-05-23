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
}

// Carga la vista HTML dentro del <main>
async function loadView(route) {
  const routeData = routes[route];
  if (!routeData) return;

  const res = await fetch(routeData.view);
  const html = await res.text();
  document.getElementById("view-container").innerHTML = html;

  // Cargar y ejecutar el script correspondiente
  const script = document.createElement("script");
  script.src = routeData.script;
  script.defer = true;
  document.body.appendChild(script);

  // Actualiza la navegación activa
  setActiveNav(route);
}

// Marca el botón activo en el menú inferior
function setActiveNav(route) {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.style.borderTop = "none";
    if (btn.dataset.route === route) {
      btn.style.borderTop = "3px solid #4BD2E5";
    }
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

// Maneja clicks en los botones del menú
document.addEventListener("click", (e) => {
  if (e.target.matches(".nav-btn")) {
    location.hash = `#/${e.target.dataset.route}`;
  }
});
