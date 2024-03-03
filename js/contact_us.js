
const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

const alerta = () =>{
    alert('Formulario enviado exitosamente');
};

const obtained_data = (event) => {
    event.preventDefault(); // Evita que el formulario se envíe solo


    let nombre = document.getElementById('name').value.trim();
    let email = document.getElementById('Email').value.trim();
    let asunto = document.getElementById('subject').value;
    let mensaje = document.querySelector('textarea[name="mensaje"]').value;

    if (!nombre || !email || !asunto || !mensaje) {
        alert('Por favor, completa todos los campos del formulario.');
        return;
    }



    // Obtener respuestas anteriores del localStorage o inicializar un array vacío
    let respuestasGuardadas = JSON.parse(localStorage.getItem('respuestas')) || [];

    if (!isValidEmail(email)) {
        alert('Por favor, introduce una dirección de correo electrónico válida.');
        return;
    }

    let nuevaRespuesta = {
        nombre: nombre,
        email: email,
        asunto: asunto,
        mensaje: mensaje
    };
    respuestasGuardadas.push(nuevaRespuesta);

    // Guardar el array de respuestas en localStorage
    localStorage.setItem('respuestas', JSON.stringify(respuestasGuardadas));

    alerta();

    // Limpia los campos del formulario
    document.getElementById('name').value = '';
    document.getElementById('Email').value = '';
    document.getElementById('subject').value = '';
    document.querySelector('textarea[name="mensaje"]').value = '';

};

document.getElementById('contactForm').addEventListener('submit', obtained_data ); 