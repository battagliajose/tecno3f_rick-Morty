const personajesSelect = document.getElementById('personajesSelect');
let personajes = null;

async function obtenerPersonajes() {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en la petición:', error);
  }
}

async function cargarPersonajes() {
  personajes = await obtenerPersonajes();
  personajes.results.forEach((personaje) => {
    const option = document.createElement('option');
    option.value = personaje.id;
    option.textContent = personaje.name;
    personajesSelect.appendChild(option);
  });
}

personajesSelect.addEventListener('change', (event) => {
  const personajeId = event.target.value;
  const imagenPersonaje = document.querySelector('.imagenPersonaje');

  if (personajeId) {
    const personaje = personajes.results.find((p) => p.id == personajeId);
    imagenPersonaje.src = personaje.image;
    imagenPersonaje.alt = personaje.name;
    agregarFila(personaje);
  } else {
    imagenPersonaje.src =
      'https://louisville.edu/kent/images-folder/doctoral-student-directory/blank-profile/image';
    imagenPersonaje.alt = 'Imagen del personaje';
  }
});

function agregarFila(personaje) {
  const tablaPersonaje = document.getElementById('tablaPersonaje');

  if (tablaPersonaje.rows.length > 0) tablaPersonaje.lastChild.remove();

  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td>${personaje.name}</td>
    <td>${personaje.status}</td>
    <td>${personaje.species}</td>
    <td>${personaje.type || '-'}</td>
    <td>${personaje.gender}</td>
    <td>${personaje.origin?.name || '-'}</td>
    <td>${new Date(personaje.created).toLocaleDateString()}</td>
  `;

  tablaPersonaje.appendChild(fila);
}

cargarPersonajes();
