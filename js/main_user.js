document.getElementById('publicarForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe

  var textoPublicacion = document.getElementById('textoPublicacion').value;

  // Crear un nuevo elemento de publicación
  var nuevaPublicacion = document.createElement('div');
  nuevaPublicacion.classList.add('card', 'border', 'rounded', 'mb-3');
  nuevaPublicacion.innerHTML = `
      <div class="card-body">
          <p class="card-text">${textoPublicacion}</p>
      </div>
  `;

  // Insertar la nueva publicación al principio de la lista de publicaciones
  var listaPublicaciones = document.getElementById('publicaciones');
  listaPublicaciones.insertBefore(nuevaPublicacion, listaPublicaciones.firstChild);

  // Limpiar el formulario después de publicar
  document.getElementById('textoPublicacion').value = '';
});


const typed = new Typed('#typed', {
  strings: [ localStorage.getItem('typedText1'), localStorage.getItem('typedText2'), localStorage.getItem('typedText3')],
  typeSpeed: 80,
  backSpeed: 60,
  loop: true
    
  });


