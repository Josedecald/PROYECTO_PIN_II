let view = () => {
    let respuestasGuardadas = JSON.parse(localStorage.getItem('respuestas')) || [];


    if (Array.isArray(respuestasGuardadas)) {

        let respuestasTable = document.getElementById('respuestasTable');
        respuestasTable.innerHTML = ''; 


        respuestasGuardadas.forEach(respuesta => {

            respuestasTable.innerHTML += `
                <tr>
                    <td>${respuesta.nombre}</td>
                    <td>${respuesta.email}</td>
                    <td>${respuesta.opcion}</td>
                    <td>${respuesta.mensaje}</td>
                </tr>
            `;
        });
    } else {
        console.error('Los datos no son un array de respuestas guardadas:', respuestasGuardadas);
    }
}
document.addEventListener('DOMContentLoaded', () => view());
