// router.js - Controlador de rutas hash
export function route() {
  const view = location.hash.slice(1) || 'home';
  const container = document.getElementById('view-container');
  container.innerHTML = `<h1>${view}</h1>`;
}