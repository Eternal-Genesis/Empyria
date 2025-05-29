// main.js

// Carga la plantilla base y renderiza íconos
async function loadBaseTemplate() {
  const res = await fetch("template.html");
  const html = await res.text();
  const template = document.createElement("div");
  template.innerHTML = html;
  const content = template.querySelector("#base-template").content.cloneNode(true);
  document.getElementById("app").innerHTML = "";
  document.getElementById("app").appendChild(content);

  if (window.lucide) lucide.createIcons();
}

// Carga vista según la ruta
async function loadView(route) {
  const routeData = routes[route];
  if (!routeData) return;

  const res = await fetch(routeData.view);
  const html = await res.text();
  document.getElementById("view-container").innerHTML = html;

  const script = document.createElement("script");
  script.src = routeData.script;
  script.type = "module";
  document.body.appendChild(script);

  setActiveNav(route);
  setGlowColor(route);

  if (window.lucide) lucide.createIcons();
  if (route === "profile") {
    const btnTema = document.getElementById("toggle-theme");
    if (btnTema) btnTema.addEventListener("click", alternarTema);
  }
}

// Navegación activa
function setActiveNav(route) {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    const isActive = btn.dataset.route === route;
    btn.classList.toggle("active", isActive);
  });
}

// Manejo de rutas simple, sin login
function handleRouteChange() {
  const route = location.hash.replace("#/", "") || "intro";
  loadBaseTemplate().then(() => loadView(route));
}

// Eventos
window.addEventListener("hashchange", handleRouteChange);
window.addEventListener("DOMContentLoaded", handleRouteChange);
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".nav-btn");
  if (btn && btn.dataset.route) {
    location.hash = `#/${btn.dataset.route}`;
  }
});

// Colores por sección
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

// Tema claro/oscuro
function aplicarTemaGuardado() {
  const tema = localStorage.getItem("tema") || "oscuro";
  document.body.classList.toggle("light-theme", tema === "claro");
}

function alternarTema() {
  const actual = document.body.classList.contains("light-theme") ? "claro" : "oscuro";
  const nuevo = actual === "oscuro" ? "claro" : "oscuro";
  localStorage.setItem("tema", nuevo);
  document.body.classList.add("theme-switching");
  aplicarTemaGuardado();
  setTimeout(() => document.body.classList.remove("theme-switching"), 400);
}

document.addEventListener("DOMContentLoaded", aplicarTemaGuardado);
