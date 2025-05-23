import { routes } from './components.js';

function loadRoute() {
  const hash = window.location.hash || '#/inicio';
  const route = routes[hash];
  if (route) {
    fetch(`${route.view}`)
      .then(res => res.text())
      .then(html => {
        document.getElementById('app').innerHTML = html;
        import(route.script).then(module => module.default());
      });
  }
}

window.addEventListener('hashchange', loadRoute);
window.addEventListener('DOMContentLoaded', loadRoute);
