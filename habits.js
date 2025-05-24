// 🧱 BLOQUE – habits.js (versión inicial con Firebase)

import { db } from './firebase.js';

// Estructura por bloques (morning, afternoon, night)
const bloques = ["morning", "afternoon", "night"];

// Referencia a la colección 'habits'
const habitsRef = db.collection('habits');

// Cargar y renderizar hábitos
export async function cargarHabitos() {
  try {
    const snapshot = await habitsRef.get();
    const habitos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    bloques.forEach(bloque => {
      const contenedor = document.getElementById(`habits-${bloque}`);
      if (!contenedor) return;
      contenedor.innerHTML = "";

      habitos
        .filter(h => h.bloque === bloque)
        .forEach(h => {
          const div = document.createElement("div");
          div.classList.add("habit-node");
          div.textContent = h.nombre;

          if (h.estado === "completed") div.classList.add("habit-completed");
          if (h.estado === "missed") div.classList.add("habit-missed");

          div.addEventListener("click", () => toggleEstado(h.id, h.estado));

          contenedor.appendChild(div);
        });
    });
  } catch (error) {
    console.error("Error al cargar hábitos:", error);
  }
}

// Cambiar estado al hacer click
async function toggleEstado(id, estadoActual) {
  let nuevoEstado = "completed";
  if (estadoActual === "completed") nuevoEstado = "missed";
  else if (estadoActual === "missed") nuevoEstado = "pending";

  try {
    await habitsRef.doc(id).update({ estado: nuevoEstado });
    cargarHabitos();
  } catch (error) {
    console.error("Error al actualizar estado:", error);
  }
}

// Agregar nuevo hábito (ejemplo)
export async function agregarHabit(nombre, bloque) {
  try {
    await habitsRef.add({
      nombre,
      bloque,
      estado: "pending",
      creadoEn: new Date(),
    });
    cargarHabitos();
  } catch (error) {
    console.error("Error al agregar hábito:", error);
  }
}
