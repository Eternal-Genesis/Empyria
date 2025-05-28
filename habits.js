<section class="screen" data-screen="habits" data-title="Hábitos">
  <div class="container">
    
    <!-- Botón ➕ arriba a la derecha -->
    <div style="display: flex; justify-content: flex-end; margin-bottom: 12px;">
      <button id="agregar-habito" class="btn btn-primary" style="padding: 6px 14px; border-radius: 8px;">
        ➕ Hábito
      </button>
    </div>

    <!-- Bloques por momento del día -->
    <h2 class="subtitle">☀️ Mañana</h2>
    <div id="habits-morning" class="habits-grid"></div>

    <h2 class="subtitle">🌤️ Tarde</h2>
    <div id="habits-afternoon" class="habits-grid"></div>

    <h2 class="subtitle">🌙 Noche</h2>
    <div id="habits-night" class="habits-grid"></div>

  </div>

  <!-- Modal para nuevo hábito -->
  <div id="modal-habito" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:999; align-items:center; justify-content:center;">
    <div class="card" style="width:90%; max-width:400px;">
      <h3>Nuevo Hábito</h3>
      
      <input id="input-nombre" type="text" placeholder="Nombre del hábito" style="width:100%; padding:10px; margin-bottom:12px; border-radius:8px; border:none; background:var(--color-card); color:var(--color-text-primary);" />

      <label style="font-size:0.9rem;">¿En qué momento del día?</label>
      <select id="input-bloque" style="width:100%; padding:10px; margin-top:8px; border-radius:8px; border:none; background:var(--color-card); color:var(--color-text-primary);">
        <option value="morning">Mañana</option>
        <option value="afternoon">Tarde</option>
        <option value="night">Noche</option>
      </select>

      <div style="margin-top:16px; display:flex; justify-content:space-between;">
        <button id="btn-cancelar" class="btn btn-secondary">Cancelar</button>
        <button id="btn-crear" class="btn btn-primary">Crear</button>
      </div>
    </div>
  </div>
</section>
