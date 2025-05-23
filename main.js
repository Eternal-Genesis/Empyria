import { renderHome } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('app').innerHTML = renderHome();
});