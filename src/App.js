// App.js - Contenedor principal de Empyria
import { BottomNav } from './ui.js';
import { route } from './router.js';

export function App() {
  const app = document.getElementById('app');
  app.innerHTML = \`
    <main id="view-container"></main>
    \${BottomNav()}
  \`;
  route();
}

window.addEventListener('hashchange', route);
