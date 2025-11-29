const personajesSelect = document.getElementById('personajesSelect');
const formulario = document.getElementById('form-contacto');

let personajes = null;

async function obtenerPersonajes() {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    return data;
  } catch (error) {
    alert('Hubo un error al obtener los personajes.');
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
    mostrarPersonaje(personaje);
  } else {
    imagenPersonaje.src =
      'https://rickandmortyapi.com/api/character/avatar/19.jpeg';
    imagenPersonaje.alt = 'Imagen del personaje';
  }
});

function mostrarPersonaje(personaje) {
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

function validarFormulario(event) {
  event.preventDefault();

  const campoNombre = formulario.nombre;
  const campoEmail = formulario.email;
  const campoMensaje = formulario.mensaje;
  const errorNombre = campoNombre.parentElement.querySelector('.error-msg');
  const errorEmail = campoEmail.parentElement.querySelector('.error-msg');
  const errorMensaje = campoMensaje.parentElement.querySelector('.error-msg');

  const nombre = campoNombre.value.trim();
  const email = campoEmail.value.trim();
  const mensaje = campoMensaje.value.trim();

  errorNombre.classList.remove('error-msg-show');
  errorEmail.classList.remove('error-msg-show');
  errorMensaje.classList.remove('error-msg-show');

  if (!nombre) {
    errorNombre.classList.add('error-msg-show');
    return;
  }

  if (!email || !validateEmail(email)) {
    errorEmail.classList.add('error-msg-show');
    return;
  }

  if (!mensaje) {
    errorMensaje.classList.add('error-msg-show');
    return;
  }

  alert('¡Mensaje enviado con éxito! Gracias por contactarnos.');
  formulario.reset();
}

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

cargarPersonajes();
formulario.addEventListener('submit', validarFormulario);
